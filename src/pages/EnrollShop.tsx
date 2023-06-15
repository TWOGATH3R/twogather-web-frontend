import React, { useCallback, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { ReactComponent as RightArrow } from "../assets/right-arrow.svg";
import AddressModal from "../components/address/AddressModal";
import { useRecoilState, useRecoilValue } from "recoil";
import { address, visibleAddress } from "../store/addressAtom";
import { IShopAddressVisible } from "../apis/api";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function EnrollShop() {
  const navigate = useNavigate();
  const location = useLocation();

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

  // onClick
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
  const nextBtnOnClick = () => {
    console.log(keywordList);
    if (
      !shopName ||
      !shopAddress ||
      !shopNumber ||
      !categoryValue ||
      !keywordList ||
      !businessName ||
      !businessNumber ||
      !startBusiness
    )
      alert("모든 정보를 입력해주세요");
    else if (!regShopName.test(shopName)) alert("가게명이 옳바르지 않습니다.");
    else if (!regShopNumber.test(shopNumber))
      alert("번호가 옳바르지 않습니다 (- 포함시켜 주세요.)");
    else if (!regBusinessName.test(businessName))
      alert("사업자명이 옳바르지 않습니다.");
    else if (!regBusinessNumber.test(businessNumber))
      alert("사업자번호가 옳바르지 않습니다");
    else
      navigate("/enrollshop/contents", {
        state: {
          shopName: shopName,
          shopAddress: shopAddress,
          shopNumber: shopNumber,
          categoryValue: categoryValue,
          keywordList: keywordList,
          businessName: businessName,
          businessNumber: businessNumber,
          startBusiness: startBusiness,
        },
      });
  };

  const regShopName = /^[가-힣a-zA-Z0-9\s]+$/;
  const regShopNumber = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/;
  const regBusinessName = /^[가-힣a-zA-Z0-9\s]+$/;
  const regBusinessNumber = /^[0-9]{10}/;

  // onChange
  const onChangeShopName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const shopNameCurrent = e.target.value;
    setShopName(e.target.value);
    if (!regShopName.test(shopNameCurrent)) {
      setShopNameMessage("가게명이 옳바르지 않습니다.");
      return;
    } else {
      setShopNameMessage("");
    }
  };
  const onChangeShopNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    setStartBusiness(e.target.value);
    if (startBusiness.length >= 0) {
      setStartBusinessMessage("");
      return;
    } else {
      setStartBusinessMessage("선택해주세요.");
    }
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
                    value={shopName}
                    placeholder="입력해주세요"
                    onChange={onChangeShopName}
                    disabled={
                      location.pathname === "/enrollshop/contents"
                        ? true
                        : false
                    }
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
                    disabled={
                      location.pathname === "/enrollshop/contents"
                        ? true
                        : false
                    }
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
                  style={{ cursor: "pointer" }}
                  disabled={
                    location.pathname === "/enrollshop/contents" ? true : false
                  }
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
                    disabled={
                      location.pathname === "/enrollshop/contents"
                        ? true
                        : false
                    }
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
                  disabled={
                    location.pathname === "/enrollshop/contents" ? true : false
                  }
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
                  disabled={
                    location.pathname === "/enrollshop/contents" ? true : false
                  }
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
                    disabled={
                      location.pathname === "/enrollshop/contents"
                        ? true
                        : false
                    }
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
                    disabled={
                      location.pathname === "/enrollshop/contents"
                        ? true
                        : false
                    }
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
                    disabled={
                      location.pathname === "/enrollshop/contents"
                        ? true
                        : false
                    }
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
              <InputMessageWrapper>
                <ShopInput
                  placeholder="입력해주세요"
                  type="date"
                  onChange={onChangeStartBusiness}
                  disabled={
                    location.pathname === "/enrollshop/contents" ? true : false
                  }
                />
                <InputMessage>{startBusinessMessage}</InputMessage>
              </InputMessageWrapper>
            </ShopInnerWrapper>
          </ShopInnerOutlineWrapper>
        </ShopWrapper>
        <Outlet />
      </EnrollShopWrapper>
      {location.pathname !== "/enrollshop/contents" ? (
        <EnrollButtonContainer>
          <EnrollButton onClick={() => nextBtnOnClick()}>다음</EnrollButton>
        </EnrollButtonContainer>
      ) : null}
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
