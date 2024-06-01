import { HTTPClient } from 'src/pkg/http';
import { formUrlEncoded } from 'src/utils';
import { z } from 'zod';

import {
  newsSchema,
  pdInfoSchema,
  studentScheduleSchema,
  userAvatarSchema,
  userDataSchema,
} from './schemas';

export class LkClient {
  private client: HTTPClient;

  constructor() {
    this.client = new HTTPClient({
      timeout: 20_000,
      url: 'https://e.mospolytech.ru',
    });
  }

  login(username: string, password: string) {
    const body = formUrlEncoded({
      ulogin: username,
      upassword: password,
    });

    return this.client.fetch(
      z.object({ jwt: z.string(), jwt_refresh: z.string(), token: z.string() }),
      {
        url: 'old/lk_api.php',
        method: 'post',
        body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
  }

  getUserData(token: string) {
    return this.client.fetch(userDataSchema, {
      url: 'old/lk_api.php',
      method: 'get',
      searchParams: {
        getAppData: true,
        token,
      },
    });
  }

  getUserAvatar(token: string) {
    return this.client.fetch(userAvatarSchema, {
      url: 'old/lk_api.php',
      method: 'get',
      searchParams: {
        getUser: true,
        token,
      },
    });
  }

  getSchedule(token: string, group: string, session?: boolean) {
    return this.client.fetch(studentScheduleSchema, {
      url: 'old/lk_api.php',
      method: 'get',
      searchParams: {
        getSchedule: true,
        token,
        ...(session ? { session: true } : { group }),
      },
    });
  }

  getPdInfo(token: string) {
    return this.client.fetch(pdInfoSchema, {
      url: 'old/lk_api.php',
      method: 'get',
      searchParams: {
        PDinfo: true,
        token,
      },
    });
  }

  getNews(token: string) {
    return this.client.fetch(z.array(newsSchema), {
      url: 'old/lk_api.php',
      method: 'get',
      searchParams: {
        getAlerts: true,
        token,
      },
    });
  }
}

export const lkClient = new LkClient();
