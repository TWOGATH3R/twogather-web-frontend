import React, { useCallback, useState } from "react";
import styled, { css } from "styled-components";
import { ReactComponent as RightArrow } from "../assets/right-arrow.svg";
import { useRecoilState, useRecoilValue } from "recoil";
import { address, visibleAddress } from "../store/addressAtom";
import { IShopAddressVisible } from "../apis/api";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import InputText from "../components/resgistration/InputText";
import InputAddress from "../components/resgistration/InputAddress";
import InputCategory from "../components/resgistration/InputCategory";
import InputKeyword from "../components/resgistration/InputKeyword";
import InputDate from "../components/resgistration/InputDate";
import ShopSubTitle from "../components/resgistration/ShopSubTitle";
import { postEnrollShopInfo } from "../apis/queries/storeQuery";
import { useMutation } from "@tanstack/react-query";
import { PostEnrollShopInfo } from "../apis/queries/type";

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
  type CATEGORY_TYPE = {
    categoryId: number;
    name: string;
  };
  type KEYWORD_TYPE = {
    keywordId: number;
    name: string;
  };

  const CATEGORY: CATEGORY_TYPE[] = [
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

  const KEYWORD: KEYWORD_TYPE[] = [
    { keywordId: 1, name: "분위기 좋은" },
    { keywordId: 2, name: "저렴한 가격" },
    { keywordId: 3, name: "아이들과 오기 좋은" },
    { keywordId: 4, name: "사진찍기 좋은" },
    { keywordId: 5, name: "친절한" },
    { keywordId: 6, name: "고급스러운" },
    { keywordId: 7, name: "조용한" },
    { keywordId: 8, name: "모임하기 좋은" },
    { keywordId: 9, name: "특별한 날" },
    { keywordId: 10, name: "단체 회식" },
    { keywordId: 11, name: "데이트하기 좋은" },
    { keywordId: 12, name: "뷰가 좋은" },
    { keywordId: 13, name: "특별한 메뉴" },
    { keywordId: 14, name: "멋진 인테리어" },
    { keywordId: 15, name: "디저트가 맛있는" },
    { keywordId: 16, name: "청결한 매장" },
    { keywordId: 17, name: "방송에 나온 맛집" },
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

  const { mutate: sendRegiData } = useMutation(
    (data: PostEnrollShopInfo) => postEnrollShopInfo(data),
    {
      onSuccess: (res) => {
        navigate("/enrollshop/contents");
      },
      onError: (err: any) => {
        alert(err.response.data.message);
      },
    }
  );

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
  const nextBtnOnClick = async () => {
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
    else {
      const keywordIdlist = keywordList.map(
        (kword) =>
          KEYWORD[KEYWORD.map((value) => value.name).indexOf(kword)].keywordId
      );
      const categoryId = CATEGORY.filter(
        (cate) => cate.name === categoryValue
      )[0].categoryId;

      const data: PostEnrollShopInfo = {
        storeName: shopName,
        address: shopAddress,
        phone: shopNumber,
        businessNumber: businessNumber.split("-").join(""),
        businessName: businessName,
        businessStartDate: startBusiness,
        keywordIdList: keywordIdlist,
        categoryId: categoryId,
      };

      sendRegiData(data);
      // navigate('/enrollshop/contents', {
      //   state: {
      //     shopName: shopName,
      //     shopAddress: shopAddress,
      //     shopNumber: shopNumber,
      //     categoryValue: categoryValue,
      //     keywordList: keywordList,
      //     businessName: businessName,
      //     businessNumber: businessNumber,
      //     startBusiness: startBusiness,
      //   },
      // });
    }
  };

  const regShopName = /^[가-힣a-zA-Z0-9\s]+$/;
  const regShopNumber = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/;
  const regBusinessName = /^[가-힣a-zA-Z0-9\s]+$/;
  const regBusinessNumber = /^[0-9]{3}-[0-9]{2}-[0-9]{5}$/;

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
    console.log(shopCategory);
    if (shopCategory.length >= 0) {
      setShopCategoryMessage("카테고리를 선택해주세요.");
    } else {
      setShopCategory("");
    }
  };
  const keyWordListLengthIs3 = (keywordList: string[]) => {
    console.log(keywordList);
    setVisibleKeyword(keywordList.length >= 3 ? false : true);
  };

  const onChangeKeyword = useCallback(
    (checked: boolean, item: string) => {
      if (checked) {
        setKeywordList((prev) => [...prev, item]);
        const newKeywordList = [...keywordList, item];
        keyWordListLengthIs3(newKeywordList);
      } else if (!checked) {
        const newKeywordList = keywordList.filter((el) => el !== item);
        setKeywordList(newKeywordList);
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
            <ShopSubTitle>가게정보</ShopSubTitle>

            {/* 가게명 */}
            <InputText
              title={"가게명"}
              inputTxt={shopName}
              onChangeHandler={onChangeShopName}
              placeholder="입력해주세요"
              guideMsg={shopNameMessage}
              pathName={location.pathname}
            />
            {/* 가게 주소 */}
            <InputAddress
              title={"가게 주소"}
              inputTxt={shopAddress}
              onClickHandler={onClickShopAddress}
              placeholder={"기본주소"}
              style={{ cursor: "pointer" }}
              pathName={location.pathname}
              visiblePopup={visibleShopAddress}
            />

            {/* 가게 전화번호 */}
            <InputText
              title="가게 전화번호"
              inputTxt={shopNumber}
              type="tel"
              onChangeHandler={onChangeShopNumber}
              placeholder="입력해주세요"
              guideMsg={shopNumberMessage}
              pathName={location.pathname}
            />

            <InputCategory
              title="카테고리"
              inputTxt={categoryValue}
              style={{ cursor: "pointer" }}
              placeholder={"카테고리를 정해주세요"}
              onChangeHandler={onChangeShopCategory}
              onClickHandler={() => onClickVisibleCategory()}
              pathName={location.pathname}
              visiblePopup={visibleCategory}
            ></InputCategory>
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
            <InputKeyword
              title="가게 대표 키워드"
              visiblePopup={visibleKeyword}
              inputTxt={keywordList}
              onClickHandler={() => onClickVisibleKeyword()}
              placeholder="선택해주세요 (최대 3개까지 가능합니다.)"
              style={{ cursor: "pointer" }}
              pathName={location.pathname}
            ></InputKeyword>

            {visibleKeyword && (
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
            <ShopSubTitle>사업자정보</ShopSubTitle>

            <InputText
              title="사업자명"
              inputTxt={businessName}
              onChangeHandler={onChangeBusinessName}
              placeholder="입력해주세요"
              guideMsg={businessNameMessage}
              pathName={location.pathname}
            />
            <InputText
              title="사업자등록번호"
              inputTxt={businessNumber}
              onChangeHandler={onChangeBusinessNumber}
              placeholder="입력해주세요"
              guideMsg={businessNumberMessage}
              pathName={location.pathname}
            />
            <InputDate
              title="사업시작일"
              placeholder="입력해주세요"
              onChangeHandler={onChangeStartBusiness}
              pathName={location.pathname}
              inputTxt={startBusiness}
              guideMsg={startBusinessMessage}
            />
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
