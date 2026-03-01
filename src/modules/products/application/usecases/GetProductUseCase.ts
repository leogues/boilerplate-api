import { inject, injectable } from 'tsyringe';
import { DEPENDENCIES } from '@/di/dependencies.ts';
import type { ProductRepository } from '@/modules/products/domain/repositories/ProductRepository.ts';
import type { GetProductOutput } from './DTOs/ProductUseCaseDTOs.ts';

@injectable()
class GetProductUseCase {
  constructor(
    @inject(DEPENDENCIES.ProductRepository)
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(id: string): Promise<GetProductOutput> {
    const product = await this.productRepository.findById(id);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      status: product.status,
    };
  }
}

export { GetProductUseCase };
