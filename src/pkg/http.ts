import ky, { HTTPError } from 'ky';
import { err, ok } from 'resulto';
import { cleanObject } from 'src/utils';

import type { Options as KyOptions } from 'ky';
import type { Result } from 'resulto';
import type { z } from 'zod';

type HTTPConfig = {
  url: string;
  timeout: number;
  debug: boolean;
};

type KyInstance = typeof ky;

type SearchParams = Record<string, string | number | boolean | undefined>;

type Options = Omit<KyOptions, 'searchParams'> & {
  url: string;
  searchParams?: SearchParams;
};

export type ValidationError = {
  kind: 'Validation';
  details: z.ZodError;
};

export type UnknownError = {
  kind: 'Unknown';
  details: unknown;
};

export type FailedRequestError = {
  kind: 'FailedRequest';
  details: HTTPError;
};

export type FetchError = ValidationError | UnknownError | FailedRequestError;

export class HTTPClient {
  private client: KyInstance;

  constructor(private cfg: HTTPConfig) {
    this.client = ky.extend({
      prefixUrl: this.cfg.url,
      timeout: this.cfg.timeout,
    });
  }

  async fetch<T extends z.ZodType>(
    schema: T,
    options: Options,
  ): Promise<Result<T['_output'], FetchError>> {
    const { url } = options;

    try {
      const raw = await this.client(url, {
        ...options,
        searchParams: options.searchParams
          ? cleanObject(options.searchParams)
          : undefined,
      }).json();

      const parsed = schema.safeParse(raw);

      if (!parsed.success) {
        return err({
          kind: 'Validation',
          details: parsed.error,
        });
      }

      return ok(parsed.data);
    } catch (error) {
      if (error instanceof HTTPError) {
        return err({
          kind: 'FailedRequest',
          details: error,
        });
      } else {
        return err({
          kind: 'Unknown',
          details: error,
        });
      }
    }
  }
}
