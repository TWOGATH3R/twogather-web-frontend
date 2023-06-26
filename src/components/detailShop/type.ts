export type openHourType = {
  breakEndTime: string;
  breakStartTime: string;
  businessHourId: number;
  dayOfWeek: string;
  endTime: string;
  hasBreakTime: boolean;
  isOpen: boolean;
  startTime: string;
  storeId: number;
};

export type menuListStateType = {
  menuId: number;
  name: string;
  price: number;
};

export type imgListType = {
  imageId: number;
  url: string;
}