interface ProductRepository {
  findById(id: string): Promise<any>;
  findAll(): Promise<any[]>;
  create(data: any): Promise<any>;
  updatePrice(id: string, price: number): Promise<void>;
  delete(id: string): Promise<void>;
}

export type { ProductRepository };
