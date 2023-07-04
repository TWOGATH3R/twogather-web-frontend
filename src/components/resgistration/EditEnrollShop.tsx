import React, { useCallback, useState } from "react";
import styled, { css } from "styled-components";
import { ReactComponent as RightArrow } from "../../assets/right-arrow.svg";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { address, visibleAddress } from "../../store/addressAtom";
import {
  getCategories,
  getKeyWordList,
  postEnrollShopInfo,
  putStoreInfo,
} from "../../apis/queries/storeQuery";
import { StoreId } from "../../store/storeDetailAtom";
import { postEnrollShopInfoProps } from "../../apis/types/store.type";
import ShopSubTitle from "./ShopSubTitle";
import InputText from "./InputText";
import InputAddress from "./InputAddress";
import InputCategory from "./InputCategory";
import InputKeyword from "./InputKeyword";
import { IShopAddressVisible } from "../../apis/api";
import InputDate from "./InputDate";

export default function EnrollShop() {
  const [searchParams, setSearchParams] = useSearchParams();

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

  //DB에 저장된 카테고리 리스트 가져오기
  const { data: CATEGORY } = useQuery(["getCategoriesList"], getCategories);
  //DB에 저장된 검색가능한 키워드 리스트 가져오기
  const { data: KEYWORD } = useQuery(["keyWordList"], getKeyWordList);

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

  const setStoreId = useSetRecoilState(StoreId);
  const storeId = searchParams.get("storeId");

  //가게 정보 수정 api
  const { mutate: updateStoreInfo } = useMutation(
    (data: postEnrollShopInfoProps) => putStoreInfo(storeId, data),
    {
      onSuccess: (res) => {
        console.log(res);
        setStoreId(res.data.storeId);
        // navigate("/enrollshop/contents");
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
          KEYWORD &&
          KEYWORD.data[KEYWORD.data.map((value) => value.name).indexOf(kword)]
            .keywordId
      );
      const categoryId =
        CATEGORY &&
        CATEGORY.data.filter((cate: any) => cate.name === categoryValue)[0]
          .categoryId;

      const data: postEnrollShopInfoProps = {
        storeName: shopName,
        address: shopAddress,
        phone: shopNumber,
        businessNumber: businessNumber.split("-").join(""),
        businessName: businessName,
        businessStartDate: startBusiness,
        keywordIdList: keywordIdlist,
        categoryId: categoryId,
      };

      updateStoreInfo(data);
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
    setShopCategory(e.target.value);
    if (shopCategory.length >= 0) {
      setShopCategoryMessage("카테고리를 선택해주세요.");
    } else {
      setShopCategory("");
    }
  };
  const keyWordListLengthIs3 = (keywordList: string[]) => {
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
                  {CATEGORY &&
                    CATEGORY.data.map((item) => (
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
                {KEYWORD && Array.isArray(KEYWORD?.data)
                  ? KEYWORD.data.map((item) => (
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
                    ))
                  : null}
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
  width: 50%;
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
