interface HealthRepository {
  ping(): Promise<boolean>;
}

export type { HealthRepository };
