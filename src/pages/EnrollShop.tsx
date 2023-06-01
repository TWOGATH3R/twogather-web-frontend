import React, { useCallback, useRef, useState } from "react";
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
import { postEnrollShopInfo } from "../apis/queries/storeQuery";
import { useMutation } from "react-query";

export default function EnrollShop() {
  const [shopName, setShopName] = useState<string>("");
  const shopAddress = useRecoilValue(address);
  const [visibleShopAddress, setVisibleShopAddress] =
    useRecoilState(visibleAddress);
  const [shopNumber, setShopNumber] = useState<string>("");
  const [shopCategory, setShopCategory] = useState<string>("");

  const [visibleCategory, setVisibleCategory] = useState<boolean>(false);
  const [categoryValue, setCategoryValue] = useState<string>("");
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

  const KEYWORD = [
    { name: "분위기 좋은" },
    { name: "저렴한 가격" },
    { name: "아이들과 오기 좋은" },
    { name: "사진찍기 좋은" },
    { name: "친절한" },
    { name: "고급스러운" },
    { name: "조용한" },
    { name: "모임하기 좋은" },
    { name: "특별한 날" },
    { name: "단체 회식" },
    { name: "데이트하기 좋은" },
    { name: "뷰가 좋은" },
    { name: "특별한 메뉴" },
    { name: "멋진 인테리어" },
    { name: "디저트가 맛있는" },
    { name: "청결한 매장" },
    { name: "방송에 나온 맛집" },
  ];
  const [shopNameMessage, setShopNameMessage] = useState<string>("");
  const [shopNumberMessage, setShopNumberMessage] = useState<string>("");
  const [shopCategoryMessage, setShopCategoryMessage] = useState<string>("");
  const [visibleKeyword, setVisibleKeyword] = useState<boolean>(false);
  const [keywordList, setKeywordList] = useState<Array<string>>([]);

  // 사업자정보
  const [businessName, setBusinessName] = useState("");
  const [businessNumber, setBusinessNumber] = useState("");
  const [startBusiness, setStartBusiness] = useState("");

  const [businessNameMessage, setBusinessNameMessage] = useState("");
  const [businessNumberMessage, setBusinessNumberMessage] = useState("");
  const [startBusinessMessage, setStartBusinessMessage] = useState("");

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

  const storeInfo = {
    shopName,
    shopAddress,
    shopNumber,
    businessName,
    businessNumber,
    startBusiness,
  };

  console.log(storeInfo);

  // Query
  const { mutate: shopInfo } = useMutation(
    () => postEnrollShopInfo(storeInfo),
    {
      onSuccess: (res) => {
        console.log(res);
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

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

  const onClickVisibleKeyword = () => {
    setVisibleKeyword((prev) => !prev);
    setKeywordList([]);
  };

  const onClickBreakTimeCheckBox = () => {
    setBreakTimeInputCheckBox((prev) => !prev);
  };

  type checkWeekListType = {
    day: string[];
  };
  const [checkWeekList, setCheckWeekList] = useState<Array<checkWeekListType>>([
    { day: [] },
  ]);
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

  const onClickSubmit = () => {
    shopInfo();
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
      setShopNameMessage("");
    }
  };
  console.log(shopName);
  const onChangeShopNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regShopNumber = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/;
    const shopNumberCurrent = e.target.value;
    setShopNumber(e.target.value);

    if (!regShopNumber.test(shopNumberCurrent)) {
      setShopNumberMessage("번호가 옳바르지 않습니다 (- 포함시켜 주세요.)");
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

  const onChangeKeyword = useCallback(
    (checked: boolean, item: string) => {
      console.log(checked);
      if (keywordList.length >= 2) {
        setVisibleKeyword(false);
      }
      if (checked) {
        setKeywordList((prev) => [...prev, item]);
      } else if (!checked) {
        setKeywordList(keywordList.filter((el) => el !== item));
      }
    },
    [keywordList]
  );

  const onChangeBusinessName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regBusinessName = /^[가-힣a-zA-Z0-9\s]+$/;
    const businessNameCurrent = e.target.value;
    setBusinessName(e.target.value);

    if (!regBusinessName.test(businessNameCurrent)) {
      setBusinessNameMessage("사업자명이 옳바르지 않습니다.");
      return;
    } else {
      setBusinessNameMessage("");
    }
  };
  const onChangeBusinessNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regBusinessNumber = /^[0-9]{3}-[0-9]{2}-[0-9]{5}/;
    const businessNumberCurrent = e.target.value;
    setBusinessNumber(e.target.value);

    if (!regBusinessNumber.test(businessNumberCurrent)) {
      setBusinessNumberMessage(
        "사업자번호가 옳바르지 않습니다 (- 포함시켜 주세요.)"
      );
      return;
    } else {
      setBusinessNumberMessage("");
    }
  };
  const onChangeStartBusiness = (e: React.ChangeEvent<HTMLInputElement>) => {
    const startBusinessCurrent = e.target.value;
    setStartBusiness(e.target.value);

    if (startBusinessCurrent.length >= 0) {
      setStartBusinessMessage("선택해주세요.");
      return;
    } else {
      setStartBusinessMessage("");
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
    setCheckWeekList(checkWeekList.filter((v, i) => i !== index));
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
                    value={shopName}
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
                  value={shopAddress}
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

            <ShopInnerWrapper>
              <ShopTitle>카테고리</ShopTitle>
              <InputMessageWrapper
                style={{ height: visibleCategory !== true ? "65px" : "40px" }}
              >
                <ShopInput
                  style={{ cursor: "pointer" }}
                  placeholder="카테고리를 정해주세요."
                  onChange={onChangeShopCategory}
                  value={categoryValue}
                  onClick={() => onClickVisibleCategory()}
                />
                {visibleCategory !== true && <InputMessage />}
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

            <ShopInnerWrapper>
              <ShopTitle>가게 대표 키워드</ShopTitle>
              <InputMessageWrapper
                style={{ height: visibleKeyword !== true ? "40px" : "40px" }}
              >
                <ShopInput
                  style={{ cursor: "pointer" }}
                  placeholder="선택해주세요 (최대 3개까지 가능합니다.)"
                  onClick={() => onClickVisibleKeyword()}
                  value={keywordList}
                />
              </InputMessageWrapper>
            </ShopInnerWrapper>

            {visibleKeyword === true && (
              <ShopKeywordWrapper>
                {KEYWORD.map((item) => (
                  <>
                    <ShopKeywordList>
                      <ShopKeywordLabelWrapper>
                        <ShopKeywordLabel htmlFor={item.name}>
                          {item.name}
                        </ShopKeywordLabel>
                      </ShopKeywordLabelWrapper>
                      <ShopKeywordCheckBox
                        type="checkbox"
                        id={item.name}
                        onChange={(e) => {
                          onChangeKeyword(e.target.checked, e.target.id);
                        }}
                      />
                    </ShopKeywordList>
                  </>
                ))}
              </ShopKeywordWrapper>
            )}
          </ShopInnerOutlineWrapper>
        </ShopWrapper>

        <ShopWrapper style={{ marginTop: "5%" }}>
          <ShopInnerOutlineWrapper>
            <ShopInnerOutlineTitleWrapper>
              <ShopInnerOutlineBigTitle>
                사업자정보 <span>*</span>
              </ShopInnerOutlineBigTitle>
            </ShopInnerOutlineTitleWrapper>

            {businessName.length > 0 ? (
              <ShopInnerWrapper>
                <ShopTitle>사업자명</ShopTitle>
                <InputMessageWrapper>
                  <ShopInput
                    placeholder="입력해주세요"
                    onChange={onChangeBusinessName}
                  />
                  <InputMessage>{businessNameMessage}</InputMessage>
                </InputMessageWrapper>
              </ShopInnerWrapper>
            ) : (
              <ShopInnerWrapper>
                <ShopTitle>사업자명</ShopTitle>
                <InputMessageWrapper>
                  <ShopInput
                    placeholder="입력해주세요"
                    onChange={onChangeBusinessName}
                  />
                  <InputMessage />
                </InputMessageWrapper>
              </ShopInnerWrapper>
            )}

            <ShopInnerWrapper>
              <ShopTitle>사업자등록번호</ShopTitle>
              {businessNumber.length > 0 ? (
                <InputMessageWrapper>
                  <ShopInput
                    placeholder="입력해주세요"
                    onChange={onChangeBusinessNumber}
                  />
                  <InputMessage>{businessNumberMessage}</InputMessage>
                </InputMessageWrapper>
              ) : (
                <InputMessageWrapper>
                  <ShopInput
                    placeholder="입력해주세요"
                    onChange={onChangeBusinessNumber}
                  />
                  <InputMessage />
                </InputMessageWrapper>
              )}
            </ShopInnerWrapper>

            <ShopInnerWrapper>
              <ShopTitle>사업시작일</ShopTitle>
              {startBusiness.length > 0 ? (
                <InputMessageWrapper>
                  <ShopInput
                    placeholder="입력해주세요"
                    type="date"
                    onChange={onChangeStartBusiness}
                  />
                  <InputMessage>{startBusinessMessage}</InputMessage>
                </InputMessageWrapper>
              ) : (
                <InputMessageWrapper>
                  <ShopInput
                    placeholder="입력해주세요"
                    type="date"
                    onChange={onChangeStartBusiness}
                  />
                  <InputMessage />
                </InputMessageWrapper>
              )}
            </ShopInnerWrapper>
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
                    <ShopAddMenuBox onClick={addMenuItem}>
                      <PlusIcon />
                      <span>메뉴 추가하기</span>
                    </ShopAddMenuBox>
                  </ShopAddMenuWrapper>
                </ShopAddMenuContainer>
              </div>
            </ShopMenuContainer>
          </ShopInnerOutlineWrapper>
        </ShopWrapper>
      </EnrollShopWrapper>
      <EnrollButtonContainer>
        <EnrollButton onClick={() => onClickSubmit()}>등록하기</EnrollButton>
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
const ShopKeywordWrapper = styled.div`
  width: 30%;
  margin-left: 16.5%;
  padding: 1%;
  height: 200px;
  overflow-y: scroll;
  border: 1px solid ${({ theme }) => theme.colors.subColor1};
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) =>
      theme.colors.subColor1}; /*스크롤바의 색상*/
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent; /*스크롤바 트랙 색상*/
  }
`;
const ShopKeywordList = styled.div`
  width: 100%;
  display: flex;
`;
const ShopKeywordCheckBox = styled.input``;
const ShopKeywordLabelWrapper = styled.div`
  width: 70%;
`;
const ShopKeywordLabel = styled.label``;
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
