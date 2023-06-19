import { api } from '../untils';
import { getCookie } from '../../components/cookie/cookie';
import { GetMyStoreListProps, GetMyStoreListResponse } from './type';

export const postEnrollShopInfo = async (storeInfo: any) => {
  const res = await api.post(
    `/api/stores/categories/1 `,
    {
      storeRequest: {
        storeName: '김가네',
        address: '전주시',
        phone: '010-1234-1234',
        businessNumber: '1231212312',
        businessName: '홍길동',
        businessStartDate: '2023-06-01',
      },
      keywordList: ['분위기좋은', '사진찍기좋은', '저렴한'],
      businessHourRequest: {
        businessHourList: [
          {
            startTime: '11:30',
            endTime: '20:00',
            dayOfWeek: 'MONDAY',
            isOpen: true,
            hasBreakTime: false,
            breakStartTime: null,
            breakEndTime: null,
          },
        ],
      },
      menuRequest: {
        menuSaveList: [
          {
            name: '감자',
            price: 1000,
          },
        ],
      },
      storeImageList: storeInfo.shopImages,
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        accept: 'application/json,',
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    },
  );
  return res.data;
};

export const getEnrollShopCategory = async () => {
  const res = await api.get(`/api/categories`, {
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json,',
      Authorization: `Bearer ${getCookie('accessToken')}`,
    },
  });
  return res.data;
};

export const postEnrollShopImageList = async (storeInfo: any) => {
  const res = await api.post(`/api/stores/1/images `, {
    imageId: '1',
    url: '',
  });
  return res.data;
};

export const getMyStoreList = async ({
  ownerId,
  page = 1,
  size = 1,
  sort = { type: 'MOST_REVIEWD', order: 'desc' },
}: GetMyStoreListProps): Promise<GetMyStoreListResponse> => {
  //todo 임시로 reviewCounts 추후 변경할 것
  const URL = `api/my/stores/?ownerId=${ownerId}&page=${page}&size=${size}&sort=${'reviewsCount'},${
    sort?.order
  }`;
  const { data } = await api.get(URL, {
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json,',
      Authorization: `Bearer ${getCookie('accessToken')}`,
    },
  });

  console.log(data);
  return data;
};
