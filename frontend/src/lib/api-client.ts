import { API_BASE_URL } from "@/lib/config";

type RequestOptions = RequestInit & {
  path: string;
};

export async function apiRequest<T>({ path, ...options }: RequestOptions): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {})
    }
  });
  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      payload?.errors?.[0] ??
      (Array.isArray(payload?.message) ? payload.message[0] : payload?.message) ??
      "Request failed";
    throw new Error(message);
  }

  return payload as T;
}
