import { Dog } from "./types";

export const baseUrl = "http://localhost:3000";

const getAllDogs = (): Promise<Dog[]> =>
  fetch(`${baseUrl}/dogs`).then((response): Promise<Dog[]> => response.json());

const postDog = (dog: Omit<Dog, "id">): Promise<Dog> =>
  fetch(`${baseUrl}/dogs`, {
    body: JSON.stringify(dog),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response): Promise<Dog> => response.json());

const deleteDog = (id: number) =>
  fetch(`${baseUrl}/dogs/${id}`, {
    method: "DELETE",
  }).then((response) => response);

const updateDog = (id: number, update: { isFavorite: boolean }) =>
  fetch(`${baseUrl}/dogs/${id}`, {
    body: JSON.stringify(update),
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response);

export const Requests = {
  postDog,
  deleteDog,
  updateDog,
  getAllDogs,
};
