import { Bird, UploadURLResponse } from "../../../common/types";

const mockBirds: Bird[] = [
  {
    id: "00",
    img:
      "https://bird-images-xxx.s3-us-west-2.amazonaws.com/60fe7140-36ee-4eef-9b72-c112b89ea1e0.jpg",
    tags: ["robin"],
  },
  {
    id: "01",
    img:
      "https://bird-images-xxx.s3-us-west-2.amazonaws.com/2967dffc-da51-4a75-b122-fa1a772ebb27.jpg",
    tags: ["robin", "swan"],
  },
  {
    id: "02",
    img:
      "https://bird-images-xxx.s3-us-west-2.amazonaws.com/60fe7140-36ee-4eef-9b72-c112b89ea1e0.jpg",
    tags: ["goose"],
  },
  {
    id: "03",
    img:
      "https://bird-images-xxx.s3-us-west-2.amazonaws.com/60fe7140-36ee-4eef-9b72-c112b89ea1e0.jpg",
    tags: ["bluejay"],
  },
  {
    id: "04",
    img:
      "https://bird-images-xxx.s3-us-west-2.amazonaws.com/60fe7140-36ee-4eef-9b72-c112b89ea1e0.jpg",
    tags: ["finch"],
  },
  {
    id: "05",
    img:
      "https://bird-images-xxx.s3-us-west-2.amazonaws.com/60fe7140-36ee-4eef-9b72-c112b89ea1e0.jpg",
    tags: ["chickadee", "coco"],
  },
  {
    id: "06",
    img:
      "https://bird-images-xxx.s3-us-west-2.amazonaws.com/60fe7140-36ee-4eef-9b72-c112b89ea1e0.jpg",
    tags: ["yellow"],
  },
  {
    id: "07",
    img:
      "https://bird-images-xxx.s3-us-west-2.amazonaws.com/60fe7140-36ee-4eef-9b72-c112b89ea1e0.jpg",
    tags: ["red"],
  },
];

export function update(updatedBird: Bird): Promise<unknown> {
  return new Promise((resolve) => {
    const index = mockBirds.findIndex((bird) => bird.id === updatedBird.id);

    mockBirds.splice(index, 1, updatedBird);

    resolve(undefined);
  });
}

export function list(): Promise<Bird[]> {
  return new Promise((resolve) => {
    resolve(mockBirds);
  });
}

export function create(bird: Omit<Bird, "id">): Promise<Bird> {
  return new Promise((resolve) => {
    const newBird = {
      id: Math.random().toString(),
      ...bird,
    };

    mockBirds.push(newBird);

    resolve(newBird);
  });
}

export function getUploadURL(mimeType: string): Promise<UploadURLResponse> {
  return new Promise((resolve) => {
    resolve({
      uploadURL: "",
      key: mockBirds[0].img.split("/").slice(-1)[0],
    });
  });
}
