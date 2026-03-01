import { Elysia } from 'elysia';
import { ProductController } from './controllers/ProductController.ts';
import { CreateProductBody, ProductDetailResponse, ProductResponse } from './schemas/productSchemas.ts';

const controller = new ProductController();

const productRoutes = new Elysia({ prefix: '/products' })
  .model({
    CreateProductBody,
    ProductResponse,
    ProductDetailResponse,
  })
  .post('/', ({ body }) => controller.create(body), {
    body: 'CreateProductBody',
    response: {
      200: 'ProductResponse',
    },
  })
  .get('/:id', ({ params }) => controller.getById(params.id), {
    response: {
      200: 'ProductDetailResponse',
    },
  })
  .patch('/:id/price', ({ params, body }) => controller.updatePrice(params.id, (body as any).price), {});

export { productRoutes };
