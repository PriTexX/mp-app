import { useQuery as reactUseQuery } from 'react-query';

import type { FetchError } from './http';
import type { Result } from 'resulto';

export type UseQueryHook<T, Error> =
  | {
      status: 'loading';
      data: undefined;
      error: undefined;
    }
  | { status: 'success'; data: T; error: undefined }
  | { status: 'error'; data: undefined; error: Error | FetchError };

export function useQuery<T, Error>(
  queryKey: string,
  queryFn: () => Promise<Result<T, Error>>,
): UseQueryHook<T, Error> {
  const { status, data, error } = reactUseQuery(queryKey, queryFn);

  if (status == 'loading' || status == 'idle') {
    return { status: 'loading', data, error: undefined };
  }

  if (status == 'error') {
    return {
      status: 'error',
      error: { kind: 'Unknown', details: error },
      data: undefined,
    };
  }

  if (status == 'success') {
    if (data.isErr()) {
      return { status: 'error', error: data.error, data: undefined };
    }

    return { status: 'success', data: data.value, error: undefined };
  }

  // This will never be invoked as
  // all statuses processed
  throw 1;
}
