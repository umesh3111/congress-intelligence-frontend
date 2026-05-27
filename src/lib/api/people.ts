import { backendGet } from "./backend";
import type { PersonResponse, PersonAppearanceResponse } from "./types";

export async function getPerson(id: string): Promise<PersonResponse> {
  return backendGet<PersonResponse>(`/people/${id}`);
}

export async function getPersonAppearances(id: string): Promise<PersonAppearanceResponse[]> {
  return backendGet<PersonAppearanceResponse[]>(`/people/${id}/appearances`);
}
