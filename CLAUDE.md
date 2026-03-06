# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun run dev              # Start dev server with hot-reload (port 3000)
bun run dev:debug        # Dev server with WebSocket inspector (attach VSCode debugger)
bun run build            # Compile to standalone binary ./server
bun run typecheck        # Type-check without emitting (tsc --noEmit)
bun run check            # Biome lint + format check
bun run check:fix        # Biome lint + format auto-fix
bun run lint             # Biome lint only
bun run lint:fix         # Biome lint with auto-fix
bun run format           # Biome format with write
bun run db:migrate       # Run pending Kysely migrations
bun run db:migrate:down  # Rollback last migration
bun run db:migrate:make  # Create new migration file
bun run db:codegen       # Generate DB types from schema → src/shared/infra/persistence/types.ts
```

Infrastructure (Postgres, Redis, OTel stack): `docker compose up -d`

Pre-commit hooks (lefthook): runs biome check and typecheck in parallel on staged files.

## Architecture

**Runtime:** Bun + Elysia (HTTP framework) + TypeBox (schema validation & OpenAPI generation).

**Boot sequence:** `src/main.ts` → imports `reflect-metadata` (required by tsyringe) → imports `src/bootstrap.ts` which registers all DI bindings as side-effects and creates the Elysia app with plugins (OpenTelemetry, server-timing, OpenAPI/Scalar UI, request context) → listens on configured port. `src/instrumentation.ts` is preloaded via `bunfig.toml` before anything else to initialize the OTel SDK.

**Dependency injection:** tsyringe with constructor injection. Tokens are `Symbol.for()` strings defined in `dependencies.ts` files. Each module has a `container.ts` that registers its implementations. All module containers are imported (side-effect) through `src/di/container.ts`. The `LoggerProvider` is registered as a factory (not singleton) to get per-request child loggers with requestId/traceId from AsyncLocalStorage.

**Module structure** (Clean Architecture pattern — use health module as template):
```
src/modules/<name>/
├── container.ts              # DI registrations
├── dependencies.ts           # Symbol tokens
├── domain/
│   ├── enums/
│   └── repositories/         # Interfaces only
├── application/
│   └── usecases/
│       └── DTOs/
└── infra/
    ├── http/
    │   ├── controllers/      # Resolves use cases from DI container
    │   ├── schemas/          # Elysia TypeBox schemas (validation + OpenAPI)
    │   └── <name>Routes.ts   # Elysia route definitions
    └── persistence/
        └── kysely/           # Repository implementations
```

Domain layer defines interfaces only. Infrastructure provides concrete implementations wired via DI. Application layer (use cases) depends only on domain interfaces.

**Adding a new module:**
1. Create module directory structure following the pattern above
2. Define dependency tokens in `dependencies.ts`, merge into `src/di/dependencies.ts`
3. Register implementations in module `container.ts`, import it from `src/di/container.ts`
4. Create route file, add `.use(routes)` in `src/routes.ts`

**Database:** Kysely (query builder, not ORM) with PostgreSQL via `pg` driver. Migrations in `src/migrations/`. Config at `.config/kysely.config.ts`. Generic repository base class at `src/shared/infra/persistence/kysely/repositories/KyselyGenericRepository.ts`.

**Observability:** All methods across controllers, use cases, and repositories are decorated with `@trace()` (custom decorator at `src/shared/infra/decorators/trace.ts`) which wraps calls in OpenTelemetry spans named `ClassName.methodName`. Logs go through Pino with dual output (pretty console + OTLP transport). Request context (requestId, traceId) is propagated via AsyncLocalStorage.

**Caching:** Redis via Bun's native `RedisClient`, exposed through `CacheProvider` interface.

**Error handling:** Domain exceptions extend `BaseException` (in `src/shared/domain/exceptions/`). Available: `BadRequestException`, `UnauthorizedException`, `ForbiddenException`, `NotFoundException`, `ValidationException`, `InternalException` (reportable by default), `ServiceUnavailableException`. Throw these from use cases/domain code — the global `errorHandler` hook (`src/shared/infra/hooks/errorHandler.ts`) catches them, maps to HTTP status codes via `ExceptionHttpMapper`, and returns `{ status, error, message }`. Elysia-specific errors (validation, not found, parse) are converted to domain exceptions via `ExceptionMapperChain`. Exceptions with `reportable: true` are automatically logged.

**OpenAPI docs:** Accessible at `http://localhost:3000/openapi` (Scalar UI). Auto-generated from route TypeBox schemas.

**Health endpoints:** `GET /healthz` (liveness, no dependency checks) and `GET /readyz` (readiness, checks DB + cache). Use the health module as the reference implementation for new modules.

## Environment Variables

Required env vars (validated in `src/config/env.ts`):
- `DATABASE_URL`, `REDIS_URL`, `OTEL_EXPORTER_OTLP_ENDPOINT` — no defaults, must be set
- `PORT` (default: 3000), `SERVICE_NAME` (default: boilerplate-api), `NODE_ENV` (development|production|test, default: production)
- `LOG_LEVEL` (error|warn|info|debug, default: error), `DATABASE_POOL_SIZE` (default: 10)
- `OTEL_EXPORTER_OTLP_PROTOCOL` (http/protobuf|grpc|http, default: http/protobuf)

Copy `.env.example` to `.env` for local development.

## Key Conventions

- **Path aliases:** `@/*` → `src/*`, `@config/*` → `src/config/*`, `@shared/*` → `src/shared/*`, `@di/*` → `src/di/*`
- **Env config:** All env vars validated with TypeBox in `src/config/env.ts` (single source of truth). Individual config modules (`app.ts`, `database.ts`, etc.) read from this validated object.
- **Schemas:** Use Elysia's `t` (TypeBox) for HTTP request/response schemas — these serve double duty as runtime validation and OpenAPI spec generation.
- **Decorators:** `experimentalDecorators` + `emitDecoratorMetadata` are enabled (tsyringe requirement). Use `@injectable()`, `@inject()` for DI; `@trace()` for observability.
- **Biome rules:** Single quotes, trailing commas, 120-char line width, `noConsole: warn` (use injected LoggerProvider instead), `noUnusedImports: error`.
- **Import order in bootstrap.ts matters** — `reflect-metadata` must come before tsyringe, DI container imports must come before anything that resolves from it. Biome import sorting is disabled for this file.
- **Error response mapping in routes:** Every route must map its possible error responses in the `response` object for accurate OpenAPI documentation. Use `.use(errorModels)` from `@shared/infra/http/models/errorModels.ts` and reference error schemas by string name. Rules:
  - **Routes with body/params/query validation (TypeBox schemas):** add `422: 'ValidationResponse'` and/or `400: 'BadRequestResponse'`.
  - **Route-specific exceptions:** if the use case/domain throws an exception (e.g. `NotFoundException`, `ServiceUnavailableException`), map the corresponding status code (e.g. `404: 'NotFoundResponse'`, `503: 'ServiceUnavailableResponse'`).

