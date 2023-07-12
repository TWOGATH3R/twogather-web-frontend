import { atom } from "recoil";
import { v1 } from "uuid";

export const Categories = atom({
  key: `categories/${v1()}`,
  default: "모든 카테고리",
});
export const KeyWord = atom({
  key: `keyWord/${v1()}`,
  default: "",
});
export const SearchText = atom({
  key: `searchText/${v1()}`,
  default: "",
});
export const City = atom({
  key: `city/${v1()}`,
  default: "전체 지역",
});
export const Si = atom({
  key: `si/${v1()}`,
  default: "",
});
export const PageNum = atom({
  key: `pageNum/${v1()}`,
  default: "1",
});
