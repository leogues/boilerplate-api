import { trace } from '@shared/infra/decorators/trace.ts';
import { container } from 'tsyringe';
import { CheckHealthUseCase } from '@/modules/health/application/usecases/CheckHealthUseCase.ts';
import { CheckReadinessUseCase } from '@/modules/health/application/usecases/CheckReadinessUseCase.ts';

class HealthController {
  @trace()
  checkHealth() {
    const checkHealthUseCase = new CheckHealthUseCase();

    return checkHealthUseCase.execute();
  }

  @trace()
  async checkReadiness() {
    const checkReadinessUseCase = container.resolve(CheckReadinessUseCase);

    return checkReadinessUseCase.execute();
  }
}

export { HealthController };
