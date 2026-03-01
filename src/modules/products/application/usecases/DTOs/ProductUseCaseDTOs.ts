interface CreateProductInput {
  name: string;
  price: number;
  description: string;
  status: string;
}

interface CreateProductOutput {
  id: string;
  name: string;
  price: number;
  status: string;
}

interface GetProductOutput {
  id: string;
  name: string;
  price: number;
  description: string;
  status: string;
}

export type { CreateProductInput, CreateProductOutput, GetProductOutput };
