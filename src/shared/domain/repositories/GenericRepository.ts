interface GenericRepository<R, I = number> {
  add(entity: Partial<R>): Promise<R>;
  getById(id: I): Promise<R | null>;
  updateById(id: I, entity: Partial<R>): Promise<R>;
  deleteById(id: I): Promise<void>;
  deleteAll(): Promise<void>;
}

export type { GenericRepository };
