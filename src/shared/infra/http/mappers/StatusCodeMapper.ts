import { StatusMap } from 'elysia';

type ElysiaStatus = number | string | undefined;

class StatusCodeMapper {
  static toNumber(status: ElysiaStatus): number {
    if (typeof status === 'number') return status;
    if (typeof status === 'string') return StatusMap[status as keyof typeof StatusMap] ?? 200;
    return 200;
  }
}

export { StatusCodeMapper };
