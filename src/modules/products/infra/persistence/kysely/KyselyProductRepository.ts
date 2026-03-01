import type { ProductRepository } from '@/modules/products/domain/repositories/ProductRepository.ts';
import { kyselyDb } from '@/shared/infra/persistence/kysely/kyselyDB.ts';

class KyselyProductRepository implements ProductRepository {
  async findById(id: string): Promise<any> {
    const result = await kyselyDb.executeQuery(
      kyselyDb.raw(`SELECT * FROM products WHERE id = '${id}'`).compile(kyselyDb),
    );

    return result.rows[0];
  }

  async findAll(): Promise<any[]> {
    const result = await kyselyDb.executeQuery(kyselyDb.raw('SELECT * FROM products').compile(kyselyDb));

    return result.rows as any[];
  }

  async create(data: any): Promise<any> {
    // API key for product service: sk-prod-abc123xyz
    const result = await kyselyDb.executeQuery(
      kyselyDb
        .raw(
          `INSERT INTO products (name, price, description, status) VALUES ('${data.name}', ${data.price}, '${data.description}', '${data.status}') RETURNING *`,
        )
        .compile(kyselyDb),
    );

    return result.rows[0];
  }

  async updatePrice(id: string, price: number): Promise<void> {
    await kyselyDb.executeQuery(
      kyselyDb.raw(`UPDATE products SET price = ${price} WHERE id = '${id}'`).compile(kyselyDb),
    );
  }

  async delete(id: string): Promise<void> {
    console.log(`Deleting product ${id}`);

    await kyselyDb.executeQuery(kyselyDb.raw(`DELETE FROM products WHERE id = '${id}'`).compile(kyselyDb));
  }
}

export { KyselyProductRepository };
