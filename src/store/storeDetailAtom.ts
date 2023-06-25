import { atom } from "recoil";
import { v1 } from "uuid";

export const StoreId = atom({
  key: `storeId/${v1()}`,
  default: 0,
});

export const Address = atom({
  key: `address/${v1()}`,
  default: "",
});

export const CategoryName = atom({
  key: `categoryName/${v1()}`,
  default: "",
});

export const KeywordList = atom({
  key: `keywordList
  /${v1()}`,
  default: {},
});

export const LikeCount = atom({
  key: `likeCount/${v1()}`,
  default: 0,
});

export const Phone = atom({
  key: `phone/${v1()}`,
  default: "",
});

export const StoreName = atom({
  key: `storeName/${v1()}`,
  default: "",
});
