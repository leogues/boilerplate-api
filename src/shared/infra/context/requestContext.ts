import { AsyncLocalStorage } from 'node:async_hooks';

type RequestStore = {
  requestId: string;
};

const requestContextStorage = new AsyncLocalStorage<RequestStore>();

export { requestContextStorage, type RequestStore };
