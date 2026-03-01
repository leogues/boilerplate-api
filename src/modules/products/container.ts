import { container } from 'tsyringe';
import { PRODUCT_DEPENDENCIES } from './dependencies.ts';
import type { ProductRepository } from './domain/repositories/ProductRepository.ts';
import { KyselyProductRepository } from './infra/persistence/kysely/KyselyProductRepository.ts';

container.registerSingleton<ProductRepository>(PRODUCT_DEPENDENCIES.ProductRepository, KyselyProductRepository);
