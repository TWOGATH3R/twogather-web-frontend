import React, { useRef, useState } from "react";
import styled, { css } from "styled-components";
import { ReactComponent as PhotoIcon } from "../assets/photo-icon.svg";
import { ReactComponent as PlusIcon } from "../assets/plus-icon.svg";
import { ReactComponent as DeleteIcon } from "../assets/delete-icon.svg";
import { ReactComponent as RightArrow } from "../assets/right-arrow.svg";
import AddressModal from "../components/address/AddressModal";
import { useRecoilState, useRecoilValue } from "recoil";
import { address, visibleAddress } from "../store/addressAtom";
import { IShopAddressVisible } from "../apis/api";
import { IShopInputItem } from "../apis/api";
import { IShopMenuList } from "../apis/api";
import Swal from "sweetalert2";

export default function EnrollShop() {
  const [shopName, setShopName] = useState<string>("");
  const ShopAddress = useRecoilValue(address);
  const [visibleShopAddress, setVisibleShopAddress] =
    useRecoilState(visibleAddress);
  const [shopNumber, setShopNumber] = useState<string>("");
  const [shopCategory, setShopCategory] = useState<string>("");

  const [visibleCategory, setVisibleCategory] = useState(false);
  const [categoryValue, setCategoryValue] = useState("");
  const CATEGORY = [
    {
      categoryId: 1,
      name: "양식",
    },
    {
      categoryId: 2,
      name: "일식",
    },
    {
      categoryId: 3,
      name: "중식",
    },
    {
      categoryId: 4,
      name: "카페",
    },
    {
      categoryId: 5,
      name: "한식",
    },
    {
      categoryId: 6,
      name: "패스트푸드",
    },
    {
      categoryId: 7,
      name: "분식",
    },
    {
      categoryId: 8,
      name: "기타",
    },
  ];
  const [shopNameMessage, setShopNameMessage] = useState("");
  const [shopNumberMessage, setShopNumberMessage] = useState("");
  const [shopCategoryMessage, setShopCategoryMessage] = useState("");

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
        { day: "월", status: false },
        { day: "화", status: false },
        { day: "수", status: false },
        { day: "목", status: false },
        { day: "금", status: false },
        { day: "토", status: false },
        { day: "일", status: false },
      ],
    },
  ]);
  const shopMenuID = useRef<number>(1);
  const [shopMenuList, setShopMenuList] = useState<IShopMenuList[]>([
    { id: 0, shopMenuName: "", shopMenuPrice: "" },
  ]);

  // onClick
  const onClickPhotoFile = () => {
    inputPhotoFile.current?.click();
  };

  const onClickDeltePohoto = (idx: number) => {
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
        Swal.fire("삭제되었습니다!", "", "success");
      }
    });
  };

  const onClickShopAddress = () => {
    setVisibleShopAddress(true);
  };

  const onClickVisibleCategory = () => {
    setVisibleCategory((prev) => !prev);
  };
  const onClickCategory = (item: string) => {
    setCategoryValue(item);
    setVisibleCategory(false);
  };

  const onClickBreakTimeCheckBox = () => {
    setBreakTimeInputCheckBox((prev) => !prev);
    console.log(checkWeekList);
  };

  type checkWeekListType = {
    day: string[];
  };
  const [checkWeekList, setCheckWeekList] = useState<Array<checkWeekListType>>([
    { day: [] },
  ]);
  const onClickDay = (day: any, idx: number, index: number) => {
    let 상황 = "";
    for (let i = 0; i < checkWeekList.length; i++) {
      if (checkWeekList[i].day.includes(day.day)) {
        if (i !== index) {
          console.log("다른 라인에 이미 있네");
          상황 = "다른 라인에 이미 있네";
          break;
        } else {
          console.log("같은 라인에 있네");
          상황 = "같은 라인에 있네";
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
      if (상황 !== "다른 라인에 이미 있네") {
        checkWeekList[index].day.push(day.day);
      }
    }

    if (day.status === false) {
      if (상황 === "다른 라인에 이미 있네") {
        Swal.fire({
          text: "이미 입력한 요일입니다.",
        });
      } else {
        setTab([...tab]);
        day.status = true;
      }
    } else if (day.status === true) {
      setTab(tab.filter((item) => item.id !== idx));
      day.status = false;
    }

    // if (!checkWeekList.includes(day.day, 0)) {
    //   setCheckWeekList((data) => [...data, day.day]);
    //   if (day.status === false) {
    //     setTab([...tab]);
    //     day.status = true;
    //   } else {
    //     setTab(tab.filter((item) => item.id !== idx));
    //     day.status = false;
    //   }
    // } else {
    //   checkWeekList.filter((v, i) => day.day !== v);
    //   Swal.fire({
    //     text: "이미 입력한 요일입니다.",
    //   });
    // }
    // if (day.day === "월") {
    //   if (day.status === false) {
    //     setTab([...tab]);
    //     day.status = true;
    //   } else {
    //     setTab(tab.filter((item) => item.id !== idx));
    //     day.status = false;
    //   }
    // }
    // if (day.day === "화") {
    //   if (day.status === false) {
    //     setTab([...tab]);
    //     day.status = true;
    //   } else {
    //     setTab(tab.filter((item) => item.id !== idx));
    //     day.status = false;
    //   }
    // }
    // if (day.day === "수") {
    //   if (day.status === false) {
    //     setTab([...tab]);
    //     day.status = true;
    //   } else {
    //     setTab(tab.filter((item) => item.id !== idx));
    //     day.status = false;
    //   }
    // }
    // if (day.day === "목") {
    //   if (day.status === false) {
    //     setTab([...tab]);
    //     day.status = true;
    //   } else {
    //     setTab(tab.filter((item) => item.id !== idx));
    //     day.status = false;
    //   }
    // }
    // if (day.day === "금") {
    //   if (day.status === false) {
    //     setTab([...tab]);
    //     day.status = true;
    //   } else {
    //     setTab(tab.filter((item) => item.id !== idx));
    //     day.status = false;
    //   }
    // }
    // if (day.day === "토") {
    //   if (day.status === false) {
    //     setTab([...tab]);
    //     day.status = true;
    //   } else {
    //     setTab(tab.filter((item) => item.id !== idx));
    //     day.status = false;
    //   }
    // }
    // if (day.day === "일") {
    //   if (day.status === false) {
    //     setTab([...tab]);
    //     day.status = true;
    //   } else {
    //     setTab(tab.filter((item) => item.id !== idx));
    //     day.status = false;
    //   }
    // }
    console.log(inputItems);
  };

  // onChange
  const onChangeShopName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regShopName = /^[가-힣a-zA-Z0-9\s]+$/;
    const shopNameCurrent = e.target.value;
    setShopName(e.target.value);

    if (!regShopName.test(shopNameCurrent)) {
      setShopNameMessage("가게명이 옳바르지 않습니다.");
      return;
    } else {
      setShopName("");
    }
  };

  const onChangeShopNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regShopNumber = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/;
    const shopNumberCurrent = e.target.value;
    setShopNumber(e.target.value);

    if (!regShopNumber.test(shopNumberCurrent)) {
      setShopNumberMessage("번호가 옳바르지 않습니다. (- 포함시켜 주세요.)");
      return;
    } else {
      setShopNumberMessage("");
    }
  };

  const onChangeShopCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const shopCategoryCurrent = e.target.value;
    setShopCategory(e.target.value);
    if (shopCategory.length >= 0) {
      setShopCategoryMessage("카테고리를 선택해주세요.");
    } else {
      setShopCategory("");
    }
  };

  const onChangeShopImage = (e: React.ChangeEvent) => {
    const targetFiles = (e.target as HTMLInputElement).files as FileList;
    const targetFilesList = Array.from(targetFiles);
    const selectedFiles: string[] = targetFilesList.map((file) => {
      return URL.createObjectURL(file);
    });
    setShopImages((prev) => prev.concat(selectedFiles));
    inputPhotoFile.current?.click();
  };

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
        { day: "월", status: false },
        { day: "화", status: false },
        { day: "수", status: false },
        { day: "목", status: false },
        { day: "금", status: false },
        { day: "토", status: false },
        { day: "일", status: false },
      ],
    };
    setInputItems([...inputItems, input]);
    nextID.current += 1;
  }
  function deleteInputItem(index: number) {
    setInputItems(inputItems.filter((item) => item.id !== index));
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
  return (
    <EnrollShopContainer>
      <Overlay visible={visibleShopAddress} />
      <EnrollShopWrapper>
        <EnrollShopTitleWrapper>
          <EnrollShopTitle>가게 등록하기</EnrollShopTitle>
        </EnrollShopTitleWrapper>

        <ShopWrapper>
          <ShopInnerOutlineWrapper>
            <ShopInnerOutlineTitleWrapper>
              <ShopInnerOutlineBigTitle>
                가게 정보 <span>*</span>
              </ShopInnerOutlineBigTitle>
            </ShopInnerOutlineTitleWrapper>

            {/* 가게명 */}
            {shopName.length > 0 ? (
              <ShopInnerWrapper>
                <ShopTitle>가게명</ShopTitle>
                <InputMessageWrapper>
                  <ShopInput
                    placeholder="입력해주세요"
                    onChange={onChangeShopName}
                  />
                  <InputMessage>{shopNameMessage}</InputMessage>
                </InputMessageWrapper>
              </ShopInnerWrapper>
            ) : (
              <ShopInnerWrapper>
                <ShopTitle>가게명</ShopTitle>
                <InputMessageWrapper>
                  <ShopInput
                    placeholder="입력해주세요"
                    onChange={onChangeShopName}
                  />
                  <InputMessage />
                </InputMessageWrapper>
              </ShopInnerWrapper>
            )}

            {/* 가게 주소 */}
            <ShopInnerWrapper>
              <ShopTitle>가게 주소</ShopTitle>
              <InputMessageWrapper>
                <ShopInput
                  placeholder="기본주소"
                  defaultValue={ShopAddress}
                  onClick={onClickShopAddress}
                />
                <InputMessage />
              </InputMessageWrapper>
              {visibleShopAddress ? <AddressModal /> : null}
            </ShopInnerWrapper>

            {/* 가게 전화번호 */}
            {shopNumber.length > 0 ? (
              <ShopInnerWrapper>
                <ShopTitle>가게 전화번호</ShopTitle>
                <InputMessageWrapper>
                  <ShopInput
                    type="tel"
                    placeholder="입력해주세요"
                    onChange={onChangeShopNumber}
                  />
                  <InputMessage>{shopNumberMessage}</InputMessage>
                </InputMessageWrapper>
              </ShopInnerWrapper>
            ) : (
              <ShopInnerWrapper>
                <ShopTitle>가게 전화번호</ShopTitle>
                <InputMessageWrapper>
                  <ShopInput
                    type="tel"
                    placeholder="입력해주세요"
                    onChange={onChangeShopNumber}
                  />
                  <InputMessage />
                </InputMessageWrapper>
              </ShopInnerWrapper>
            )}
            {shopCategory.length > 0 ? (
              <ShopInnerWrapper>
                <ShopTitle>카테고리</ShopTitle>
                <InputMessageWrapper>
                  <ShopInput
                    type="category"
                    placeholder="선택해주세요"
                    onChange={onChangeShopCategory}
                  />
                  <InputMessage>{shopCategoryMessage}</InputMessage>
                  <ShopTitle>전체 카테고리</ShopTitle>
                </InputMessageWrapper>
              </ShopInnerWrapper>
            ) : (
              <>
                <ShopInnerWrapper>
                  <ShopTitle>카테고리</ShopTitle>
                  <InputMessageWrapper>
                    <ShopInput
                      style={{ cursor: "pointer" }}
                      placeholder="카테고리를 정해주세요."
                      onChange={onChangeShopCategory}
                      value={categoryValue}
                      onClick={() => onClickVisibleCategory()}
                    />
                    <InputMessage />
                  </InputMessageWrapper>
                </ShopInnerWrapper>
                {visibleCategory === true ? (
                  <>
                    <CategoryWrapper>
                      {CATEGORY.map((item) => (
                        <CategoryList>
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={() => onClickCategory(item.name)}
                          >
                            {item.name}
                          </span>
                          <RightArrow />
                        </CategoryList>
                      ))}
                    </CategoryWrapper>
                  </>
                ) : null}
              </>
            )}
          </ShopInnerOutlineWrapper>
        </ShopWrapper>

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
                    onClick={() => onClickDeltePohoto(idx)}
                  />
                </React.Fragment>
              ))}
              <ShopPhotoForm>
                <ShopInput
                  style={{ width: "204px", height: "100%" }}
                  ref={inputPhotoFile}
                  multiple
                  className="input-file"
                  type="file"
                  id="file"
                  accept="image/*"
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
                    {inputItems.length >= 1 && item.id !== 0 && (
                      <DeleteIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => deleteInputItem(item.id)}
                      />
                    )}
                  </ShopInfoDeleteWrapper>
                  <ShopInnerOutlineBigTitle>
                    영업시간 정보 <span>*</span>
                  </ShopInnerOutlineBigTitle>
                </ShopInnerOutlineTitleWrapper>

                <ShopDayWrapper>
                  <ShopDayUl>
                    {item.week.map((day, idx) => (
                      <React.Fragment key={idx}>
                        {day.status === true ? (
                          <ShopDayList
                            style={{ backgroundColor: "#FFB5B5" }}
                            onClick={() => onClickDay(day, idx, index)}
                          >
                            {day.day}
                          </ShopDayList>
                        ) : (
                          <ShopDayList
                            onClick={() => onClickDay(day, idx, index)}
                          >
                            {day.day}
                          </ShopDayList>
                        )}
                      </React.Fragment>
                    ))}
                  </ShopDayUl>
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
                      <ShopInputItmsBox key={index}>
                        <ShopTimeInput
                          style={{ width: "100%" }}
                          type="time"
                          value={item.startTime || ""}
                          onChange={(e) =>
                            onChangeStoreStartTimeInput(e, index)
                          }
                        />
                        <span className="time-wave">~</span>
                        <ShopTimeInput
                          style={{ width: "100%" }}
                          type="time"
                          value={item.endTime || ""}
                          onChange={(e) => onChangeStoreEndTimeInput(e, index)}
                        />
                      </ShopInputItmsBox>
                    </div>
                  </ShopInputItemsWrapper>
                </ShopInnerWrapper>

                <ShopInnerWrapper>
                  <ShopTitle style={{ flex: 0.3, fontWeight: "500" }}>
                    휴식 시간
                  </ShopTitle>
                  <ShopInputItemsWrapper>
                    <div style={{ display: "flex" }}>
                      {item.breakTimeCheckBox ? (
                        <ShopInputItmsBox>
                          <ShopTimeInput
                            style={{ width: "100%" }}
                            type="time"
                            defaultValue={item.startBreakTime || ""}
                            onChange={(e) =>
                              onChangeStartBreakTimeValue(e, index)
                            }
                          />
                          <span className="time-wave">~</span>
                          <ShopTimeInput
                            style={{ width: "100%" }}
                            defaultValue={item.endBreakTime || ""}
                            onChange={(e) =>
                              onChangeEndBreakTimeValue(e, index)
                            }
                            type="time"
                          />
                        </ShopInputItmsBox>
                      ) : (
                        <ShopInputItmsBox>
                          <ShopTimeInput
                            style={{ width: "100%" }}
                            disabled
                            type="time"
                            defaultValue={"00:00"}
                          />
                          <span className="time-wave">~</span>
                          <ShopTimeInput
                            style={{ width: "100%" }}
                            disabled
                            type="time"
                            defaultValue={"00:00"}
                          />
                        </ShopInputItmsBox>
                      )}
                      <ShopCheckBoxWrapper>
                        <ShopInput
                          id={`checkbox-${index}`}
                          type="checkbox"
                          onClick={onClickBreakTimeCheckBox}
                          onChange={(e) => onChangeBreakTimeCheckBox(e, index)}
                        />
                        {item.breakTimeCheckBox === true ? (
                          <label htmlFor={`checkbox-${index}`}>✔</label>
                        ) : (
                          <label htmlFor={`checkbox-${index}`} />
                        )}
                      </ShopCheckBoxWrapper>
                    </div>
                  </ShopInputItemsWrapper>
                </ShopInnerWrapper>

                <ShopTimeButtonWrapper>
                  {item.id === 0 && (
                    <>
                      {inputItems.length <= 6 && (
                        <ShopTimeButton onClick={addInputItem}>
                          영업시간 추가
                        </ShopTimeButton>
                      )}
                    </>
                  )}
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
                      <DeleteIcon />
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
                    />
                  </ShopMenuWrapper>
                </ShopMenuInnerWrapper>
              ))}

              <div>
                <ShopAddMenuContainer>
                  <ShopAddMenuWrapper>
                    <ShopAssMenuBox onClick={addMenuItem}>
                      <PlusIcon />
                      <span>메뉴 추가하기</span>
                    </ShopAssMenuBox>
                  </ShopAddMenuWrapper>
                </ShopAddMenuContainer>
              </div>
            </ShopMenuContainer>
          </ShopInnerOutlineWrapper>
        </ShopWrapper>
      </EnrollShopWrapper>
      <EnrollButtonContainer>
        <EnrollButton>등록하기</EnrollButton>
      </EnrollButtonContainer>
    </EnrollShopContainer>
  );
}
const EnrollShopContainer = styled.div`
  padding: 2% 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;
const Overlay = styled.div<IShopAddressVisible>`
  width: 100%;
  height: 100%;
  position: absolute;
  ${(props) =>
    props.visible === true
      ? css`
          background-color: rgba(0, 0, 0, 0.9);
          z-index: 4;
        `
      : css`
          z-index: -1;
        `};
