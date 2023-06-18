import React, { useState } from "react";
import styled, { css } from "styled-components";
import TodayDate from "./TodayDate";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getKeyWordList } from "../../apis/queries/mainQuery";

const Search = () => {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState<string>("");

  const [categories, setCategories] = useState<string>("모든 카테고리");
  const [categoriesBoolean, setCategoriesBoolean] = useState<boolean>(true);

  const [city, setCity] = useState<string>("전체 지역");
  const [si, setSi] = useState<string>("");

  const [keyWord, setKeyWord] = useState<string>("");

  //DB에 저장된 검색가능한 키워드 리스트 가져오기
  const { data: keyWordList } = useQuery("keyWordList", getKeyWordList, {
    refetchOnWindowFocus: false,
  });

  const CategoriesMenuList = [
    "양식",
    "한식",
    "일식",
    "패스트푸드",
    "중식",
    "치킨",
    "아시아퓨전",
    "피자",
    "레스토랑",
    "분식",
    "카페",
    "기타",
  ];
  const cityList = [
    {
      city: "서울특별시",
      si: [
        "종로구",
        "중구",
        "용산구",
        "성동구",
        "동대문구",
        "중랑구",
        "성북구",
        "도봉구",
        "은평구",
        "서대문구",
        "마포구",
        "양천구",
        "강서구",
        "구로구",
        "영등포구",
        "동작구",
        "관악구",
        "서초구",
        "강남구",
        "송파구",
        "강동구",
      ],
    },
    {
      city: "부산광역시",
      si: [
        "중구",
        "서구",
        "동구",
        "영도구",
        "부산진구",
        "동래구",
        "남구",
        "북구",
        "해운대구",
        "사하구",
        "금정구",
        "강서구",
        "연제구",
        "수영구",
        "사상구",
        "기장군",
      ],
    },
    {
      city: "대구광역시",
      si: [
        "중구",
        "동구",
        "서구",
        "남구",
        "북구",
        "수성구",
        "달서구",
        "달성군",
      ],
    },
    {
      city: "인천광역시",
      si: ["중구", "동구", "남동구", "서구", "강화군", "옹진군"],
    },
    {
      city: "광주광역시",
      si: ["동구", "서구", "북구", "광산구"],
    },
    {
      city: "대전광역시",
      si: ["동구", "중구", "서구", "유성구", "대덕구"],
    },
    {
      city: "울산광역시",
      si: ["중구", "남구", "동구", "북구", "울주군"],
    },
    {
      city: "경기도",
      si: [
        "수원시",
        "성남시",
        "의정부시",
        "안양시",
        "부천시",
        "광명시",
        "평택시",
        "동두천시",
        "안산시",
        "고양시",
        "과천시",
        "구리시",
        "남양주시",
        "오산시",
        "시흥시",
        "군포시",
        "의왕시",
        "하남시",
        "용인시",
        "파주시",
        "이천시",
        "안성시",
        "김포시",
        "화성시",
        "광주시",
        "양주시",
        "포천시",
        "여주시",
        "연천군",
        "가평군",
        "양평군",
      ],
    },
    {
      city: "강원도",
      si: [
        "춘천시",
        "원주시",
        "강릉시",
        "동해시",
        "태백시",
        "속초시",
        "삼척시",
        "홍천군",
        "횡성군",
        "영월군",
        "평창군",
        "정선군",
        "철원군",
        "화천군",
        "양구군",
        "인제군",
        "고성군",
        "양양군",
      ],
    },
    {
      city: "충청북도",
      si: [
        "청주시",
        "충주시",
        "제천시",
        "보은군",
        "옥천군",
        "영동군",
        "진천군",
        "괴산군",
        "음성군",
        "단양군",
      ],
    },
    {
      city: "충청남도",
      si: [
        "천안시",
        "공주시",
        "보령시",
        "아산시",
        "서산시",
        "논산시",
        "계룡시",
        "당진시",
        "금산군",
        "부여군",
        "서천군",
        "청양군",
        "홍성군",
        "예산군",
      ],
    },
    {
      city: "전라북도",
      si: [
        "전주시",
        "군산시",
        "익산시",
        "정읍시",
        "남원시",
        "김제시",
        "완주군",
        "진안군",
        "무주군",
        "장수군",
        "임실군",
        "순창군",
        "고창군",
        "부안군",
      ],
    },
    {
      city: "전라남도",
      si: [
        "목포시",
        "여수시",
        "순천시",
        "나주시",
        "광양시",
        "담양군",
        "곡성군",
        "구례군",
        "고흥군",
        "보성군",
        "화순군",
        "장흥군",
        "강진군",
        "해남군",
        "영암군",
        "무안군",
        "함평군",
        "영광군",
        "장성군",
        "완도군",
        "진도군",
        "신안군",
      ],
    },
    {
      city: "경상북도",
      si: [
        "포항시",
        "경주시",
        "김천시",
        "안동시",
        "구미시",
        "영주시",
        "영천시",
        "상주시",
        "문경시",
        "경산시",
        "군위군",
        "의성군",
        "청송군",
        "영양군",
        "영덕군",
        "청도군",
        "고령군",
        "성주군",
        "칠곡군",
        "예천군",
        "봉화군",
        "울진군",
        "울릉군",
      ],
    },
    {
      city: "경상남도",
      si: [
        "창원시",
        "진주시",
        "통영시",
        "사천시",
        "김해시",
        "밀양시",
        "거제시",
        "양산시",
        "의령군",
        "함안군",
        "창녕군",
        "고성군",
        "남해군",
        "하동군",
        "산청군",
        "함양군",
        "거창군",
        "합천군",
      ],
    },
    {
      city: "제주특별자치도",
      si: ["제주시", "서귀포시"],
    },
  ];

  //onClick
  const categoriesBtnOnClick = () => {
    setCategoriesBoolean(true);
  };
  const localBtnOnClick = () => {
    if (city === "전체 지역") setCity("서울특별시");
    setCategoriesBoolean(false);
    setSi("종로구");
  };
  const categoriesOnClick = (value: string) => {
    if (value === categories) setCategories("모든 카테고리");
    else setCategories(value);
  };
  const allCategoriesBtnOnClick = () => {
    setCategories("모든 카테고리");
  };
  type cityType = {
    city: string;
    si: Array<any>;
  };
  const cityOnClick = (value: cityType) => {
    if (value.city === city) setCity("전체 지역");
    else {
      setCity(value.city);
      setSi(value.si[0]);
    }
  };
  const siOnClick = (value: any) => {
    if (si === value) setSi("");
    else setSi(value);
  };
  const allCityBtn = () => {
    setCity("전체 지역");
    setSi("");
  };
  const keyWordOnClick = (value: string) => {
    if (value === keyWord) setKeyWord("");
    else setKeyWord(value);
  };

  //onChange
  const searchOnChange = (value: string) => {
    setSearchText(value);
  };

  //onSubmit
  const searchOnSubmit = (e: any) => {
    e.preventDefault();
    navigate(
      `/search?category=${
        categories === "모든 카테고리" ? "" : categories
      }&search=${searchText}&location=${
        city === "전체 지역" ? "" : city + " " + si
      }&pagenum=1&sort=TOP_RATED,desc`
    );
  };

  return (
    <>
      <SearchContainer>
        <CategoriesInput id="categories" type="checkbox" />
        <BackgroundBox htmlFor="categories"></BackgroundBox>
        {categoriesBoolean ? (
          <CategoriesBox>
            <CategoriesHeader>
              <p>전체 카테고리</p>
              <label htmlFor="categories"></label>
            </CategoriesHeader>
            <CategoriesList>
              <AllCategoriesBtn
                active={categories === "모든 카테고리"}
                onClick={allCategoriesBtnOnClick}
              >
                전체 카테고리 선택
              </AllCategoriesBtn>
              {CategoriesMenuList.map((value) => (
                <CategoriesItem
                  key={value}
                  onClick={() => categoriesOnClick(value)}
                  active={categories === value}
                >
                  <span>{value}</span>
                </CategoriesItem>
              ))}
            </CategoriesList>
          </CategoriesBox>
        ) : (
          <LocalBox>
            <LocalHeader>
              <p>지역 선택</p>
              <label htmlFor="categories"></label>
            </LocalHeader>
            <LocalInnerBox>
              <CityList>
                <AllCityBtn
                  active={city === "전체 지역"}
                  onClick={() => allCityBtn()}
                >
                  전체 지역 선택
                </AllCityBtn>
                {cityList.map((value) => (
                  <CityItem
                    key={value.city}
                    onClick={() => cityOnClick(value)}
                    active={city === value.city}
                  >
                    <span>{value.city}</span>
                  </CityItem>
                ))}
              </CityList>
              <SiList>
                <AllSiBtn active={si === ""} onClick={() => setSi("")}>
                  {city} 전체
                </AllSiBtn>
                {cityList[
                  [...cityList].map((value) => value.city).indexOf(city)
                ]
                  ? cityList[
                      [...cityList].map((value) => value.city).indexOf(city)
                    ].si.map((value: any) => (
                      <SiItem
                        key={value}
                        onClick={() => siOnClick(value)}
                        active={si === value}
                      >
                        {value}
                      </SiItem>
                    ))
                  : null}
              </SiList>
            </LocalInnerBox>
            <CompleteBtn htmlFor="categories">완료</CompleteBtn>
          </LocalBox>
        )}
        <DateAndSearchBox>
          <TodayDate />
          <SearchBox onSubmit={(e) => searchOnSubmit(e)}>
            <CategoriesBtn
              htmlFor="categories"
              onClick={() => categoriesBtnOnClick()}
            >
              {categories}
              <p></p>
            </CategoriesBtn>
            <LocalBtn htmlFor="categories" onClick={() => localBtnOnClick()}>
              <span>
                {city.replace(/ /g, "").length >= 5
                  ? city
                      .replace("특별", "")
                      .replace("광역", "")
                      .replace("자치", "")
                  : city}
              </span>
              {si}
              <p></p>
            </LocalBtn>
            <SearchInput
              value={searchText}
              placeholder="검색어를 입력해주세요."
              onChange={(e) => searchOnChange(e.target.value)}
            />
            <SearchBtn type="submit">Search</SearchBtn>
          </SearchBox>
        </DateAndSearchBox>
        <KeyWordBox>
          <KeyWordList>
            {Array.isArray(keyWordList)
              ? keyWordList.map((value: any, index: any) => (
                  <KeyWordItem
                    active={keyWord === value.name}
                    onClick={() => keyWordOnClick(value.name)}
                    key={value.keywordId}
                  >
                    # {value.name}
                  </KeyWordItem>
                ))
              : null}
          </KeyWordList>
        </KeyWordBox>
      </SearchContainer>
    </>
  );
};

