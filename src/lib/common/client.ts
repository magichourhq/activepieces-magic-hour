import { HttpError, HttpMessageBody, HttpMethod } from '@activepieces/pieces-common';
import { request } from 'node:https';

async function call<T extends HttpMessageBody>({
  apiKey,
  method,
  path,
  body,
  queryParams,
}: {
  apiKey: string;
  method: HttpMethod;
  path: string;
  body?: HttpMessageBody;
  queryParams?: Record<string, unknown>;
}): Promise<T> {
  if (!path.startsWith('/') || path.startsWith('//')) {
    throw new Error('Use a relative Magic Hour API path, for example /account.');
  }
  const url = new URL(`${MAGIC_HOUR_BASE_URL}${path}`);
  if (url.origin !== 'https://api.magichour.ai' || !url.pathname.startsWith('/v1/')) {
    throw new Error('Requests must stay within https://api.magichour.ai/v1/.');
  }
  for (const [key, value] of Object.entries(queryParams ?? {})) {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, String(value));
    }
  }
  const data = method === HttpMethod.GET || body === undefined ? undefined : JSON.stringify(body);

  return new Promise<T>((resolve, reject) => {
    const req = request(
      url,
      {
        method,
        rejectUnauthorized: true,
        agent: false,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${apiKey}`,
          ...(data === undefined
            ? {}
            : {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data),
              }),
        },
      },
      (res) => {
        let raw = '';
        res.setEncoding('utf8');
        res.on('data', (chunk: string) => {
          raw += chunk;
        });
        res.on('error', reject);
        res.on('end', () => {
          let result: unknown = raw;
          try {
            result = raw ? JSON.parse(raw) : undefined;
          } catch {
            // Keep non-JSON service errors readable.
          }
          const status = res.statusCode ?? 500;
          if (status < 200 || status >= 300) {
            reject(
              new HttpError(body, {
                response: { status, data: result },
              } as ConstructorParameters<typeof HttpError>[1]),
            );
            return;
          }
          resolve(result as T);
        });
      },
    );
    req.on('error', reject);
    req.end(data);
  });
}

export const magicHourApi = { call };
export const MAGIC_HOUR_BASE_URL = 'https://api.magichour.ai/v1';
