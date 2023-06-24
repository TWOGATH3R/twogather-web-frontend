import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Slick from "../../components/common/Slick";
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
} from "../../store/storeDetailAtom";
import { useMutation } from "@tanstack/react-query";
import { getMenuList, getOpenHour } from "../../apis/queries/storeQuery";
import { openHourType } from "./type";

const ShopImgInfo = () => {
  const storeId = useRecoilValue(StoreId);
  const address = useRecoilValue(Address);
  const keywordList = useRecoilValue(KeywordList);
  const likeCount = useRecoilValue(LikeCount);
  const phone = useRecoilValue(Phone);
  const storeName = useRecoilValue(StoreName);

  const [checkDay, setCheckDay] = useState({ ko: "월", en: "MONDAY" });

  const [openHour, setOpenHour] = useState([]);

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [breakStartTime, setBreakStartTime] = useState("");
  const [breakEndTime, setBreakEndTime] = useState("");

  type menuListStateType = {
    menuId: number;
    name: string;
    price: number;
  };
  const [menuList, setMenuList] = useState<menuListStateType[]>([]);

  //query
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

  useEffect(() => {
    getOpenHourList();
    getMenu();
  }, []);

  interface itemsProps {
    item: string;
    name: string;
  }
  const items: itemsProps[] = [
    {
      item: "http://placehold.it/1200x400",
      name: "이미지01",
    },
    {
      item: "http://placehold.it/1200x400/ff0000",
      name: "이미지02",
    },
    {
      item: "http://placehold.it/1200x400/00ffff",
      name: "이미지03",
    },
  ];

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
    setCheckDay({ ko: ko, en: en });
    const index = openHour.map((value: any) => value.dayOfWeek).indexOf(en);
    const data: openHourType = openHour[index];
    setStartTime(data.startTime);
    setEndTime(data.endTime);
    setBreakStartTime(data.breakStartTime);
    setBreakEndTime(data.breakEndTime);
  };

  return (
    <DetailShopWrapper>
      <ImageSlicer>
        <DetailShopImageWrapper>
          <Slick>
            {items.map((item, index) => (
              <SliderItem key={index}>
                <img src={item.item} alt={item.name} />
              </SliderItem>
            ))}
          </Slick>
        </DetailShopImageWrapper>
      </ImageSlicer>
      <DetailShopInfoWrapper>
        <DetailShopInfoTitleWrapper>
          <DetailShopInfoTitle>{storeName}</DetailShopInfoTitle>
          <DetailShopInfoRating>4.2</DetailShopInfoRating>
          <OutlineHeart />
          <FillHeart />
        </DetailShopInfoTitleWrapper>
        <ReviewHeartCountBox>
          <ReviewCountBox>
            <ReviewCount />
            <span>54</span>
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
                menuList.map((value) => (
                  <MenuItem key={value.name}>
                    <span>{value.name}</span>
                    <span>{value.price}원</span>
                  </MenuItem>
                ))}
              {menuList.length > 5 ? (
                <SeeMoreBtnBox>
                  <SeeMoreBtn>더보기</SeeMoreBtn>
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
`;
const ImageSlicer = styled.div`
  display: flex;
  width: 45%;
  padding: 0 60px;
  margin: auto;
`;
const DetailShopImageWrapper = styled.div`
  margin: 0 auto;
  width: calc(100% - 30px);
  .slick-prev {
    left: -40px;
  }
  .slick-next {
    right: -40px;
  }
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
  }
`;
const DetailShopInfoWrapper = styled.div`
  width: 55%;
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
  justify-content: space-between;
  margin-right: 20px;
  min-width: 50px;
  span {
    margin-top: -3px;
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
const SeeMoreBtn = styled.button`
  margin-top: 10px;
  padding: 3px 10px;
  background: #f0f0f0;
  outline: none;
  border: 1px solid rgba(96, 96, 96, 0.1);
  border-radius: 2px;
  cursor: pointer;
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

const SliderItem = styled.div`
  width: 100%;
  aspect-ratio: 16 / 10;
  img {
    max-width: 100%;
    height: 100%;
  }
`;

const FillHeart = styled(AiFillHeart)`
  color: ${({ theme }) => theme.colors.yellow};
  font-size: 1.6rem;
  cursor: pointer;
`;
const OutlineHeart = styled(AiOutlineHeart)`
  color: #bababa;
  font-size: 1.6rem;
  cursor: pointer;
`;
const ReviewCount = styled(MdOutlineRateReview)`
  color: #bababa;
  font-size: 1.3rem;
`;
const HeartCount = styled(OutlineHeart)`
  font-size: 1.3rem;
`;

export default ShopImgInfo;
