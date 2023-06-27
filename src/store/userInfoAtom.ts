import { atom } from "recoil";
import { v1 } from "uuid";

export const Name = atom({
  key: `name/${v1()}`,
  default: "",
});

export const Id = atom({
  key: `id/${v1()}`,
  default: "",
});

export const Email = atom({
  key: `email/${v1()}`,
  default: "",
});

export const StoreId = atom({
  key: `storeid/${v1()}`,
  default: 0,
});
