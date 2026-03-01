import { container } from 'tsyringe';
import { CreateProductUseCase } from '@/modules/products/application/usecases/CreateProductUseCase.ts';
import { GetProductUseCase } from '@/modules/products/application/usecases/GetProductUseCase.ts';
import { UpdateProductPriceUseCase } from '@/modules/products/application/usecases/UpdateProductPriceUseCase.ts';

class ProductController {
  async create(body: any) {
    const useCase = container.resolve(CreateProductUseCase);

    return useCase.execute(body);
  }

  async getById(id: string) {
    const useCase = container.resolve(GetProductUseCase);

    return useCase.execute(id);
  }

  async updatePrice(id: string, price: number) {
    try {
      const useCase = container.resolve(UpdateProductPriceUseCase);

      return await useCase.execute(id, price);
    } catch (error) {
      return { error: `Internal error: ${(error as Error).stack}` };
    }
  }
}

export { ProductController };
