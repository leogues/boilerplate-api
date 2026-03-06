import { ExceptionCode } from '@shared/domain/enums/ExceptionCode.ts';

type HttpMapping = {
  status: number;
  error: string;
};

class ExceptionHttpMapper {
  private static readonly mappings: Record<ExceptionCode, HttpMapping> = {
    [ExceptionCode.BadRequest]: { status: 400, error: 'Bad Request' },
    [ExceptionCode.Unauthorized]: { status: 401, error: 'Unauthorized' },
    [ExceptionCode.Forbidden]: { status: 403, error: 'Forbidden' },
    [ExceptionCode.NotFound]: { status: 404, error: 'Not Found' },
    [ExceptionCode.Validation]: { status: 422, error: 'Unprocessable Entity' },
    [ExceptionCode.Internal]: { status: 500, error: 'Internal Server Error' },
    [ExceptionCode.ServiceUnavailable]: { status: 503, error: 'Service Unavailable' },
  };

  private static readonly defaultMapping: HttpMapping = {
    status: 500,
    error: 'Internal Server Error',
  };

  static toHttp(code: ExceptionCode): HttpMapping {
    return ExceptionHttpMapper.mappings[code] ?? ExceptionHttpMapper.defaultMapping;
  }
}

export { ExceptionHttpMapper };
