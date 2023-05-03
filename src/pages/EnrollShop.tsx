import React, { useRef } from "react";
import styled from "styled-components";
import { ReactComponent as PhotoIcon } from "../assets/photo-icon.svg";

export default function EnrollShop() {
  const inputFile = useRef<HTMLInputElement | null>(null);

  const onClickFile = () => {
    inputFile.current?.click();
  };
  return (
    <EnrollShopContainer>
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
            <ShopInnerWrapper>
              <ShopTitle>가게명</ShopTitle>
              <ShopInput placeholder="입력해주세요" />
            </ShopInnerWrapper>

            {/* 가게 주소 */}
            <ShopInnerWrapper>
              <ShopTitle>가게 주소</ShopTitle>
              <ShopInput placeholder="기본주소" />
            </ShopInnerWrapper>

            {/* 가게 전화번호 */}
            <ShopInnerWrapper>
              <ShopTitle>가게 전화번호</ShopTitle>
              <ShopInput placeholder="입력해주세요" />
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
              <ShopPhotoForm>
                <ShopInput
                  ref={inputFile}
                  className="input-file"
                  type="file"
                  placeholder="입력해주세요"
                  id="file"
                />
                <PhotoIcon
                  onClick={onClickFile}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    cursor: "pointer",
                  }}
                />
                <label onClick={onClickFile}>사진추가</label>
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
              <ShopTimeInput type="time" value={"00:00:00"} />
              <span className="time-wave">~</span>
              <ShopTimeInput value={"00:00:00"} type="time" />
            </ShopInnerWrapper>

            <ShopInnerWrapper>
              <ShopTitle style={{ flex: 0.3, fontWeight: "500" }}>
                has break time
              </ShopTitle>
              <ShopTimeInput type="time" value={"00:00:00"} />
              <span className="time-wave">~</span>
              <ShopTimeInput value={"00:00:00"} type="time" />
            </ShopInnerWrapper>
          </ShopInnerOutlineWrapper>
        </ShopWrapper>
      </EnrollShopWrapper>
      {/* EnrollShop */}
    </EnrollShopContainer>
  );
}

const EnrollShopContainer = styled.div`
  padding: 2% 20%;
  display: flex;
  align-items: center;
  justify-content: center;
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
  padding: 2% 0;
  .time-wave {
    font-size: 23px;
  }
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
    top: 70%;
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
