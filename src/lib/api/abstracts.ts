import { backendGet } from "./backend";
import type { AbstractDetailResponse } from "./types";

export async function getAbstract(id: string): Promise<AbstractDetailResponse> {
  return backendGet<AbstractDetailResponse>(`/abstracts/${id}`);
}
