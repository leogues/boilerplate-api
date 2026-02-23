import { Elysia, t } from 'elysia';
import { ulid } from 'ulid';
import { requestContextStorage } from '../../context/requestContext';

const requestContext = new Elysia({ name: 'requestContext' })
  .guard({
    headers: t.Object({
      'x-request-id': t.Optional(t.String({ maxLength: 36 })),
    }),
  })
  .onRequest(function requestContextHandler({ request, set }) {
    const requestId = request.headers.get('x-request-id') ?? ulid();
    requestContextStorage.enterWith({ requestId });

    set.headers['x-request-id'] = requestId;
  })
  .as('scoped');
export { requestContext };