const SearchContainer = styled.div`
  padding-top: 60px;
  width: 100%;
  height: fit-content;
`;
const DateAndSearchBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 100%;
`;

const SearchBox = styled.form`
  flex: 2.8;
  height: 55px;
`;
const CategoriesInput = styled.input`
  display: none;
  &:checked {
    & + label {
      opacity: 1;
      visibility: visible;
      & + div {
        display: flex;
      }
    }
  }
`;
const BackgroundBox = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-color: rgb(216 216 216 / 48%);
`;

const CategoriesBox = styled.div`
  position: absolute;
  top: 50vh;
  left: 50%;
  transform: translate(-50%, -50%);
  display: none;
  flex-direction: column;
  align-items: center;
  padding: 15px 20px 30px;
  background-color: white;
`;
const CategoriesHeader = styled.header`
  display: flex;
  justify-content: space-between;
  padding-bottom: 15px;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  label {
    position: relative;
    width: 20px;
    height: 20px;
    cursor: pointer;
    &::before {
      position: absolute;
      content: "";
      transform: rotate(45deg);
      width: 3px;
      height: 22px;
      top: 0;
      right: 15px;
      background-color: #dbdbdb;
    }
    &::after {
      position: absolute;
      content: "";
      transform: rotate(-45deg);
      width: 3px;
      height: 22px;
      top: 0;
      right: 15px;
      background-color: #dbdbdb;
    }
  }
`;
const CategoriesList = styled.ul`
  position: relative;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: space-between;
  padding: 10px 15px;
  width: 280px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid rgba(0, 0, 0, 0.11);
  border-radius: 2px;
  color: #535353;
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1px;
    height: 98%;
    background-color: #dedede;
  }
`;
const CategoriesItem = styled.li<{ active: boolean }>`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 10px 8px;
  width: calc(50% - 20px);
  height: fit-content;
  font-size: ${({ theme }) => theme.fontSizes.small};
  cursor: pointer;
  ${(props) =>
    props.active &&
    css`
      color: #0075ff;
    `}
  ::after {
    position: absolute;
    top: 50%;
    right: 10%;
    display: inline-block;
    transform: rotate(45deg) translate(-50%, -25%);
    content: "";
    width: 8px;
    height: 8px;
    border-top: 3px solid rgb(181, 181, 181);
    border-right: 3px solid rgb(181, 181, 181);
  }
`;
const CategoriesBtn = styled.label`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 100%;
  background-color: #f8f8f8;
  box-sizing: border-box;
  border: 1px solid #e7e7e7f8;
  border-radius: 2px;
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.small};
  cursor: pointer;
  p {
    margin-left: 4px;
    width: 0px;
    height: 0px;
    border-top: 9px solid #b5b5b5;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
  }
`;

