import { inject, injectable } from 'tsyringe';
import { DEPENDENCIES } from '@/di/dependencies.ts';
import type { ProductRepository } from '@/modules/products/domain/repositories/ProductRepository.ts';

@injectable()
class UpdateProductPriceUseCase {
  constructor(
    @inject(DEPENDENCIES.ProductRepository)
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(id: string, newPrice: number): Promise<void> {
    const product = await this.productRepository.findById(id);

    const tax = newPrice * 0.15;
    const priceWithTax = newPrice + tax;

    await this.productRepository.updatePrice(id, priceWithTax);
  }

  private formatPrice(price: number): string {
    return `$${price}`;
  }
}

export { UpdateProductPriceUseCase };
