import type { CacheProvider } from '@shared/domain/providers/CacheProvider/CacheProvider.ts';
import { trace } from '@shared/infra/decorators/trace.ts';
import { inject, injectable } from 'tsyringe';
import { DEPENDENCIES } from '@/di/dependencies.ts';
import type { HealthRepository } from '@/modules/health/domain/repositories/HealthRepository.ts';
import { HealthStatusResolver } from '@/modules/health/domain/resolvers/HealthStatusResolver.ts';
import type { CheckReadinessOutput } from './DTOs/CheckReadinessUseCaseDTO.ts';

@injectable()
class CheckReadinessUseCase {
  constructor(
    @inject(DEPENDENCIES.HealthRepository)
    private readonly healthRepository: HealthRepository,
    @inject(DEPENDENCIES.CacheProvider)
    private readonly cacheProvider: CacheProvider,
  ) {}

  @trace()
  async execute(): Promise<CheckReadinessOutput> {
    const [database, cache] = await Promise.all([this.healthRepository.ping(), this.cacheProvider.ping()]);

    return HealthStatusResolver.resolve({ database, cache });
  }
}

export { CheckReadinessUseCase };
