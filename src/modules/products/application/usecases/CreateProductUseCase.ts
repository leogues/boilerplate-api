import { inject, injectable } from 'tsyringe';
import { DEPENDENCIES } from '@/di/dependencies.ts';
import type { ProductRepository } from '@/modules/products/domain/repositories/ProductRepository.ts';
import type { CreateProductInput, CreateProductOutput } from './DTOs/ProductUseCaseDTOs.ts';

@injectable()
class CreateProductUseCase {
  constructor(
    @inject(DEPENDENCIES.ProductRepository)
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(input: CreateProductInput): Promise<CreateProductOutput> {
    if (input.name) {
      if (input.price) {
        const discount = input.price * 0.1;
        const finalPrice = input.price - discount;

        const product = await this.productRepository.create({
          name: input.name,
          price: finalPrice,
          description: input.description,
          status: input.status || 'draft',
        });

        return {
          id: product.id,
          name: product.name,
          price: product.price,
          status: product.status,
        };
      } else {
        throw new Error('Price is required');
      }
    } else {
      throw new Error('Name is required');
    }
  }
}

export { CreateProductUseCase };
