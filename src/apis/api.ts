// 타입지정 예시
export type IShopAddressVisible = {
  visible: Boolean;
};
export type IShopInputItem = {
  id: number;
  startTime: string;
  endTime: string;
  startBreakTime: string;
  endBreakTime: string;
  breakTimeCheckBox: boolean;
  week: IShopDay[];
};

export type IShopDay = {
  day: string;
  status: boolean;
};
export type IShopMenuList = {
  id: number;
  shopMenuName: string;
  shopMenuPrice: string;
};
