import { ApolloClient, InMemoryCache } from '@apollo/client';
import { err, ok } from 'resulto';

import type { FailedRequestError, FetchError } from './http';
import type { DocumentNode, NormalizedCacheObject } from '@apollo/client';
import type { Result } from 'resulto';
import type { z } from 'zod';

export class SafeGraphQLClient {
  private client: ApolloClient<NormalizedCacheObject>;

  constructor(uri: string) {
    this.client = new ApolloClient({
      uri,
      cache: new InMemoryCache(),
    });
  }

  async fetch<T extends z.ZodType>(
    schema: T,
    query: DocumentNode,
    variables?: Record<string, unknown>,
  ): Promise<Result<T['_output'], Exclude<FetchError, FailedRequestError>>> {
    try {
      const raw = await this.client.query({ query, variables });

      const parsed = schema.safeParse(raw);

      if (!parsed.success) {
        return err({
          kind: 'Validation',
          details: parsed.error,
        });
      }

      return ok(parsed.data);
    } catch (error) {
      return err({
        kind: 'Unknown',
        details: error,
      });
    }
  }
}

export { gql } from '@apollo/client';
