import { Elysia } from 'elysia';
import {
  BadRequestResponse,
  ForbiddenResponse,
  InternalErrorResponse,
  NotFoundResponse,
  ServiceUnavailableResponse,
  UnauthorizedResponse,
  UnprocessableResponse,
} from '../schemas/errorSchemas.ts';

const errorModels = new Elysia({ name: 'errorModels' }).model({
  BadRequestResponse,
  UnauthorizedResponse,
  ForbiddenResponse,
  NotFoundResponse,
  UnprocessableResponse,
  InternalErrorResponse,
  ServiceUnavailableResponse,
});

export { errorModels };
