import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import TodayDate from "./TodayDate";

const Search = () => {
  const [categories, setCategories] = useState<string>("모든 카테고리");
  const [categoriesBoolean, setCategoriesBoolean] = useState<boolean>(true);

  const [city, setCity] = useState<string>("전체 지역");
  type siType = {
    code: string;
    name: string;
  };
  const [si, setSi] = useState<siType>({ code: "1111", name: "종로구" });

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
        { code: "1111", name: "종로구" },
        { code: "1114", name: "중구" },
        { code: "1117", name: "용산구" },
        { code: "1120", name: "성동구" },
        { code: "1123", name: "동대문구" },
        { code: "1126", name: "중랑구" },
        { code: "1129", name: "성북구" },
        { code: "1132", name: "도봉구" },
        { code: "1138", name: "은평구" },
        { code: "1141", name: "서대문구" },
        { code: "1144", name: "마포구" },
        { code: "1147", name: "양천구" },
        { code: "1150", name: "강서구" },
        { code: "1153", name: "구로구" },
        { code: "1156", name: "영등포구" },
        { code: "1159", name: "동작구" },
        { code: "1162", name: "관악구" },
        { code: "1165", name: "서초구" },
        { code: "1168", name: "강남구" },
        { code: "1171", name: "송파구" },
        { code: "1174", name: "강동구" },
      ],
    },
    {
      city: "부산광역시",
      si: [
        { code: "2611", name: "중구" },
        { code: "2614", name: "서구" },
        { code: "2617", name: "동구" },
        { code: "2620", name: "영도구" },
        { code: "2623", name: "부산진구" },
        { code: "2626", name: "동래구" },
        { code: "2629", name: "남구" },
        { code: "2632", name: "북구" },
        { code: "2635", name: "해운대구" },
        { code: "2638", name: "사하구" },
        { code: "2641", name: "금정구" },
        { code: "2644", name: "강서구" },
        { code: "2647", name: "연제구" },
        {
          code: "2650",
          name: "수영구",
        },
        { code: "2653", name: "사상구" },
        { code: "2671", name: "기장군" },
      ],
    },
    {
      city: "대구광역시",
      si: [
        { code: "2711", name: "중구" },
        { code: "2714", name: "동구" },
        { code: "2717", name: "서구" },
        { code: "2720", name: "남구" },
        { code: "2723", name: "북구" },
        { code: "2726", name: "수성구" },
        { code: "2729", name: "달서구" },
        { code: "2771", name: "달성군" },
      ],
    },
    {
      city: "인천광역시",
      si: [
        { code: "2811", name: "중구" },
        { code: "2814", name: "동구" },
        { code: "2820", name: "남동구" },
        { code: "2826", name: "서구" },
        { code: "2871", name: "강화군" },
        { code: "2872", name: "옹진군" },
      ],
    },
    {
      city: "광주광역시",
      si: [
        { code: "2911", name: "동구" },
        { code: "2914", name: "서구" },
        { code: "2917", name: "북구" },
        { code: "2920", name: "광산구" },
      ],
    },
    {
      city: "대전광역시",
      si: [
        { code: "3011", name: "동구" },
        { code: "3014", name: "중구" },
        { code: "3017", name: "서구" },
        { code: "3020", name: "유성구" },
        { code: "3023", name: "대덕구" },
      ],
    },
    {
      city: "울산광역시",
      si: [
        { code: "3111", name: "중구" },
        { code: "3114", name: "남구" },
        { code: "3117", name: "동구" },
        { code: "3120", name: "북구" },
        { code: "3171", name: "울주군" },
      ],
    },
    {
      city: "경기도",
      si: [
        { code: "4111", name: "수원시" },
        { code: "4113", name: "성남시" },
        { code: "4115", name: "의정부시" },
        { code: "4117", name: "안양시" },
        { code: "4119", name: "부천시" },
        { code: "4121", name: "광명시" },
        { code: "4122", name: "평택시" },
        { code: "4125", name: "동두천시" },
        { code: "4127", name: "안산시" },
        { code: "4128", name: "고양시" },
        { code: "4129", name: "과천시" },
        { code: "4131", name: "구리시" },
        { code: "4136", name: "남양주시" },
        { code: "4137", name: "오산시" },
        { code: "4139", name: "시흥시" },
        { code: "4141", name: "군포시" },
        { code: "4143", name: "의왕시" },
        { code: "4145", name: "하남시" },
        { code: "4146", name: "용인시" },
        { code: "4148", name: "파주시" },
        { code: "4150", name: "이천시" },
        { code: "4155", name: "안성시" },
        { code: "4157", name: "김포시" },
        { code: "4159", name: "화성시" },
        { code: "4161", name: "광주시" },
        { code: "4163", name: "양주시" },
        { code: "4165", name: "포천시" },
        { code: "4167", name: "여주시" },
        { code: "4180", name: "연천군" },
        { code: "4182", name: "가평군" },
        { code: "4183", name: "양평군" },
      ],
    },
    {
      city: "강원도",
      si: [
        { code: "4211", name: "춘천시" },
        { code: "4213", name: "원주시" },
        { code: "4215", name: "강릉시" },
        { code: "4217", name: "동해시" },
        { code: "4219", name: "태백시" },
        { code: "4221", name: "속초시" },
        { code: "4223", name: "삼척시" },
        { code: "4272", name: "홍천군" },
        { code: "4273", name: "횡성군" },
        { code: "4275", name: "영월군" },
        { code: "4276", name: "평창군" },
        { code: "4277", name: "정선군" },
        { code: "4278", name: "철원군" },
        { code: "4279", name: "화천군" },
        { code: "4280", name: "양구군" },
        { code: "4281", name: "인제군" },
        { code: "4282", name: "고성군" },
        { code: "4283", name: "양양군" },
      ],
    },
    {
      city: "충청북도",
      si: [
        { code: "4311", name: "청주시" },
        { code: "4313", name: "충주시" },
        { code: "4315", name: "제천시" },
        { code: "4372", name: "보은군" },
        { code: "4373", name: "옥천군" },
        { code: "4374", name: "영동군" },
        { code: "4375", name: "진천군" },
        { code: "4376", name: "괴산군" },
        { code: "4377", name: "음성군" },
        { code: "4380", name: "단양군" },
      ],
    },
    {
      city: "충청남도",
      si: [
        { code: "4413", name: "천안시" },
        { code: "4415", name: "공주시" },
        { code: "4418", name: "보령시" },
        { code: "4420", name: "아산시" },
        { code: "4421", name: "서산시" },
        { code: "4423", name: "논산시" },
        { code: "4425", name: "계룡시" },
        { code: "4427", name: "당진시" },
        { code: "4471", name: "금산군" },
        { code: "4476", name: "부여군" },
        { code: "4477", name: "서천군" },
        { code: "4479", name: "청양군" },
        { code: "4480", name: "홍성군" },
        { code: "4481", name: "예산군" },
      ],
    },
    {
      city: "전라북도",
      si: [
        { code: "4511", name: "전주시" },
        { code: "4513", name: "군산시" },
        { code: "4514", name: "익산시" },
        { code: "4518", name: "정읍시" },
        { code: "4519", name: "남원시" },
        { code: "4521", name: "김제시" },
        { code: "4571", name: "완주군" },
        { code: "4572", name: "진안군" },
        { code: "4573", name: "무주군" },
        { code: "4574", name: "장수군" },
        { code: "4575", name: "임실군" },
        { code: "4577", name: "순창군" },
        { code: "4579", name: "고창군" },
        { code: "4580", name: "부안군" },
      ],
    },
    {
      city: "전라남도",
      si: [
        { code: "4611", name: "목포시" },
        { code: "4613", name: "여수시" },
        { code: "4615", name: "순천시" },
        { code: "4617", name: "나주시" },
        { code: "4623", name: "광양시" },
        { code: "4671", name: "담양군" },
        { code: "4672", name: "곡성군" },
        { code: "4673", name: "구례군" },
        { code: "4677", name: "고흥군" },
        { code: "4678", name: "보성군" },
        { code: "4679", name: "화순군" },
        { code: "4680", name: "장흥군" },
        { code: "4681", name: "강진군" },
        { code: "4682", name: "해남군" },
        { code: "4683", name: "영암군" },
        { code: "4684", name: "무안군" },
        { code: "4686", name: "함평군" },
        { code: "4687", name: "영광군" },
        { code: "4688", name: "장성군" },
        { code: "4689", name: "완도군" },
        { code: "4690", name: "진도군" },
        { code: "4691", name: "신안군" },
      ],
    },
    {
      city: "경상북도",
      si: [
        { code: "4711", name: "포항시" },
        { code: "4713", name: "경주시" },
        { code: "4715", name: "김천시" },
        { code: "4717", name: "안동시" },
        { code: "4719", name: "구미시" },
        { code: "4721", name: "영주시" },
        { code: "4723", name: "영천시" },
        { code: "4725", name: "상주시" },
        { code: "4728", name: "문경시" },
        { code: "4729", name: "경산시" },
        { code: "4772", name: "군위군" },
        { code: "4773", name: "의성군" },
        { code: "4775", name: "청송군" },
        { code: "4776", name: "영양군" },
        { code: "4777", name: "영덕군" },
        { code: "4782", name: "청도군" },
        { code: "4783", name: "고령군" },
        { code: "4784", name: "성주군" },
        { code: "4785", name: "칠곡군" },
        { code: "4790", name: "예천군" },
        { code: "4792", name: "봉화군" },
        { code: "4793", name: "울진군" },
        { code: "4794", name: "울릉군" },
      ],
    },
    {
      city: "경상남도",
      si: [
        { code: "4812", name: "창원시" },
        { code: "4817", name: "진주시" },
        { code: "4822", name: "통영시" },
        { code: "4824", name: "사천시" },
        { code: "4825", name: "김해시" },
        { code: "4827", name: "밀양시" },
        { code: "4831", name: "거제시" },
        { code: "4833", name: "양산시" },
        { code: "4872", name: "의령군" },
        { code: "4873", name: "함안군" },
        { code: "4874", name: "창녕군" },
        { code: "4882", name: "고성군" },
        { code: "4884", name: "남해군" },
        { code: "4885", name: "하동군" },
        { code: "4886", name: "산청군" },
        { code: "4887", name: "함양군" },
        { code: "4888", name: "거창군" },
        { code: "4889", name: "합천군" },
      ],
    },
    {
      city: "제주특별자치도",
      si: [
        { code: "5011", name: "제주시" },
        { code: "5013", name: "서귀포시" },
      ],
    },
  ];

  const categoriesBtnOnClick = () => {
    setCategoriesBoolean(true);
  };
  const localBtnOnClick = () => {
    if (city === "전체 지역") setCity("서울특별시");
    setCategoriesBoolean(false);
  };
  const categoriesOnClick = (value: string) => {
    setCategories(value);
  };
  type cityType = {
    city: string;
    si: Array<any>;
  };
  const cityOnClick = (value: cityType) => {
    setCity(value.city);
    setSi(value.si[0]);
  };
  const siOnClick = (value: any) => {
    console.log(value);
    setSi(value);
  };

  return (
    <>
      <SearchContainer>
        <CategoriesInput id="categories" type="checkbox" />
        <BackgroundBox htmlFor="categories">
          {categoriesBoolean ? (
            <CategoriesBox>
              <CategoriesHeader>
                <p>전체 카테고리</p>
                <label htmlFor="categories"></label>
              </CategoriesHeader>
              <CategoriesList>
                {CategoriesMenuList.map((value) => (
                  <CategoriesItem
                    key={value}
                    onClick={() => categoriesOnClick(value)}
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
                  {cityList.map((value) => (
                    <CityItem
                      key={value.city}
                      onClick={() => cityOnClick(value)}
                      active={city === value.city}
                    >
                      <CityInput id={value.city} type="radio" name="city" />
                      <CityLabel htmlFor={value.city}>
                        <span>{value.city}</span>
                      </CityLabel>
                    </CityItem>
                  ))}
                </CityList>
                <SiList>
                  {cityList[
                    [...cityList].map((value) => value.city).indexOf(city)
                  ].si.map((value: any) => (
                    <SiItem
                      key={value.name}
                      onClick={() => siOnClick(value)}
                      active={si.name === value.name}
                    >
                      <SiInput id={value.name} type="radio" name="si" />
                      <SiLabel htmlFor={value.name}>{value.name}</SiLabel>
                    </SiItem>
                  ))}
                </SiList>
              </LocalInnerBox>
            </LocalBox>
          )}
        </BackgroundBox>
        <DateAndSearchBox>
          <TodayDate />
          <SearchBox>
            <CategoriesBtn
              htmlFor="categories"
              onClick={() => categoriesBtnOnClick()}
            >
              {categories}
              <span></span>
            </CategoriesBtn>
            <LocalBtn htmlFor="categories" onClick={() => localBtnOnClick()}>
              {city}{si.name}
              <span></span>
            </LocalBtn>
            <SearchInput placeholder="검색어를 입력해주세요." />
            <SearchBtn>Search</SearchBtn>
          </SearchBox>
        </DateAndSearchBox>
        <KeyWordBox>
          <KeyWordList>
            <KeyWordItem># 분위기있는</KeyWordItem>
            <KeyWordItem># 럭셔리한</KeyWordItem>
            <KeyWordItem># 친절한</KeyWordItem>
            <KeyWordItem># 아기자기한</KeyWordItem>
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

const SearchBox = styled.div`
  flex: 2.8;
  height: 55px;
`;
const CategoriesInput = styled.input`
  display: none;
  &:checked {
    & + label {
      opacity: 1;
      visibility: visible;
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
  width: 100vw;
  height: 100%;
  background-color: rgb(216 216 216 / 48%);
`;

const CategoriesBox = styled.div`
  position: absolute;
  top: calc(50% - 7vh);
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 15px 20px 30px;
  background-color: white;
`;
const CategoriesHeader = styled.header`
  display: flex;
  justify-content: space-between;
  padding-bottom: 15px;
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
  padding: 10px 15px;
  width: 250px;
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
const CategoriesItem = styled.li`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 10px 8px;
  width: calc(50% - 20px);
  height: fit-content;
  font-size: ${({ theme }) => theme.fontSizes.small};
  cursor: pointer;
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
  span {
    margin-left: 4px;
    width: 0px;
    height: 0px;
    border-top: 9px solid #b5b5b5;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
  }
`;

const LocalBox = styled(CategoriesBox)`
  height: 640px;
  overflow-y: scroll;
`;
const LocalHeader = styled(CategoriesHeader)``;
const LocalInnerBox = styled.div`
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.11);
  border-radius: 2px;
  color: #535353;
`;
const CityList = styled.ul`
  flex-direction: column;
  width: fit-content;
  border-right: 1px solid rgba(0, 0, 0, 0.11);
`;
const CityItem = styled(CategoriesItem)<{ active: boolean }>`
  padding: 0;
  width: 130px;
  ${(props) =>
    props.active &&
    css`
      color: #0075ff;
    `}
`;
const CityInput = styled.input`
  display: none;
  &:checked {
    & + label {
      color: #0075ff;
    }
  }
`;
const CityLabel = styled.label`
  padding: 10px 8px;
  width: 100%;
  cursor: pointer;
  &:hover {
    color: #0075ff;
  }
`;
const SiList = styled(CityList)``;
const SiItem = styled(CityItem)``;
const SiInput = styled(CityInput)``;
const SiLabel = styled(CityLabel)``;

const LocalBtn = styled(CategoriesBtn)``;

const SearchInput = styled.input`
  outline: none;
  padding: 5px 10px;
  width: calc(100% - 350px);
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

const KeyWordBox = styled.div``;
const KeyWordList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
`;
const KeyWordItem = styled.li`
  margin: 0 5px;
  padding: 3px 10px;
  background-color: #d9d9d9;
  border-radius: 10px;
  font-size: 0.7rem;
  cursor: pointer;
`;

export default Search;
