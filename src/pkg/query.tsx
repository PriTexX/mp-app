import { useQuery as reactUseQuery } from 'react-query';

import type { FetchError } from './http';
import type { Result } from 'resulto';

export type UseQueryHook<T, Error> =
  | {
      status: 'loading';
      data: undefined;
      err: undefined;
    }
  | { status: 'success'; data: T; err: undefined }
  | { status: 'error'; data: undefined; err: Error | FetchError };

export function useQuery<T, Error>(
  queryKey: string,
  queryFn: () => Promise<Result<T, Error>>,
): UseQueryHook<T, Error> {
  const { status, data, error } = reactUseQuery(queryKey, queryFn);

  if (status == 'loading' || status == 'idle') {
    return { status: 'loading', data, err: undefined };
  }

  if (status == 'error') {
    return {
      status: 'error',
      err: { kind: 'Unknown', details: error },
      data: undefined,
    };
  }

  if (status == 'success') {
    if (data.isErr()) {
      return { status: 'error', err: data.error, data: undefined };
    }

    return { status: 'success', data: data.value, err: undefined };
  }

  // This will never be invoked as
  // all statuses processed
  throw 1;
}
