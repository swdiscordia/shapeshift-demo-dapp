// Thin fetch wrapper used by every external service in the app.
// Centralises error handling and JSON parsing so providers don't repeat boilerplate.

export class HttpError extends Error {
  constructor(
    public readonly status: number,
    public readonly body: unknown,
    message: string,
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

export async function httpGet<T>(url: string, init?: RequestInit): Promise<T> {
  return request<T>(url, { ...init, method: 'GET' });
}

export async function httpPost<T>(url: string, body: unknown, init?: RequestInit): Promise<T> {
  return request<T>(url, {
    ...init,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    body: JSON.stringify(body),
  });
}

async function request<T>(url: string, init: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: 'application/json',
      ...(init.headers ?? {}),
    },
  });

  const text = await res.text();
  let parsed: unknown = text;
  try {
    parsed = text ? JSON.parse(text) : undefined;
  } catch {
    // Keep as text; the response was not JSON.
  }

  if (!res.ok) {
    throw new HttpError(res.status, parsed, `${init.method ?? 'GET'} ${url} → ${res.status}`);
  }

  return parsed as T;
}
