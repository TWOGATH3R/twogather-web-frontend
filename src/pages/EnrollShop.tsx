import React, { useRef, useState } from "react";
import styled, { css } from "styled-components";
import { ReactComponent as PhotoIcon } from "../assets/photo-icon.svg";
import { ReactComponent as PlusIcon } from "../assets/plus-icon.svg";
import AddressModal from "../components/address/AddressModal";
import { useRecoilState, useRecoilValue } from "recoil";
import { address, visibleAddress } from "../store/addressAtom";

interface IShopAddressVisible {
  visible: Boolean;
}
export default function EnrollShop() {
  const [shopName, setShopName] = useState<String>("");
  const ShopAddress = useRecoilValue(address);
  const [shopNumber, setShopNumber] = useState<String>("");
  const [visibleShopAddress, setVisibleShopAddress] =
    useRecoilState(visibleAddress);
  const inputPhotoFile = useRef<HTMLInputElement | null>(null);
  const inputMeunFile = useRef<HTMLInputElement | null>(null);
  const [inputCheckBox1, setInputCheckBox1] = useState(false);
  const [inputCheckBox2, setInputCheckBox2] = useState(false);

  const [startTimeValue, setStartTimeValue] = useState("00:00:00");
  const [endTimeValue, setEndTimeValue] = useState("00:00:00");

  const [startBreakTimeValue, setStartBreakTimeValue] = useState("00:00:00");
  const [endBreakTimeValue, setEndBreakTimeValue] = useState("00:00:00");

  const [shopNameMessage, setShopNameMessage] = useState("");
  const [shopNumberMessage, setShopNumberMessage] = useState("");
  // onClick
  const onClickPhotoFile = () => {
    inputPhotoFile.current?.click();
  };

  const onClickMenuFile = () => {
    inputMeunFile.current?.click();
  };

  const onClickShopAddress = () => {
    setVisibleShopAddress(true);
  };

  const onClickCheckBox1 = () => {
    setInputCheckBox1((prev) => !prev);
  };
  const onClickCheckBox2 = () => {
    setInputCheckBox2((prev) => !prev);
  };

  // onChange
  const onChangeShopName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regShopName = /^[가-힣a-zA-Z0-9]+$/;
    const shopNameCurrent = e.target.value;
    setShopName(e.target.value);

    if (!regShopName.test(shopNameCurrent)) {
      setShopNameMessage("이름이 옳바르지 않습니다.");
    } else {
      setShopName("");
    }
  };

  const onChangeShopNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regShopNumber = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/;
    const shopNumberCurrent = e.target.value;
    setShopNumber(e.target.value);

    if (!regShopNumber.test(shopNumberCurrent)) {
      setShopNumberMessage("번호가 옳바르지 않습니다.");
    } else {
      setShopNumberMessage("");
    }
  };

  console.log(inputCheckBox1, startTimeValue);

  const onChangeStartTimeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTimeValue(e.target.value);
  };
  const onChangeEndTimeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndTimeValue(e.target.value);
  };

  const onChangeStartBreakTimeValue = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartBreakTimeValue(e.target.value);
  };
  const onChangeEndBreakTimeValue = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEndBreakTimeValue(e.target.value);
  };

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
            {shopNumber.length ? (
              <ShopInnerWrapper>
                <ShopTitle>가게 전화번호</ShopTitle>
                <InputMessageWrapper>
                  <ShopInput
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
                    placeholder="입력해주세요"
                    onChange={onChangeShopNumber}
                  />
                  <InputMessage />
                </InputMessageWrapper>
              </ShopInnerWrapper>
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
              <ShopPhotoForm>
                <ShopInput
                  ref={inputPhotoFile}
                  className="input-file"
                  type="file"
                  id="file"
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
        <ShopWrapper style={{ marginTop: "5%" }}>
          <ShopInnerOutlineWrapper>
            <ShopInnerOutlineTitleWrapper>
              <ShopInnerOutlineBigTitle>
                영업시간 정보 <span>*</span>
              </ShopInnerOutlineBigTitle>
            </ShopInnerOutlineTitleWrapper>

            <ShopDayWrapper>
              <ShopDayUl>
                <ShopDayList>월</ShopDayList>
                <ShopDayList>화</ShopDayList>
                <ShopDayList>수</ShopDayList>
                <ShopDayList>목</ShopDayList>
                <ShopDayList>금</ShopDayList>
                <ShopDayList>토</ShopDayList>
                <ShopDayList>일</ShopDayList>
              </ShopDayUl>
            </ShopDayWrapper>
            <ShopInnerWrapper>
              <ShopTitle style={{ flex: 0.3, fontWeight: "500" }}>
                영업중
              </ShopTitle>
              {inputCheckBox1 ? (
                <>
                  <ShopTimeInput
                    type="time"
                    defaultValue={startTimeValue}
                    onChange={onChangeStartTimeValue}
                  />
                  <span className="time-wave">~</span>
                  <ShopTimeInput
                    type="time"
                    defaultValue={endTimeValue}
                    onChange={onChangeEndTimeValue}
                  />
                </>
              ) : (
                <>
                  <ShopTimeInput
                    disabled
                    type="time"
                    defaultValue={startTimeValue}
                  />
                  <span className="time-wave">~</span>
                  <ShopTimeInput
                    disabled
                    type="time"
                    defaultValue={endTimeValue}
                  />
                </>
              )}
              <ShopCheckBoxWrapper>
                <ShopInput
                  id="checkbox1"
                  type="checkbox"
                  onClick={onClickCheckBox1}
                />
                <label htmlFor="checkbox1"></label>
              </ShopCheckBoxWrapper>
            </ShopInnerWrapper>

            <ShopInnerWrapper>
              <ShopTitle style={{ flex: 0.3, fontWeight: "500" }}>
                has break time
              </ShopTitle>
              {inputCheckBox2 ? (
                <>
                  <ShopTimeInput
                    type="time"
                    defaultValue={startBreakTimeValue}
                    onChange={onChangeStartBreakTimeValue}
                  />
                  <span className="time-wave">~</span>
                  <ShopTimeInput
                    defaultValue={endBreakTimeValue}
                    onChange={onChangeEndBreakTimeValue}
                    type="time"
                  />
                </>
              ) : (
                <>
                  <ShopTimeInput
                    disabled
                    type="time"
                    defaultValue={startBreakTimeValue}
                  />
                  <span className="time-wave">~</span>
                  <ShopTimeInput
                    disabled
                    type="time"
                    defaultValue={endBreakTimeValue}
                  />
                </>
              )}

              <ShopCheckBoxWrapper>
                <ShopInput
                  id="checkbox2"
                  type="checkbox"
                  onClick={onClickCheckBox2}
                />
                <label htmlFor="checkbox2"></label>
              </ShopCheckBoxWrapper>
            </ShopInnerWrapper>

            <ShopTimeButtonWrapper>
              <ShopTimeButton>영업시간 추가</ShopTimeButton>
            </ShopTimeButtonWrapper>
          </ShopInnerOutlineWrapper>
        </ShopWrapper>

        {/* 메뉴 */}
        <ShopWrapper style={{ marginTop: "5%" }}>
          <ShopInnerOutlineWrapper>
            <ShopInnerOutlineTitleWrapper>
              <ShopInnerOutlineBigTitle>메뉴</ShopInnerOutlineBigTitle>
            </ShopInnerOutlineTitleWrapper>

            <ShopMenuContainer>
              <ShopMenuInnerWrapper>
                <ShopMenuWrapper style={{ marginBottom: "5%" }}>
                  <ShopMenuSubTitle>메뉴명</ShopMenuSubTitle>
                  <ShopMenuInput placeholder="입력해주세요" />
                </ShopMenuWrapper>
                <ShopMenuWrapper>
                  <ShopMenuSubTitle>가격</ShopMenuSubTitle>
                  <ShopMenuInput placeholder="입력해주세요" />
                </ShopMenuWrapper>
              </ShopMenuInnerWrapper>

              <ShopAddMenuContainer>
                <ShopAddMenuWrapper>
                  <ShopInput
                    ref={inputMeunFile}
                    className="input-file"
                    type="file"
                    id="menu-file"
                  />
                  <PlusIcon
                    onClick={onClickMenuFile}
                    style={{
                      position: "absolute",
                      top: "40%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      cursor: "pointer",
                    }}
                  />
                  <label onClick={onClickMenuFile}>메뉴 추가하기</label>
                </ShopAddMenuWrapper>
              </ShopAddMenuContainer>
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
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid ${({ theme }) => theme.colors.subColor1};
    position: relative;
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
  padding: 2%;
`;
const ShopPhotoForm = styled.div`
  width: 228px;
  height: 204px;
  position: relative;
  .input-file {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
`;
const ShopDayList = styled.li`
  list-style: none;
  border: 1px solid ${({ theme }) => theme.colors.subColor1};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  border-radius: 9999px;
  padding: 10px 12px;
  font-weight: bold;
  margin-right: 4%;
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
  margin-right: 10px;
  cursor: pointer;
`;

const ShopCheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0.2;
`;

const ShopMenuContainer = styled.div`
  padding: 10px;
  display: flex;
`;
const ShopMenuInnerWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.subColor1};
  flex: 2;
  padding: 3% 2%;
  border-radius: 20px;
`;
const ShopMenuWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const ShopAddMenuContainer = styled.div`
  flex: 3;
  padding: 0 6%;
`;
const ShopAddMenuWrapper = styled.div`
  width: 50%;
  height: 100%;
  position: relative;
  .input-file {
    position: absolute;
    border-radius: 20px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    font-size: 0;
    padding: 0;
    cursor: pointer;
  }
  input[type="file"]::file-selector-button {
    display: none;
  }
  label {
    width: 100%;
    position: absolute;
    top: 65%;
    left: 75%;
    transform: translate(-50%, -50%);
    cursor: pointer;
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
