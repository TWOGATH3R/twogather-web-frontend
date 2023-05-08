import { atom } from "recoil";
import { v1 } from "uuid";

export const address = atom({
  key: `address/${v1()}`,
  default: "",
});

export const visibleAddress = atom({
  key: `visibleAddress${v1()}`,
  default: false,
});
