import type { HealthStatus } from '@/modules/health/domain/enums/HealthStatus.ts';

interface CheckHealthOutput {
  status: HealthStatus;
}

export type { CheckHealthOutput };
