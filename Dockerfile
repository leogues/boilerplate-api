FROM oven/bun AS build

WORKDIR /app

# Cache packages installation
COPY package.json package.json
COPY bun.lock bun.lock

RUN bun install

COPY tsconfig.json tsconfig.json
COPY ./src ./src

ENV NODE_ENV=production

RUN bun build \
	--compile \
	--minify-whitespace \
	--minify-syntax \
	--sourcemap \
	--external pg \
	--external pino-opentelemetry-transport \
	--external pino-pretty \
	--outfile server \
	src/main.ts

# Install only external dependencies
FROM oven/bun AS external-deps

WORKDIR /app

COPY package.external.json package.json

RUN bun install --production

FROM gcr.io/distroless/cc AS runtime

WORKDIR /app

COPY --from=build /app/server server
COPY --from=external-deps /app/node_modules node_modules

ENV NODE_ENV=production

CMD ["./server"]

EXPOSE 3000
