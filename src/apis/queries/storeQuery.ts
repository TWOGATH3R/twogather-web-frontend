import { api } from "../untils";
import { getCookie } from "../../components/cookie/cookie";
import {
  GetMyStoreListProps,
  GetMyStoreListResponse,
  GetStoreInfoResponse,
  PutBusinessHourListResponse,
} from "./type";
import {
  postEnrollShopInfoProps,
  postEnrollShopInfoResponse,
  postMenuListProps,
} from "../types/store.type";

//Post  /api/stores
export const postEnrollShopInfo = async (
  storeInfo: postEnrollShopInfoProps
): Promise<postEnrollShopInfoResponse> => {
  const { data } = await api.post(
    `/api/stores`,
    {
      storeName: storeInfo.storeName,
      address: storeInfo.address,
      phone: storeInfo.phone,
      businessNumber: storeInfo.businessNumber,
      businessName: storeInfo.businessName,
      businessStartDate: storeInfo.businessStartDate,
      keywordIdList: storeInfo.keywordIdList,
      categoryId: storeInfo.categoryId,
    },
    {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json,",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    }
  );
  return data;
};

export const getEnrollShopCategory = async () => {
  const res = await api.get(`/api/categories`, {
    headers: {
      "Content-Type": "application/json",
      accept: "application/json,",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });
  return res.data;
};

export const postEnrollShopImageList = async (storeInfo: any) => {
  const res = await api.post(`/api/stores/1/images `, {
    imageId: "1",
    url: "",
  });
  return res.data;
};

// Get / api / stores / { storeId };
export const geStoreOne = async ({
  storeId,
}: {
  storeId: string;
}): Promise<GetStoreInfoResponse> => {
  //todo 임시로 reviewCounts 추후 변경할 것
  const URL = `api/stores/${storeId}
  }`;
  const { data } = await api.get(URL, {
    headers: {
      "Content-Type": "application/json",
      accept: "application/json,",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });

  return data;
};

//Get /api/my/stores/?ownerId=1&page=1&size=2&sort=reviewsCount,desc
export const getMyStoreList = async ({
  ownerId,
  page = 1,
  size = 1,
  sort = { type: "MOST_REVIEWD", order: "desc" },
}: GetMyStoreListProps): Promise<GetMyStoreListResponse> => {
  //todo 임시로 reviewCounts 추후 변경할 것
  const URL = `api/my/stores/?ownerId=${ownerId}&page=${page}&size=${size}&sort=${"reviewsCount"},${
    sort?.order
  }`;
  const { data } = await api.get(URL, {
    headers: {
      "Content-Type": "application/json",
      accept: "application/json,",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });

  console.log(data);
  return data;
};

//putConsumerInfoChange /api/stores/{storeId}/business-hours
export const putBusinessHourtList = async ({
  storeId,
}: {
  storeId: number;
}): Promise<PutBusinessHourListResponse> => {
  const URL = `api/stores${storeId}/business-hours`;

  const { data } = await api.put(URL, {
    headers: {
      "Content-Type": "application/json",
      accept: "application/json,",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });

  console.log(data);
  return data;
};

//가게등록시 사진 등록 api
export const postStoreImg = async (shopImages: any, storeId: string) => {
  console.log(shopImages);
  const URL = `/api/stores/${storeId}/images`;

  const { data } = await api.post(URL, {
    headers: {
      "Content-Type": "application/json",
      accept: "application/json,",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });
  return data;
};

//가게등록시 메뉴 등록 api
export const postMenuList = async (
  shopMenuList: postMenuListProps[],
  storeId: string
) => {
  const list = shopMenuList.map((value) => {
    return {
      name: value.shopMenuName,
      price: value.shopMenuPrice,
    };
  });
  const URL = `/api/stores/${storeId}/menus`;

  const { data } = await api.post(
    URL,
    {
      menuSaveList: list,
    },
    {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json,",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    }
  );
  return data;
};

//가게등록시 영업시간 등록 api
export const postOpenHour = async () => {
  const URL = `/api/stores/1/images`;

  const { data } = await api.post(URL, {
    headers: {
      "Content-Type": "application/json",
      accept: "application/json,",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });
  return data;
};
