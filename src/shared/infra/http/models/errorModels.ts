import { Elysia } from 'elysia';
import {
  BadRequestResponse,
  ForbiddenResponse,
  InternalErrorResponse,
  NotFoundResponse,
  ServiceUnavailableResponse,
  UnauthorizedResponse,
  ValidationResponse,
} from '../schemas/errorSchemas.ts';

const errorModels = new Elysia({ name: 'errorModels' }).model({
  BadRequestResponse,
  UnauthorizedResponse,
  ForbiddenResponse,
  NotFoundResponse,
  ValidationResponse,
  InternalErrorResponse,
  ServiceUnavailableResponse,
});

export { errorModels };
