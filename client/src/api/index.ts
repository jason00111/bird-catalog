import { Bird, UploadURLResponse } from "../../../common/types";
import * as mockAPI from "./mock";

const BIRDS_ENDPOINT_URL = `${process.env.REACT_APP_API_URL}/birds`;
const CREATE_UPLOAD_URL_ENDPOINT_URL = `${process.env.REACT_APP_API_URL}/createUploadURL`;
const isDev = process.env.NODE_ENV === "development";

export function update(updatedBird: Bird): Promise<unknown> {
  if (isDev) {
    return mockAPI.update(updatedBird);
  }

  return fetch(`${BIRDS_ENDPOINT_URL}/${updatedBird.id}`, {
    method: "PUT",
    body: JSON.stringify(updatedBird),
  }).then((response) => response.json());
}

export function list(): Promise<Bird[]> {
  if (isDev) {
    return mockAPI.list();
  }

  return fetch(BIRDS_ENDPOINT_URL)
    .then((response) => response.json())
    .then((data) => {
      return data.birds;
    });
}

export function create(bird: Omit<Bird, "id">): Promise<Bird> {
  if (isDev) {
    return mockAPI.create(bird);
  }

  return fetch(BIRDS_ENDPOINT_URL, {
    method: "POST",
    body: JSON.stringify(bird),
  })
    .then((response) => response.json())
    .then((createdBird) => {
      return createdBird;
    });
}

export function getUploadURL(mimeType: string): Promise<UploadURLResponse> {
  if (isDev) {
    return mockAPI.getUploadURL(mimeType);
  }

  const encodedMimeType = encodeURIComponent(mimeType);

  return fetch(`${CREATE_UPLOAD_URL_ENDPOINT_URL}/${encodedMimeType}`)
    .then((response) => {
      const contentType = response.headers.get("Content-Type");

      if (contentType !== "application/json") {
        throw new Error(`Expected to get json response but got ${contentType}`);
      }

      return response.json();
    })
    .then((data) => {
      return data;
    });
}
