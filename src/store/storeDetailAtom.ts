import { atom } from "recoil";
import { v1 } from "uuid";
import { getStoreReviewResponse } from "../apis/types/review.type";

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

export const TotalReviewCount = atom({
  key: `totalReviewCount/${v1()}`,
  default: 0,
});

export const OwnerId = atom({
  key: `ownerId/${v1()}`,
  default: 0,
});

export const ReviewList = atom<getStoreReviewResponse>({
  key: `reviewList/${v1()}`,
  default: undefined,
});

export const Sort = atom<string>({
  key: `sort/${v1()}`,
  default: "createdDate,desc",
});

export const Page = atom({
  key: `page/${v1()}`,
  default: 0,
});
