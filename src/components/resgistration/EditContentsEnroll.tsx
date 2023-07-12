import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ReactComponent as PhotoIcon } from "../../assets/photo-icon.svg";
import { ReactComponent as DeleteIcon } from "../../assets/delete-icon.svg";
import Swal from "sweetalert2";
import { IShopInputItem } from "../../apis/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteImgList,
  deleteMenuListAPI,
  getImg,
  getMenuList,
  getOpenHour,
  patchReapplyStore,
  postMenuList,
  postOpenHour,
  postStoreImg,
  putMenuList,
} from "../../apis/queries/storeQuery";
import { IShopMenuList } from "../../apis/api";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Day from "./Day";
import ShopTimePicker from "./ShopTimePicker";
import {
  getImgDataResponse,
  getMenuListDataResponse,
  getOpenHourResponse,
  postMenuListProps,
  postOpenHourProps,
} from "../../apis/types/store.type";
import { AxiosError } from "axios";

const EditContentsEnroll = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;

  const storeId = searchParams.get("storeId");

  const [newMenuList, setNewMenuList] = useState<getMenuListDataResponse[]>([]);
  const [newImgList, setNewImgList] = useState<getImgDataResponse[]>([]);

  //가게 메뉴 리스트 가져오기 query
  const { data: menuList } = useQuery(
    ["getMenuList"],
    () => getMenuList(Number(storeId)),
    {
      onSuccess: (res) => {
        setNewMenuList(res.data);
        setShopMenuList(
          res.data.map((value) => {
            return {
              id: value.menuId,
              shopMenuName: value.name,
              shopMenuPrice: String(value.price),
            };
          })
        );
      },
      onError: (err: AxiosError<any>) => {
        alert(err.response?.data.message || "알 수 없는 에러가 발생했습니다.");
      },
    }
  );
  const [imageIdList, setImageIdList] = useState<any[]>([]);
  //가게 사진 리스트 가져오기 query
  const { mutate: getImageList } = useMutation(() => getImg(storeId), {
    onSuccess: (res) => {
      setShopImages((v) => [...res.data.map((value) => value.url)]);
      setNewImgList(res.data);
      setImgList(res.data.map((value) => value.url));
    },
    onError: (err: AxiosError<any>) => {
      alert(err.response?.data.message || "알 수 없는 에러가 발생했습니다.");
    },
  });
  //가게의 영업시간 정보 가져오기
  const { mutate: getOpenHourList } = useMutation(
    () => getOpenHour(Number(storeId)),
    {
      onSuccess: (res: getOpenHourResponse) => {
        const data = res.data;
  
        const groupByHours = (): IShopInputItem[] => {
          const groupedHours: { [key: string]: IShopInputItem } = {};

          //나머지정보(starttime, endtime, isopen, hasbreaktime)를 key값으로 한다. 이 덕분에 key값 별로 데이터를 그루핑하는게 가능해진다
          const dayNames: { [key: string]: string } = {
            MONDAY: "월",
            TUESDAY: "화",
            WEDNESDAY: "수",
            THURSDAY: "목",
            FRIDAY: "금",
            SATURDAY: "토",
            SUNDAY: "일",
          };

          //businessHours은 api 응답객체를 의미
          data.forEach((hour: any, index: number) => {
            const {
              dayOfWeek,
              startTime,
              isOpen,
              endTime,
              hasBreakTime,
              breakStartTime,
              breakEndTime,
            } = hour;

            const key = `${startTime}-${isOpen.toString()}-${endTime}-${breakStartTime}-${breakEndTime}-${hasBreakTime.toString()}`;

            if (groupedHours[key]) {
              //groupedHours[key]가 true라는 말은 같은 영업시간, breaktime... 의 정보를 가진다는얘기.
              //같은 정보를 가지는 경우 하나로 묶어주어야한다. 이때 이미 존재하는 객체의 status를 true로 바꾸준다
              //push를 하게 되면 순서가뒤바뀌기 때문에 상태변경을 해주어야함
              groupedHours[key].week.forEach((weekday) => {
                if (weekday.dayOfWeek === dayOfWeek) {
                  weekday.status = true;
                }
              });
            } else {
              //groupedHours[key]가 false -> 다른 영업시간, breaktime... 의 정보를 가짐 -> 또다른 영업시간요소 추가 필요
              groupedHours[key] = {
                id: index,
                startTime: startTime,
                endTime: endTime,
                startBreakTime: breakStartTime,
                endBreakTime: breakEndTime,
                breakTimeCheckBox: hasBreakTime,
                //week를 추가로 넣어줄때는 월~일요일까지의 데이터를 미리 넣어두고 status를 변경하는 식으로 하였음
                week: Object.values(dayNames).map((weekDay) => ({
                  dayOfWeek: Object.keys(dayNames).find(
                    (key) => dayNames[key] === weekDay
                  ) as string,
                  day: weekDay,
                  status: weekDay === dayNames[dayOfWeek],
                })),
              };
            }
          });

          const inputItems: IShopInputItem[] = Object.values(groupedHours);

          return inputItems;
        };

        const groupedHourList = groupByHours();
        setInputItems(groupedHourList);

        //이미 선택된 요일을 저장
        const trueDays = groupedHourList.map((item: any) =>
          item.week.filter((day: any) => day.status === true)
        );
        trueDays.forEach((value) => {
          checkWeekList.push({
            day: value.map((value: any) => {
              return value.day;
            }),
          });
        });
      },
      onError: (err: AxiosError<any>) => {
        alert(err.response?.data.message || "알 수 없는 에러가 발생했습니다.");
      },
    }
  );
  //가게등록시 영업시간 등록 query
  const { mutate: updateOpenHour, isLoading: updateOpenHourLoding } =
    useMutation(() => postOpenHour(dayOfWeek && dayOfWeek, String(storeId)), {
      onError: (err: any) => {
        alert(err.response.data.message);
      },
    });
  //가게 사진 재등록 query
  const { mutate: saveImg, isLoading: updateImgLoding } = useMutation(
    () => postStoreImg(imgList, storeId),
    {
      onError: (err: AxiosError<any>) => {
        alert(err.response?.data.message || "알 수 없는 에러가 발생했습니다.");
      },
    }
  );
  //가게 사진 삭제 query
  const { mutate: deleteImg } = useMutation(
    () => deleteImgList(imageIdList, storeId),
    {
      onSuccess: (res) => {
        const hasMissing = hasMissingValues(
          newImgList.map((v: any) => v.url),
          shopImages
        );
        if (hasMissing) saveImg();
      },
      onError: (err: AxiosError<any>) => {
        alert(err.response?.data.message || "알 수 없는 에러가 발생했습니다.");
      },
    }
  );
  //가게 메뉴 리스트 업데이트
  const { mutate: updateMenuList, isLoading: updateMenuListLoding } =
    useMutation(
      (differentObjects: postMenuListProps[]) =>
        putMenuList(differentObjects, storeId),
      {
        onError: (err: AxiosError<any>) => {
          alert(
            err.response?.data.message || "알 수 없는 에러가 발생했습니다."
          );
        },
      }
    );
  //가게등록시 메뉴 등록 query
  const { mutate: saveMenuList, isLoading: saveMenuListLoding } = useMutation(
    (saveList: postMenuListProps[]) => postMenuList(saveList, String(storeId)),
    {
      onError: (err: any) => {
        alert(err.response.data.message);
      },
    }
  );
  //가게 메뉴 삭제 query
  const { mutate: deleteMenu } = useMutation(
    ["deleteMenu"],
    (list: number[]) => deleteMenuListAPI(list, storeId),
    {
      onError: (err: AxiosError<any>) => {
        alert(err.response?.data.message || "알 수 없는 에러가 발생했습니다.");
      },
    }
  );
  //가게 재신청 query
  const { mutate: reapplyStore } = useMutation(
    () => patchReapplyStore(storeId),
    {
      onSuccess: (res) => {
        navigate(-2);
      },
    }
  );

  useEffect(() => {
    if (updateOpenHourLoding) {
      navigate(-2);
    }
  }, [updateOpenHourLoding]);
  useEffect(() => {
    getOpenHourList();
    getImageList();
  }, []);

  //가게 메뉴
  const shopMenuID = useRef<number>(1);
  const [shopMenuList, setShopMenuList] = useState<IShopMenuList[]>([
    { id: 0, shopMenuName: "", shopMenuPrice: "" },
  ]);

  // 가게 이미지 업로드
  const [shopImages, setShopImages] = useState<string[]>([]);
  const inputPhotoFile = useRef<HTMLInputElement | null>(null);

  // 영업 시간
  const nextID = useRef<number>(1);
  const [breakTimeInputCheckBox, setBreakTimeInputCheckBox] = useState(false);
  const [tab, setTab] = useState([
    {
      id: 0,
      clickDay: "",
    },
  ]);
  const [inputItems, setInputItems] = useState<IShopInputItem[]>([
    {
      id: 0,
      startTime: "00:00",
      endTime: "00:00",
      startBreakTime: "00:00",
      endBreakTime: "00:00",
      breakTimeCheckBox: false,
      week: [
        { dayOfWeek: "MONDAY", day: "월", status: false },
        { dayOfWeek: "TUESDAY", day: "화", status: false },
        { dayOfWeek: "WEDNESDAY", day: "수", status: false },
        { dayOfWeek: "THURSDAY", day: "목", status: false },
        { dayOfWeek: "FRIDAY", day: "금", status: false },
        { dayOfWeek: "SATURDAY", day: "토", status: false },
        { dayOfWeek: "SUNDAY", day: "일", status: false },
      ],
    },
  ]);
  const [dayOfWeek, setDayOfWeek] = useState<postOpenHourProps[]>([]);
  type checkWeekListType = {
    day: string[];
  };
  const [checkWeekList, setCheckWeekList] = useState<Array<checkWeekListType>>(
    []
  );

  //onClick
  const onClickPhotoFile = () => {
    inputPhotoFile.current?.click();
  };
  const onClickDeltePohoto = (idx: number, url: string) => {
    const num = newImgList.map((v: any) => v.url).indexOf(url);
    Swal.fire({
      title: "이미지를 삭제하겠습니까?",
      showCancelButton: true,
      confirmButtonColor: "#2663FF",
      cancelButtonColor: "#FFB5B5",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        setShopImages([
          ...shopImages.slice(0, idx),
          ...shopImages.slice(idx + 1, shopImages.length),
        ]);
        setImgList([
          ...imgList.slice(0, idx),
          ...imgList.slice(idx + 1, shopImages.length),
        ]);
        if (newImgList.map((v: any) => v.url).includes(url)) {
          imageIdList.push(newImgList[num].imageId);
        }
        Swal.fire("삭제되었습니다!", "", "success");
      }
    });
  };
  const onClickBreakTimeCheckBox = () => {
    setBreakTimeInputCheckBox((prev) => !prev);
  };
  const onClickDay = (day: any, idx: number, index: number) => {
    let sameDay = true;
    
    for (let i = 0; i < checkWeekList.length; i++) {
      if (checkWeekList[i].day.includes(day.day)) {
        if (i !== index) {
          sameDay = false;
          break;
        } else {
          sameDay = true;
          break;
        }
      }
    }

    if (checkWeekList[index].day.includes(day.day)) {
      const newArray = checkWeekList[index].day.filter(
        (value) => value !== day.day
      );
      checkWeekList[index].day = newArray;
    } else {
      if (sameDay === true) {
        checkWeekList[index].day.push(day.day);
      }
    }

    if (day.status === false) {
      if (sameDay === false) {
        Swal.fire({
          text: "이미 선택한 요일입니다.",
        });
      } else {
        setTab([...tab]);
        day.status = true;
      }
    } else if (day.status === true) {
      setTab(tab.filter((item) => item.id !== idx));
      day.status = false;
    }
  };

  const [imgList, setImgList] = useState<any[]>([]);

  //onChange
  const onChangeShopImage = (e: React.ChangeEvent) => {
    const targetFiles = (e.target as HTMLInputElement).files as FileList;
    const targetFilesList = Array.from(targetFiles);
    const selectedFiles: string[] = targetFilesList.map((file) => {
      return URL.createObjectURL(file);
    });
    setShopImages((prev) => prev.concat(selectedFiles));
    setImgList((value: any) => [
      ...value,
      ((e.target as HTMLInputElement).files as FileList)[0],
    ]);
    inputPhotoFile.current?.click();
  };
  function addInputItem() {
    checkWeekList.push({ day: [] });
    const input = {
      id: nextID.current,
      startTime: "00:00",
      endTime: "00:00",
      startBreakTime: "00:00",
      endBreakTime: "00:00",
      breakTimeCheckBox: false,
      week: [
        { dayOfWeek: "MONDAY", day: "월", status: false },
        { dayOfWeek: "TUESDAY", day: "화", status: false },
        { dayOfWeek: "WEDNESDAY", day: "수", status: false },
        { dayOfWeek: "THURSDAY", day: "목", status: false },
        { dayOfWeek: "FRIDAY", day: "금", status: false },
        { dayOfWeek: "SATURDAY", day: "토", status: false },
        { dayOfWeek: "SUNDAY", day: "일", status: false },
      ],
    };
    setInputItems([...inputItems, input]);
    nextID.current += 1;
  }
  function deleteInputItem(itemId: number, index: number) {
    setCheckWeekList(checkWeekList.filter((v, i) => i !== index));
    setInputItems(inputItems.filter((item) => item.id !== itemId));
  }
  function onChangeStoreStartTimeInput(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    if (index > inputItems.length) return;

    const inputItemsCopy: IShopInputItem[] = JSON.parse(
      JSON.stringify(inputItems)
    );
    inputItemsCopy[index].startTime = e.target.value;
    setInputItems(inputItemsCopy);
  }
  function onChangeStoreEndTimeInput(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    if (index > inputItems.length) return;

    const inputItemsCopy: IShopInputItem[] = JSON.parse(
      JSON.stringify(inputItems)
    );
    inputItemsCopy[index].endTime = e.target.value;
    setInputItems(inputItemsCopy);
  }
  const onChangeBreakTimeCheckBox = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (index > inputItems.length) return;
    const inputItemsCopy: IShopInputItem[] = JSON.parse(
      JSON.stringify(inputItems)
    );
    inputItemsCopy[index].breakTimeCheckBox = e.target.checked;
    setInputItems(inputItemsCopy);
  };
  const onChangeStartBreakTimeValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (index > inputItems.length) return;
    const inputItemsCopy: IShopInputItem[] = JSON.parse(
      JSON.stringify(inputItems)
    );
    inputItemsCopy[index].startBreakTime = e.target.value;
    setInputItems(inputItemsCopy);
  };
  const onChangeEndBreakTimeValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (index > inputItems.length) return;
    const inputItemsCopy: IShopInputItem[] = JSON.parse(
      JSON.stringify(inputItems)
    );
    inputItemsCopy[index].endBreakTime = e.target.value;
    setInputItems(inputItemsCopy);
  };
  function onChangeShopMenuName(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    if (index > shopMenuList.length) return;
    const menuListCopy: IShopMenuList[] = JSON.parse(
      JSON.stringify(shopMenuList)
    );
    menuListCopy[index].shopMenuName = e.target.value;
    setShopMenuList(menuListCopy);
  }
  function onChangeShopMenuPrice(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    if (index > shopMenuList.length) return;
    const menuListCopy: IShopMenuList[] = JSON.parse(
      JSON.stringify(shopMenuList)
    );
    menuListCopy[index].shopMenuPrice = e.target.value;
    setShopMenuList(menuListCopy);
  }
  function addMenuItem() {
    const menu = {
      id: shopMenuID.current,
      shopMenuName: "",
      shopMenuPrice: "",
    };
    setShopMenuList([...shopMenuList, menu]);
    shopMenuID.current += 1;
  }
  function deleteMenuList(index: number) {
    setShopMenuList(shopMenuList.filter((item) => item.id !== index));
  }
  //shopImages와 newMenuList의 url 값이 같은지 아닌지 확인
  function compareArrays(arr1: any, arr2: any) {
    // 배열의 길이가 다르면 다른 배열임
    if (arr1.length !== arr2.length) {
      return false;
    }

    // 각 요소를 순회하면서 비교
    for (let i = 0; i < arr1.length; i++) {
      // 요소의 값과 순서가 다르면 다른 배열임
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }

    // 모든 요소가 일치하면 같은 배열임
    return true;
  }
  //shopImages에 newImgList에 없는 값이 있는지를 확인
  function hasMissingValues(arr1: any, arr2: any) {
    for (let i = 0; i < arr2.length; i++) {
      if (!arr1.includes(arr2[i])) {
        return true;
      }
    }

    return false;
  }
  //onSubmit
  const enrollBtnOnSubmit = () => {
    if (!(shopImages.length >= 1)) alert("사진을 1개 이상 등록해주세요");
    else if (!shopMenuList[0].shopMenuName || !shopMenuList[0].shopMenuPrice)
      alert("메뉴를 입력해주세요");
    else {
      const addDay: any = [];
      for (let i = 0; i < inputItems.length; i++) {
        for (let j = 0; j < 7; j++) {
          if (inputItems[i].week[j].status === true) {
            addDay.push({
              startTime: inputItems[i].startTime,
              endTime: inputItems[i].endTime,
              dayOfWeek: inputItems[i].week[j].dayOfWeek,
              isOpen: inputItems[i].week[j].status,
              hasBreakTime: inputItems[i].breakTimeCheckBox,
              breakStartTime: inputItems[i].breakTimeCheckBox
                ? inputItems[i].startBreakTime
                : null,
              breakEndTime: inputItems[i].breakTimeCheckBox
                ? inputItems[i].endBreakTime
                : null,
            });
            setDayOfWeek(addDay);
          }
        }
      }
      // updateMenuList();
      const array1 = newMenuList.map((value: any) => value.menuId);
      const array2 = shopMenuList.map((value) => value.id);
      const addMenuList: any = [];

      //새롭게 추가한 menu를 구하는 로직
      for (let i = 0; i < array2.length; i++) {
        const currentValue = array2[i];

        if (!array1.includes(currentValue)) {
          addMenuList.push(currentValue);
        }
      }
      if (shopMenuList.filter((v) => addMenuList.includes(v.id)).length >= 1)
        saveMenuList(shopMenuList.filter((v) => addMenuList.includes(v.id)));

      //삭제된 menu를 구하는 로직
      const deleteMenuIdList = [];
      for (let i = 0; i < array1.length; i++) {
        const currentValue = array1[i];

        if (!array2.includes(currentValue)) {
          deleteMenuIdList.push(currentValue);
        }
      }
      if (deleteMenuIdList.length >= 1) deleteMenu(deleteMenuIdList);

      //수정된 menu를 구하는 로직
      const differentObjects = [];

      for (let i = 0; i < newMenuList.length; i++) {
        const currentObj1 = newMenuList[i];

        for (let j = 0; j < shopMenuList.length; j++) {
          const currentObj2 = shopMenuList[j];

          if (currentObj1.menuId === currentObj2.id) {
            if (
              currentObj1.name !== currentObj2.shopMenuName ||
              currentObj1.price !== Number(currentObj2.shopMenuPrice)
            ) {
              differentObjects.push(currentObj2);
            }

            break;
          }
        }
      }
      if (differentObjects.length >= 1) updateMenuList(differentObjects);
      updateOpenHour();
      //이미 저장되어 있던 img만 있을 경우 함수 실행 제어
      const result = newImgList
        .map((v: any) => v.url)
        .every((item: any) => shopImages.some((image) => image === item));

      const areEqual = compareArrays(
        newImgList.map((v: any) => v.url),
        shopImages
      );

      if (!result) {
        deleteImg();
      } else if (!areEqual) {
        saveImg();
      }
    }
  };
  const reapplyBtnOnSubmit = () => {
    reapplyStore();
  };

  const adminBoolean = searchParams.get("role") === "admin";

  return (
    <>
      {/* 가게 사진 등록 */}
      <ShopWrapper style={{ marginTop: "5%" }}>
        <ShopInnerOutlineWrapper>
          <ShopInnerOutlineTitleWrapper>
            <ShopInnerOutlineBigTitle>
              가게 사진 <span>*</span>
            </ShopInnerOutlineBigTitle>
          </ShopInnerOutlineTitleWrapper>

          <ShopPhotoInputWrapper>
            {shopImages.map((url, idx) => (
              <React.Fragment key={url}>
                <PreViewImage
                  src={url}
                  alt={`image${idx}`}
                  onClick={() => onClickDeltePohoto(idx, url)}
                />
              </React.Fragment>
            ))}
            {!adminBoolean && (
              <ShopPhotoForm encType="multipart/form-data">
                <ShopInput
                  style={{ width: "204px", height: "100%" }}
                  ref={inputPhotoFile}
                  multiple
                  className="input-file"
                  type="file"
                  id="file"
                  accept="image/*,jpg/*"
                  onChange={onChangeShopImage}
                />
                <PhotoIcon
                  onClick={onClickPhotoFile}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    cursor: "pointer",
                  }}
                />
                <label onClick={onClickPhotoFile}>사진추가</label>
              </ShopPhotoForm>
            )}
          </ShopPhotoInputWrapper>
        </ShopInnerOutlineWrapper>
      </ShopWrapper>
      {/* 가게 영엉 시간 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column-reverse",
        }}
      >
        {inputItems.map((item, index) => (
          <ShopWrapper
            key={index}
            style={{
              marginTop: "5%",
            }}
          >
            <ShopInnerOutlineWrapper>
              <ShopInnerOutlineTitleWrapper>
                <ShopInfoDeleteWrapper>
                  {inputItems.length >= 1 &&
                    item.id !== 0 &&
                    location.pathname === "/editenrollshop/contents/" && (
                      <DeleteIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => deleteInputItem(item.id, index)}
                      />
                    )}
                </ShopInfoDeleteWrapper>
                <ShopInnerOutlineBigTitle>
                  영업시간 정보 <span>*</span>
                </ShopInnerOutlineBigTitle>
              </ShopInnerOutlineTitleWrapper>

              <ShopDayWrapper>
                <Day
                  adminBoolean={adminBoolean}
                  dayItem={item}
                  index={index}
                  onClickDay={onClickDay}
                ></Day>
              </ShopDayWrapper>
              <ShopInnerWrapper>
                <ShopTitle style={{ flex: 0.3, fontWeight: "500" }}>
                  영업 시간
                </ShopTitle>
                <ShopInputItemsWrapper>
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      marginBottom: "10px",
                    }}
                  >
                    <ShopTimePicker
                      onChangeStartTime={onChangeStoreStartTimeInput}
                      onChangeEndTime={onChangeStoreEndTimeInput}
                      index={index}
                      startTime={item.startTime}
                      endTime={item.endTime}
                      disabled={adminBoolean}
                    ></ShopTimePicker>
                  </div>
                </ShopInputItemsWrapper>
              </ShopInnerWrapper>

              <ShopInnerWrapper>
                <ShopTitle style={{ flex: 0.3, fontWeight: "500" }}>
                  휴식 시간
                </ShopTitle>
                <ShopInputItemsWrapper>
                  <div style={{ display: "flex" }}>
                    <ShopTimePicker
                      onChangeStartTime={onChangeStartBreakTimeValue}
                      onChangeEndTime={onChangeEndBreakTimeValue}
                      index={index}
                      startTime={item.startBreakTime}
                      endTime={item.endBreakTime}
                      disabled={!item.breakTimeCheckBox || adminBoolean}
                    />
                    <ShopCheckBoxWrapper>
                      <ShopInput
                        id={`checkbox-${index}`}
                        type="checkbox"
                        onClick={onClickBreakTimeCheckBox}
                        onChange={(e) => onChangeBreakTimeCheckBox(e, index)}
                      />
                      {item.breakTimeCheckBox ? (
                        <label htmlFor={`checkbox-${index}`}>✔</label>
                      ) : (
                        <label htmlFor={`checkbox-${index}`} />
                      )}
                    </ShopCheckBoxWrapper>
                  </div>
                </ShopInputItemsWrapper>
              </ShopInnerWrapper>

              <ShopTimeButtonWrapper>
                {!adminBoolean && index === inputItems.length - 1 ? (
                  <>
                    {inputItems.length <= 6 && (
                      <ShopTimeButton onClick={addInputItem}>
                        영업시간 추가
                      </ShopTimeButton>
                    )}
                  </>
                ) : null}
              </ShopTimeButtonWrapper>
            </ShopInnerOutlineWrapper>
          </ShopWrapper>
        ))}
      </div>
      {/* 메뉴 */}
      <ShopWrapper style={{ marginTop: "5%" }}>
        <ShopInnerOutlineWrapper>
          <ShopInnerOutlineTitleWrapper>
            <ShopInnerOutlineBigTitle>
              메뉴 <span>*</span>
            </ShopInnerOutlineBigTitle>
          </ShopInnerOutlineTitleWrapper>

          <ShopMenuContainer>
            {shopMenuList.map((item, index) => (
              <ShopMenuInnerWrapper key={index}>
                {shopMenuList.length >= 2 && (
                  <ShopDeleteButtonWrapper
                    onClick={() => deleteMenuList(item.id)}
                  >
                    {!adminBoolean && <DeleteIcon />}
                  </ShopDeleteButtonWrapper>
                )}

                <ShopMenuWrapper style={{ marginBottom: "5%" }}>
                  <ShopMenuSubTitleWrapper>
                    <ShopMenuSubTitle>메뉴명</ShopMenuSubTitle>
                  </ShopMenuSubTitleWrapper>
                  <ShopMenuInput
                    value={item.shopMenuName || ""}
                    onChange={(e) => onChangeShopMenuName(e, index)}
                    placeholder="입력해주세요"
                    disabled={adminBoolean}
                  />
                </ShopMenuWrapper>
                <ShopMenuWrapper>
                  <ShopMenuSubTitleWrapper>
                    <ShopMenuSubTitle>가격</ShopMenuSubTitle>
                  </ShopMenuSubTitleWrapper>
                  <ShopMenuInput
                    value={item.shopMenuPrice || ""}
                    onChange={(e) => onChangeShopMenuPrice(e, index)}
                    placeholder="입력해주세요"
                    disabled={adminBoolean}
                  />
                </ShopMenuWrapper>
              </ShopMenuInnerWrapper>
            ))}
            {!adminBoolean && (
              <div>
                <ShopAddMenuContainer>
                  <ShopAddMenuWrapper>
                    <ShopAddMenuBox onClick={addMenuItem}>
                      {/* <PlusIcon /> */}
                      <span>메뉴 추가하기</span>
                    </ShopAddMenuBox>
                  </ShopAddMenuWrapper>
                </ShopAddMenuContainer>
              </div>
            )}
          </ShopMenuContainer>
        </ShopInnerOutlineWrapper>
      </ShopWrapper>
      <EnrollButtonContainer>
        {!adminBoolean ? (
          searchParams.get("role") === "reapply" ? (
            <EnrollButton onClick={() => reapplyBtnOnSubmit()}>
              재신청
            </EnrollButton>
          ) : (
            <EnrollButton onClick={() => enrollBtnOnSubmit()}>
              수정하기
            </EnrollButton>
          )
        ) : (
          <EnrollButton onClick={() => navigate(-1)}>이전 페이지</EnrollButton>
        )}
      </EnrollButtonContainer>
    </>
  );
};

const ShopWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.subColor1};
`;
const ShopInnerWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 1% 0;
  .time-wave {
    font-size: 23px;
  }
  input[type="checkbox"] {
    display: none;
  }
  input[type="checkbox"] + label {
    display: flex;
    width: 30px;
    height: 30px;
    border: 1px solid ${({ theme }) => theme.colors.subColor1};
    position: relative;
    align-items: center;
    justify-content: center;
  }
  input[id="checkbox1"]:checked + label::after,
  [id="checkbox2"]:checked + label::after {
    content: "✔";
    font-size: 25px;
    width: 30px;
    height: 30px;
    text-align: center;
    position: absolute;
    color: #ff8181;
    left: 0;
    top: 0;
  }
`;
const ShopInnerOutlineWrapper = styled.div`
  padding: 2%;
`;
const ShopInnerOutlineTitleWrapper = styled.div`
  padding: 1% 0;
`;
const ShopInnerOutlineBigTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: bold;
  span {
    color: #ff4f4f;
    font-weight: bold;
    margin-left: -5px;
  }
`;

const ShopInput = styled.input`
  flex: 5;
  border: 1px solid ${({ theme }) => theme.colors.subColor1};
  outline: none;
  height: 34px;
  padding: 0 15px;
  &::placeholder {
    color: #999;
  }