`;
const EnrollShopWrapper = styled.div`
  width: 100%;
`;
const EnrollShopTitleWrapper = styled.div`
  padding: 2% 0;
`;
const EnrollShopTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  font-weight: bold;
`;

const ShopWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.subColor1};
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
const InputMessageWrapper = styled.div`
  flex: 5;
  height: 65px;
  display: flex;
  flex-direction: column;
`;
const InputMessage = styled.span`
  margin-left: 15px;
  margin-top: 5px;
  height: 20px;
  color: ${({ theme }) => theme.colors.subColor3};
  font-size: ${({ theme }) => theme.fontSizes.small};
`;
const CategoryWrapper = styled.div`
  width: 50%;
  margin-left: 17%;
  padding: 1% 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid ${({ theme }) => theme.colors.subColor1};
`;
const CategoryList = styled.div`
  padding: 2% 15%;
  display: flex;
  justify-content: space-between;
  background-color: white;
  border-left: 1px solid ${({ theme }) => theme.colors.subColor1};
`;
const ShopTitle = styled.span`
  flex: 1;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: bold;
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
const ShopPhotoForm = styled.div`
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
const ShopDayUl = styled.ul`
  width: 40%;
  display: flex;
  align-items: center;
  .active {
    background-color: #505bf0;
    color: #fff;
  }
`;
const ShopDayList = styled.li`
  list-style: none;
  border: 1px solid ${({ theme }) => theme.colors.subColor1};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  border-radius: 9999px;
  padding: 10px 12px;
  font-weight: bold;
  margin-right: 4%;
  cursor: pointer;
`;
const ShopInputItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  flex: 1;
`;
const ShopInputItmsBox = styled.div`
  display: flex;
  align-items: center;
`;
const ShopTimeInput = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.subColor1};
  outline: none;
  height: 34px;
  padding: 0 15px;
  width: 15%;
  &::placeholder {
    color: #999;
  }
`;
const ShopTimeButtonWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
`;
const ShopTimeButton = styled.button`
  padding: 2% 5%;
  border-radius: 9999px;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.subColor1};
  cursor: pointer;
`;
const ShopInfoDeleteWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
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
const ShopAssMenuBox = styled.div`
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
`;
