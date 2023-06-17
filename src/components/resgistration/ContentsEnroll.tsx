import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import { ReactComponent as PhotoIcon } from "../../assets/photo-icon.svg";
import { ReactComponent as DeleteIcon } from "../../assets/delete-icon.svg";
import Swal from "sweetalert2";
import { IShopInputItem } from "../../apis/api";
import { useMutation, useQuery } from "react-query";
import {
  getEnrollShopCategory,
  postEnrollShopInfo,
} from "../../apis/queries/storeQuery";
import { IShopMenuList } from "../../apis/api";
import { useLocation, useNavigate } from "react-router-dom";

const ContentsEnroll = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const storeInfo = {};
  //가게 등록 query
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
  const { data: getCategoryId } = useQuery(
    "categoryId",
    getEnrollShopCategory,
    { refetchOnWindowFocus: false }
  );

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
  const [dayOfWeek, setDayOfWeek] = useState();
  type checkWeekListType = {
    day: string[];
  };
  const [checkWeekList, setCheckWeekList] = useState<Array<checkWeekListType>>([
    { day: [] },
  ]);

  //onClick
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

  //onChange
  const onChangeShopImage = (e: React.ChangeEvent) => {
    const targetFiles = (e.target as HTMLInputElement).files as FileList;
    const targetFilesList = Array.from(targetFiles);
    const selectedFiles: string[] = targetFilesList.map((file) => {
      return URL.createObjectURL(file);
    });
    setShopImages((prev) => prev.concat(selectedFiles));
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
  function deleteInputItem(index: number) {
    setCheckWeekList(checkWeekList.filter((v, i) => i !== index));
    setInputItems(inputItems.filter((item) => item.id !== index));
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

  //onSubmit
  const enrollBtnOnSubmit = () => {
    const addDay: any = [];
    for (let i = 0; i < inputItems.length; i++) {
      for (let j = 0; j < 7; j++) {
        if (inputItems[i].week[j].status === true) {
          addDay.push(
            {
              dayOfWeek: inputItems[i].week[j].dayOfWeek,
              day: inputItems[i].week[j].day,
              status: inputItems[i].week[j].status,
            },
          );
          setDayOfWeek(addDay);
        }
      }
    }
    console.log(dayOfWeek);
    // shopInfo();
  };

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
                        onChange={(e) => onChangeStoreStartTimeInput(e, index)}
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
                          onChange={(e) => onChangeEndBreakTimeValue(e, index)}
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
                    {/* <PlusIcon /> */}
                    <span>메뉴 추가하기</span>
                  </ShopAddMenuBox>
                </ShopAddMenuWrapper>
              </ShopAddMenuContainer>
            </div>
          </ShopMenuContainer>
        </ShopInnerOutlineWrapper>
      </ShopWrapper>
      <EnrollButtonContainer>
        <EnrollButton onClick={() => enrollBtnOnSubmit()}>
          등록하기
        </EnrollButton>
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

export default ContentsEnroll;