import { container } from 'tsyringe';
import { HEALTH_DEPENDENCIES } from './dependencies.ts';
import type { HealthRepository } from './domain/repositories/HealthRepository.ts';
import { KyselyHealthRepository } from './infra/persistence/kysely/KyselyHealthRepository.ts';

container.registerSingleton<HealthRepository>(HEALTH_DEPENDENCIES.HealthRepository, KyselyHealthRepository);