const LocalBox = styled(CategoriesBox)`
  display: none;
  padding: 15px 30px 30px;
  height: 750px;
  overflow-y: hidden;
`;
const LocalHeader = styled(CategoriesHeader)``;
const LocalInnerBox = styled.div`
  display: flex;
  height: 660px;
  border: 1px solid rgba(0, 0, 0, 0.11);
  border-radius: 2px;
  color: #535353;
`;
const CityList = styled.ul`
  flex-direction: column;
  width: fit-content;
  border-right: 1px solid rgba(0, 0, 0, 0.11);
`;
const CityItem = styled(CategoriesItem)`
  padding: 10px 8px;
  min-width: 130px;
  ${(props) =>
    props.active &&
    css`
      color: #0075ff;
    `}
`;

const AllCityBtn = styled.li<{ active: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 10px 8px;
  width: 130px;
  height: fit-content;
  font-size: ${({ theme }) => theme.fontSizes.small};
  cursor: pointer;
  ${(props) =>
    props.active &&
    css`
      color: #0075ff;
    `}
`;
const AllSiBtn = styled(AllCityBtn)``;
const AllCategoriesBtn = styled(AllCityBtn)``;

const SiList = styled(CityList)`
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    width: 7px;
    border-radius: 5px;
    background-color: #b1b1b1;
  }
  &::-webkit-scrollbar-track {
    background-color: #ffffff;
  }
