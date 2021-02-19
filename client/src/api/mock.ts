import { Bird, UploadURLResponse } from "../../../common/types";

const mockBirds: Bird[] = [
  {
    id: "00",
    img:
      "https://upload.wikimedia.org/wikipedia/commons/4/45/Ploceus_velatus_beak_open.jpg",
    tags: ["Southern Masked Weaver"],
  },
  {
    id: "01",
    img:
      "https://upload.wikimedia.org/wikipedia/commons/4/4a/Red_billed_gull-02.jpg",
    tags: ["Gull"],
  },
  {
    id: "02",
    img:
      "https://upload.wikimedia.org/wikipedia/commons/2/24/Male_mallard_duck_2.jpg",
    tags: ["Duck", "Mallard"],
  },
  {
    id: "03",
    img:
      "https://upload.wikimedia.org/wikipedia/commons/0/06/NZ_North_Island_Robin-3.jpg",
    tags: ["New Zealand North Island Robin"],
  },
  {
    id: "04",
    img:
      "https://upload.wikimedia.org/wikipedia/commons/9/97/Swallow-tailed_bee-eater_%28Merops_hirundineus_chrysolaimus%29.jpg",
    tags: ["Swallow-Tailed Bee-Eater"],
  },
  {
    id: "05",
    img:
      "https://upload.wikimedia.org/wikipedia/commons/b/b9/Estornino_de_El_Cabo_%28Lamprotornis_nitens%29%2C_parque_nacional_Kruger%2C_Sud%C3%A1frica%2C_2018-07-25%2C_DD_56.jpg",
    tags: ["Cape Starling", "Starling"],
  },
  {
    id: "06",
    img:
      "https://upload.wikimedia.org/wikipedia/commons/b/ba/Solsort.jpg",
    tags: ["Blackbird"],
  },
  {
    id: "07",
    img:
      "https://upload.wikimedia.org/wikipedia/commons/5/51/Mandarin.duck.arp.jpg",
    tags: ["Mandarin Duck", "Duck"],
  },
  {
    id: "08",
    img:
      "https://upload.wikimedia.org/wikipedia/commons/3/34/Grey_duck_and_spotbill_duck%2C_Yokohama_City%3B_May_2013_%2805%29.jpg",
    tags: ["Duck"],
  },
  {
    id: "09",
    img:
      "https://upload.wikimedia.org/wikipedia/commons/7/72/Common_blackbird_%28Turdus_merula_mauretanicus%29_female.jpg",
    tags: ["Blackbird"],
  },
  {
    id: "10",
    img:
      "https://upload.wikimedia.org/wikipedia/commons/c/c8/Asian_pied_starlings_%28Gracupica_contra%29.jpg",
    tags: ["Asian Pied Starling", "Starling"],
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
