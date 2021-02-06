export interface Bird {
  id: string,
  img: string,
  tags: string[],
}

export interface UploadURLResponse {
  uploadURL: string;
  key: string;
}