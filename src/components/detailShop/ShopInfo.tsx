import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdOutlineRateReview } from "react-icons/md";
import { useRecoilValue } from "recoil";
import {
  Address,
  KeywordList,
  LikeCount,
  Phone,
  StoreId,
  StoreName,
  TotalReviewCount,
} from "../../store/storeDetailAtom";
import { useMutation } from "@tanstack/react-query";
import {
  deleteLike,
  getMenuList,
  getOpenHour,
  postLike,
} from "../../apis/queries/storeQuery";
import { menuListStateType, openHourType } from "./type";
import { getMyLikeList } from "../../apis/queries/myPageQuery";
import { getCookie } from "../cookie/cookie";
import ImgSlider from "./ImgSlider";
import { role } from "../../apis/types/common.type";

const ShopInfo = () => {
  const storeId = useRecoilValue(StoreId);
  const address = useRecoilValue(Address);
  const keywordList = useRecoilValue(KeywordList);
  const likeCount = useRecoilValue(LikeCount);
  const phone = useRecoilValue(Phone);
  const storeName = useRecoilValue(StoreName);

  const totalReviewCount = useRecoilValue(TotalReviewCount);

  const [checkDay, setCheckDay] = useState({ ko: "월", en: "MONDAY" });

  const [openHour, setOpenHour] = useState([]);

  const [startTime, setStartTime] = useState<string | undefined>();
  const [endTime, setEndTime] = useState<string | undefined>();
  const [breakStartTime, setBreakStartTime] = useState<string | undefined>();
  const [breakEndTime, setBreakEndTime] = useState<string | undefined>();

  const [likeBoolean, setLikeBoolean] = useState<boolean>(false);

  const [menuList, setMenuList] = useState<menuListStateType[]>([]);

  const memberId = localStorage.getItem("memberId");

  //가게의 영업시간 정보 가져오기
  const { mutate: getOpenHourList } = useMutation(() => getOpenHour(storeId), {
    onSuccess: (res) => {
      setOpenHour(res.data);
      const data: openHourType = res.data[0];
      setStartTime(data.startTime);
      setEndTime(data.endTime);
      setBreakStartTime(data.breakStartTime);
      setBreakEndTime(data.breakEndTime);
    },
    onError: (err: any) => {
      console.log(err.response.data.message);
    },
  });
  //가게의 메뉴 정보 가져오기
  const { mutate: getMenu } = useMutation(() => getMenuList(storeId), {
    onSuccess: (res) => {
      setMenuList(res.data);
    },
    onError: (err: any) => {
      console.log(err.response.data.message);
    },
  });
  //고객이 좋아요 누른 가게 리스트 가져오기
  const { mutate: getLikeList } = useMutation(() => getMyLikeList(memberId), {
    onSuccess: (res) => {
      setLikeBoolean(res.data.map((value) => value.storeId).includes(storeId));
    },
  });
  //좋아요 누르기
  const { mutate: saveLike } = useMutation(() => postLike(storeId, memberId), {
    onError: (err: any) => {
      console.log(err.response.data.message);
    },
  });
  //좋아요 해제
  const { mutate: likeDelete } = useMutation(
    () => deleteLike(storeId, memberId),
    {
      onError: (err: any) => {
        console.log(err.response.data.message);
      },
    }
  );

  useEffect(() => {
    getOpenHourList();
    getMenu();
    if (getCookie("accessToken") !== undefined) getLikeList();
  }, []);

  const dayList = [
    { ko: "월", en: "MONDAY" },
    { ko: "화", en: "TUESDAY" },
    { ko: "수", en: "WEDNESDAY" },
    { ko: "목", en: "THURSDAY" },
    { ko: "금", en: "FRIDAY" },
    { ko: "토", en: "SATURDAY" },
    { ko: "일", en: "SUNDAY" },
  ];

  //onClick
  const dayOnClick = (ko: string, en: string) => {
    const index = openHour.map((value: any) => value.dayOfWeek).indexOf(en);
    const data: openHourType = openHour[index];
    if (data !== undefined) {
      setCheckDay({ ko: ko, en: en });
      setStartTime(data.startTime);
      setEndTime(data.endTime);
      setBreakStartTime(data.breakStartTime);
      setBreakEndTime(data.breakEndTime);
    } else alert("등록된 영업시간이 없는 요일 입니다");
  };
  const heartOnClick = () => {
    if (localStorage.getItem("role") === role.ROLE_CONSUMER) {
      if (getCookie("accessToken") !== undefined) {
        setLikeBoolean(!likeBoolean);
        if (!likeBoolean) saveLike();
        else likeDelete();
      } else alert("일반 고객 로그인 후 좋아요가 가능합니다");
    } else alert("일반 고객 로그인 후 좋아요가 가능합니다");
  };

  return (
    <DetailShopWrapper>
      <MenuPopUpInput type="checkbox" id="menuPopUp" />
      <BackgroundBox htmlFor="menuPopUp">
        <MenuPopUp>
          <p>메뉴</p>
          <MenuPopUpList>
            {menuList.map((value) => (
              <MenuPopUpItem key={value.name}>
                <span>{value.name}</span>
                <span>{value.price}원</span>
              </MenuPopUpItem>
            ))}
          </MenuPopUpList>
        </MenuPopUp>
      </BackgroundBox>
      <ImgSlider />
      <DetailShopInfoWrapper>
        <DetailShopInfoTitleWrapper>
          <DetailShopInfoTitle>{storeName}</DetailShopInfoTitle>
          <DetailShopInfoRating>4.2</DetailShopInfoRating>
          <HeartBox onClick={() => heartOnClick()}>
            {likeBoolean ? <FillHeart /> : <OutlineHeart />}
          </HeartBox>
        </DetailShopInfoTitleWrapper>
        <ReviewHeartCountBox>
          <ReviewCountBox>
            <ReviewCount />
            <span>{totalReviewCount}</span>
          </ReviewCountBox>
          <HeartCountBox>
            <HeartCount />
            <span>{likeCount}</span>
          </HeartCountBox>
        </ReviewHeartCountBox>
        <DetailInfoBox>
          <AddressBox>
            <span>주소</span>
            <p>{address}</p>
          </AddressBox>
          <PhoneBox>
            <span>전화</span>
            <p>{phone}</p>
          </PhoneBox>
          <DayList>
            {dayList.map((value) => (
              <DayItem
                key={value.ko}
                active={checkDay.ko === value.ko}
                onClick={() => dayOnClick(value.ko, value.en)}
              >
                {value.ko}
              </DayItem>
            ))}
          </DayList>
          <OpenTimeBox>
            <span>영업시간</span>
            <p>
              {startTime} ~ {endTime}
            </p>
          </OpenTimeBox>
          <BreakTimeBox>
            <span>브레이크 타임</span>
            <p>
              {breakStartTime} ~ {breakEndTime}
            </p>
          </BreakTimeBox>
          <MenuBox>
            <span>메뉴</span>
            <MenuList>
              {menuList &&
                menuList.slice(0, 5).map((value) => (
                  <MenuItem key={value.name}>
                    <span>{value.name}</span>
                    <span>{value.price}원</span>
                  </MenuItem>
                ))}
              {menuList.length > 5 ? (
                <SeeMoreBtnBox>
                  <SeeMoreBtn htmlFor="menuPopUp">더보기</SeeMoreBtn>
                </SeeMoreBtnBox>
              ) : null}
            </MenuList>
          </MenuBox>
        </DetailInfoBox>
      </DetailShopInfoWrapper>
    </DetailShopWrapper>
  );
};

const DetailShopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 1080px) {
    flex-direction: column;
  }
`;
const DetailShopInfoWrapper = styled.div`
  width: 55%;
  @media (max-width: 1080px) {
    width: 100%;
  }
`;
const DetailShopInfoTitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const DetailShopInfoTitle = styled.span`
  margin-right: 10px;
  font-size: 24px;
  font-weight: bold;
`;
const DetailShopInfoRating = styled.span`
  margin-right: 10px;
  font-size: 23px;
  color: ${({ theme }) => theme.colors.subColor3};
  font-weight: bold;
`;

const ReviewHeartCountBox = styled.div`
  display: flex;
  padding: 10px 0 10px 0;
`;
const ReviewCountBox = styled.div`
  display: flex;
  margin-right: 20px;
  min-width: 50px;
  span {
    margin-top: -3px;
    margin-left: 3px;
    color: #a5a5a5;
  }
`;
const HeartCountBox = styled(ReviewCountBox)``;

const DetailInfoBox = styled.div`
  padding: 15px;
  border: 2.4px solid #ececec;
  color: #606060;
`;
const AddressBox = styled.div`
  display: flex;
  padding-bottom: 15px;
  span {
    width: 120px;
  }
`;
const PhoneBox = styled(AddressBox)``;
const OpenTimeBox = styled(AddressBox)``;
const BreakTimeBox = styled(AddressBox)``;

const MenuBox = styled(AddressBox)``;
const MenuList = styled.ul`
  list-style: none;
  width: 50%;
`;
const MenuItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  padding-bottom: 3px;
  border-bottom: 1px solid #cccccc;
  span {
    width: auto;
  }
`;
const SeeMoreBtnBox = styled.div`
  float: right;
`;
const SeeMoreBtn = styled.label`
  margin-top: 10px;
  padding: 3px 10px;
  background: #f0f0f0;
  outline: none;
  border: 1px solid rgba(96, 96, 96, 0.1);
  border-radius: 2px;
  cursor: pointer;
`;

const BackgroundBox = styled.label`
  position: absolute;
  z-index: 998;
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
const MenuPopUpInput = styled.input`
  display: none;
  &:checked {
    & + label {
      opacity: 1;
      visibility: visible;
      div {
        display: block;
      }
    }
  }
`;
const MenuPopUp = styled.div`
  display: none;
  position: sticky;
  z-index: 999;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  padding: 40px 40px 80px 40px;
  width: 500px;
  background-color: white;
  p {
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 2px solid #cccccc;
    font-size: ${({ theme }) => theme.fontSizes.xxl};
  }
`;
const MenuPopUpList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
`;
const MenuPopUpItem = styled(MenuItem)`
  width: 45%;
`;

const DayList = styled.ul`
  list-style: none;
  display: flex;
  padding-bottom: 15px;
`;
const DayItem = styled.li<{ active: boolean }>`
  margin-right: 10px;
  padding: 8px 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  cursor: pointer;
  ${(props) =>
    props.active &&
    css`
      background-color: #0a3fff;
      color: white;
    `}
`;

const HeartBox = styled.div`
  display: flex;
  cursor: pointer;
`;
const FillHeart = styled(AiFillHeart)`
  color: ${({ theme }) => theme.colors.yellow};
  font-size: 1.6rem;
`;
const OutlineHeart = styled(AiOutlineHeart)`
  color: #bababa;
  font-size: 1.6rem;
`;
const ReviewCount = styled(MdOutlineRateReview)`
  color: #bababa;
  font-size: 1.3rem;
`;
const HeartCount = styled(OutlineHeart)`
  font-size: 1.3rem;
`;

export default ShopInfo;
