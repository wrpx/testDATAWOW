import { apiRequest } from "@/api/httpClient";
import { Concert } from "@/lib/types";

export function fetchConcerts() {
  return apiRequest<Concert[]>({ path: "/concerts" });
}