`;

const ShopPhotoInputWrapper = styled.div`
  padding: 2% 1%;
  display: flex;
  gap: 5px;
  overflow: hidden;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    height: 8px;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) =>
      theme.colors.subColor1}; /*스크롤바의 색상*/
  }
  &::-webkit-scrollbar-track {
    background-color: transparent; /*스크롤바 트랙 색상*/
  }
`;
const PreViewImage = styled.img`
  width: 228px;
  height: 204px;
  cursor: pointer;
`;
const ShopPhotoForm = styled.form`
  width: 228px;
  height: 204px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  .input-file {
    width: 100%;
    height: 100%;
    background-color: #fcfcfc;
    font-size: 0;
    padding: 0;
    cursor: pointer;
  }
  input[type="file"]::file-selector-button {
    display: none;
  }
  label {
    position: absolute;
    top: 75%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    font-weight: bold;
  }
`;

const ShopDayWrapper = styled.div`
  padding: 2% 0;
`;
const ShopInputItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  flex: 1;
`;

const ShopTimeButtonWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
`;

const ShopInfoDeleteWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;
const ShopTitle = styled.span`
  flex: 1;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: bold;
`;

const ShopCheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8%;
  label {
    color: #ff8181;
    font-size: 20px;
  }
`;

const ShopMenuContainer = styled.div`
  padding: 10px;
  display: flex;
  gap: 5px;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    height: 8px;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) =>
      theme.colors.subColor1}; /*스크롤바의 색상*/
  }
  &::-webkit-scrollbar-track {
    background-color: transparent; /*스크롤바 트랙 색상*/
  }
`;
const ShopMenuInnerWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.subColor1};
  padding: 3% 7% 3% 2%;
  border-radius: 20px;
  position: relative;
`;
const ShopMenuWrapper = styled.div`
  width: 260px;
  display: flex;
  align-items: center;
`;
const ShopMenuSubTitleWrapper = styled.div`
  width: 100%;
`;
const ShopMenuSubTitle = styled.span``;
const ShopMenuInput = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.subColor1};
  outline: none;
  height: 34px;
  padding: 0 15px;
  &::placeholder {
    color: #999;
  }
`;

const ShopDeleteButtonWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer;
`;

const ShopAddMenuContainer = styled.div`
  width: 260px;
  height: 100%;
`;
const ShopAddMenuWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ShopAddMenuBox = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.colors.subColor1};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  span {
    margin-top: 20px;
    font-weight: bold;
  }
`;

const EnrollButtonContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10% 0;
`;
const EnrollButton = styled.button`
  width: 20%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.subColor2};
  border: ${({ theme }) => theme.colors.subColor2};
  border-radius: 2px;
  padding: 10px;
  color: white;
  cursor: pointer;
`;
const ShopTimeButton = styled.button`
  padding: 2% 5%;
  border-radius: 9999px;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.subColor1};
  cursor: pointer;
`;
export default EditContentsEnroll;
