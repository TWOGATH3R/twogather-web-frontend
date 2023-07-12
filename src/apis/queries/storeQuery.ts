import React, { useEffect } from "react";
import { api } from "../untils";
import { getCookie } from "../../components/cookie/cookie";
import {
  GetMyStoreListProps,
  GetMyStoreListResponse,
  GetStoreInfoResponse,
  PutBusinessHourListResponse,
} from "./type";
import {
  deleteImgListProps,
  deleteMenuListResponse,
  getCategoriesResponse,
  getImgResponse,
  getMenuListResponse,
  getMyStoresInfoResponse,
  getStoresResponse,
  postEnrollShopInfoProps,
  postEnrollShopInfoResponse,
  postMenuListProps,
  postMenuListResponse,
  postOpenHourProps,
  postOpenHourResponse,
  postStoreImgResponse,
} from "../types/store.type";
import { getKeyWordListResponse } from "../types/main.type";

//가게 등록 api
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
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    }
  );
  return data;
};

//가게등록시 사진 등록 api
export const postStoreImg = async (
  shopImages: File[],
  storeId: string | null
): Promise<postStoreImgResponse> => {
  const form = new FormData();
  shopImages.forEach((value, index) => {
    form.append("storeImageList", shopImages[index]);
  });

  const { data } = await api.post(`/api/stores/${storeId}/images`, form, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });

  return data;
};

//가게등록시 메뉴 등록 api
export const postMenuList = async (
  shopMenuList: postMenuListProps[],
  storeId: string
): Promise<postMenuListResponse> => {
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
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    }
  );
  return data;
};

//가게등록시 영업시간 등록 api
export const postOpenHour = async (
  dayOfWeek: postOpenHourProps[],
  storeId: string
): Promise<postOpenHourResponse> => {
  const URL = `/api/stores/${storeId}/business-hours`;

  const { data } = await api.put(
    URL,
    {
      businessHourList: dayOfWeek,
    },
    {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    }
  );
  return data;
};

//가게정보 가져오기 api
export const getStoreOne = async (
  storeId: number
): Promise<GetStoreInfoResponse> => {
  const URL = `api/stores/${storeId}`;
  const { data } = await api.get(URL);
  return data;
};

//가게 영업시간 가져오기 api
export const getOpenHour = async (storeId: number | null) => {
  const URL = `/api/stores/${storeId}/business-hours`;
  const { data } = await api.get(URL);
  return data;
};

//가게 메뉴리스트 가져오기 api
export const getMenuList = async (
  storeId: number
): Promise<getMenuListResponse> => {
  const URL = `/api/stores/${storeId}/menus`;
  const { data } = await api.get(URL);
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
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });

  console.log(data);
  return data;
};

//좋아요 누르기
export const postLike = async (storeId: number, memberId: string | null) => {
  const res = await api.post(
    `/api/stores/${storeId}/members/${memberId}/likes`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    }
  );
  return res;
};

//좋아요 해제
export const deleteLike = async (storeId: number, memberId: string | null) => {
  const { data } = await api.delete(
    `/api/stores/${storeId}/members/${memberId}/likes`,
    {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    }
  );
  return data;
};

//가게 사진 List 가져오기 api
export const getImg = async (
  storeId: string | null
): Promise<getImgResponse> => {
  const URL = `/api/stores/${storeId}/images`;
  const { data } = await api.get(URL);
  return data;
};

//DB에서 카테고리 리스트 가져오기 api
export const getCategories = async (): Promise<getCategoriesResponse> => {
  const URL = `/api/categories`;
  const { data } = await api.get(URL);
  return data;
};

//DB에서 키워드 리스트 가져오기 api
export const getKeyWordList = async (): Promise<getKeyWordListResponse> => {
  const { data } = await api.get(`/api/keywords?count=20`);
  return data;
};

//사업자가 등록한 가게 리스트 가져오기 api
export const getStores = async (
  memberId: string | null,
  pageNum: number
): Promise<getStoresResponse> => {
  const URL = `/api/my/stores/?ownerId=${memberId}&page=${
    pageNum - 1
  }&size=5&sort=MOST_REVIEWED,desc`;
  const { data } = await api.get(URL, {
    headers: {
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });
  return data;
};

//내가게 정보 가져오기 api
export const getMyStoresInfo = async (
  storeId: string | null
): Promise<getMyStoresInfoResponse> => {
  console.log("정보시작", storeId, getCookie("accessToken"));
  const URL = `/api/my/stores/${storeId}/detail`;
  const { data } = await api.get(URL, {
    headers: {
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });
  return data;
};

//가게 정보 수정 api
export const putStoreInfo = async (
  storeId: string | null,
  info: postEnrollShopInfoProps
): Promise<postEnrollShopInfoResponse> => {
  const URL = `/api/stores/${storeId}`;

  const { data } = await api.put(
    URL,
    {
      storeName: info.storeName,
      address: info.address,
      phone: info.phone,
      businessNumber: info.businessNumber,
      businessName: info.businessName,
      businessStartDate: info.businessStartDate,
      keywordIdList: info.keywordIdList,
      categoryId: info.categoryId,
    },
    {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    }
  );

  return data;
};

//가게 업데이트시 메뉴 api
export const putMenuList = async (
  shopMenuList: postMenuListProps[],
  storeId: string | null
): Promise<postMenuListResponse> => {
  const list = shopMenuList.map((value) => {
    return {
      menuId: value.id,
      name: value.shopMenuName,
      price: Number(value.shopMenuPrice),
    };
  });
  console.log(list);
  const URL = `/api/stores/${storeId}/menus`;

  const { data } = await api.patch(
    URL,
    {
      menuUpdateList: list,
    },
    {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    }
  );
  return data;
};

//가게 업데이트시 사진 삭제 api
export const deleteImgList = async (
  imageIdList: deleteImgListProps[] | undefined,
  storeId: string | null
): Promise<postMenuListResponse> => {
  const URL = `/api/stores/${storeId}/images `;

  const { data } = await api.delete(URL, {
    headers: {
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
    data: {
      imageIdList: imageIdList,
    },
  });
  return data;
};

//가게 메뉴 삭제 api
export const deleteMenuListAPI = async (
  menuIdList: number[] | undefined,
  storeId: string | null
): Promise<deleteMenuListResponse> => {
  const URL = `/api/stores/${storeId}/menus`;

  const { data } = await api.delete(URL, {
    headers: {
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
    data: {
      menuIdList: menuIdList,
    },
  });
  return data;
};

//가게 재신청 api
export const patchReapplyStore = async (storeId: string | null) => {
  const URL = `/api/stores/${storeId}`;

  const { data } = await api.patch(
    URL,
    {},
    {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    }
  );
  return data;
};
