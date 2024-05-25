export interface House {
  animal: string;
  commonRoom: string;
  element: string;
  founder: string;
  ghost: string;
  heads: string[];
  houseColors: string[];
  houseId: string;
  name: string;
  traits: string[];
  image: string;
  className?: string; // Itt hozzáadtuk a className tulajdonságot, ami opcionális
  points: number;
  id?: string;
}

export interface Member {
  studentHouse: string;
  userId: string
  firstName: string;
  lastName: string;
  email: string;
}