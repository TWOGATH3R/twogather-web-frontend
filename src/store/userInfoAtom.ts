import { atom } from "recoil";
import { v1 } from "uuid";

export const Name = atom({
  key: `name/${v1()}`,
  default: "",
});

export const Id = atom({
  key: `name/${v1()}`,
  default: "",
});

export const Email = atom({
  key: `name/${v1()}`,
  default: "",
});
