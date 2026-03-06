import { t } from 'elysia';

const ErrorResponse = (status: number, error: string) =>
  t.Object({
    status: t.Literal(status),
    error: t.Literal(error),
    message: t.String(),
  });

const ValidationErrorResponse = (status: number, error: string) =>
  t.Object({
    status: t.Literal(status),
    error: t.Literal(error),
    message: t.String(),
    details: t.Optional(t.Record(t.String(), t.String())),
  });

const BadRequestResponse = ErrorResponse(400, 'Bad Request');
const UnauthorizedResponse = ErrorResponse(401, 'Unauthorized');
const ForbiddenResponse = ErrorResponse(403, 'Forbidden');
const NotFoundResponse = ErrorResponse(404, 'Not Found');
const ValidationResponse = ValidationErrorResponse(422, 'Unprocessable Entity');
const InternalErrorResponse = ErrorResponse(500, 'Internal Server Error');
const ServiceUnavailableResponse = ErrorResponse(503, 'Service Unavailable');

export {
  BadRequestResponse,
  ForbiddenResponse,
  InternalErrorResponse,
  NotFoundResponse,
  ServiceUnavailableResponse,
  UnauthorizedResponse,
  ValidationResponse,
};
