import { HTTPClient } from 'src/pkg/http';
import { formUrlEncoded } from 'src/utils';
import { z } from 'zod';

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
}
