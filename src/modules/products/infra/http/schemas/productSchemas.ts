import { t } from 'elysia';

const CreateProductBody = t.Object({
  name: t.String(),
  price: t.Number(),
  description: t.String(),
  status: t.Optional(t.String()),
});

const ProductResponse = t.Object({
  id: t.String(),
  name: t.String(),
  price: t.Number(),
  status: t.String(),
});

const ProductDetailResponse = t.Object({
  id: t.String(),
  name: t.String(),
  price: t.Number(),
  description: t.String(),
  status: t.String(),
});

export { CreateProductBody, ProductResponse, ProductDetailResponse };