`;
const SiItem = styled(CityItem)``;
const LocalBtn = styled(CategoriesBtn)`
  width: 140px;
  span {
    margin-right: 5px;
  }
`;

const SearchInput = styled.input`
  outline: none;
  padding: 5px 10px;
  width: calc(100% - 370px);
  height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-left: none;
  border-right: none;
  border-radius: 2px;
  box-sizing: border-box;
  font-size: ${({ theme }) => theme.fontSizes.base};
`;
const SearchBtn = styled.button`
  width: 100px;
  height: 100%;
  background: #0075ff;
  border: 1px solid #ffffff;
  border-radius: 2px;
  color: ${({ theme }) => theme.colors.white};
  font-size: 1rem;
  cursor: pointer;
`;

const CompleteBtn = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 7px;
  width: 100px;
  height: 40px;
  background: #0075ff;
  border: 1px solid #ffffff;
  border-radius: 2px;
  color: ${({ theme }) => theme.colors.white};
  font-size: 1rem;
  cursor: pointer;
`;

const KeyWordBox = styled.div``;
const KeyWordList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
`;
const KeyWordItem = styled.li<{ active: boolean }>`
  margin: 0 5px;
  padding: 5px 10px;
  background-color: #d9d9d9;
  border-radius: 10px;
  font-size: 0.7rem;
  cursor: pointer;
  ${(props) =>
    props.active &&
    css`
      background-color: #0075ff;
      color: ${({ theme }) => theme.colors.white};
    `}
`;

export default Search;
