import type { HealthStatus } from '@/modules/health/domain/enums/HealthStatus.ts';

interface ComponentHealth {
  status: HealthStatus;
}

interface CheckReadinessOutput {
  status: HealthStatus;
  components: Record<string, ComponentHealth>;
}

export type { CheckReadinessOutput, ComponentHealth };
