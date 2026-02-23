import { ServiceUnavailableException } from '@shared/domain/exceptions/ServiceUnavailableException.ts';
import type {
  CheckReadinessOutput,
  ComponentHealth,
} from '@/modules/health/application/usecases/DTOs/CheckReadinessUseCaseDTO.ts';
import { HealthStatus } from '@/modules/health/domain/enums/HealthStatus.ts';

class HealthStatusResolver {
  static resolve(pings: Record<string, boolean>): CheckReadinessOutput {
    const components: Record<string, ComponentHealth> = {};

    for (const [name, isHealthy] of Object.entries(pings)) {
      components[name] = { status: HealthStatusResolver.toHealthStatus(isHealthy) };
    }

    const status = HealthStatusResolver.resolveOverallStatus(components);

    return { status, components };
  }

  private static resolveOverallStatus(components: Record<string, ComponentHealth>): HealthStatus {
    const hasUnhealthy = Object.values(components).some(component => component.status === HealthStatus.Unhealthy);
    if (hasUnhealthy) {
      throw new ServiceUnavailableException('Readiness check detected unhealthy components', { components });
    }

    return HealthStatus.Healthy;
  }

  private static toHealthStatus(isHealthy: boolean): HealthStatus {
    if (isHealthy) {
      return HealthStatus.Healthy;
    }

    return HealthStatus.Unhealthy;
  }
}

export { HealthStatusResolver };
