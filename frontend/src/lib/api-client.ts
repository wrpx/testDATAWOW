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

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    const message = payload?.message ?? "Request failed";
    throw new Error(message);
  }

  return response.json() as Promise<T>;
}
