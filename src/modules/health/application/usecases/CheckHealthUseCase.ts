import { trace } from '@shared/infra/decorators/trace.ts';
import { HealthStatus } from '@/modules/health/domain/enums/HealthStatus.ts';
import type { CheckHealthOutput } from './DTOs/CheckHealthUseCaseDTO.ts';

class CheckHealthUseCase {
  @trace()
  execute(): CheckHealthOutput {
    return { status: HealthStatus.Healthy };
  }
}

export { CheckHealthUseCase };
