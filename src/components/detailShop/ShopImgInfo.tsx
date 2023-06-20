import React, { useState } from "react";
import styled, { css } from "styled-components";
import Slick from "../../components/common/Slick";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdOutlineRateReview } from "react-icons/md";

const ShopImgInfo = () => {
  const [checkDay, setCheckDay] = useState<string>("월");

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

  const dayList = ["월", "화", "수", "목", "금", "토", "일"];

  const menuList = [
    { name: "아메리카노", price: 3000 },
    { name: "아이스크림", price: 3000 },
    { name: "오늘의 티", price: 4000 },
    { name: "누텔라 바나나 와플", price: 13000 },
    { name: "초코 와플", price: 4500 },
  ];
  
  return (
    <DetailShopWrapper>
      <DetailShopImageWrapper>
        <Slick>
          {items.map((item, index) => (
            <SliderItem key={index}>
              <img src={item.item} alt={item.name} />
            </SliderItem>
          ))}
        </Slick>
      </DetailShopImageWrapper>
      <DetailShopInfoWrapper>
        <DetailShopInfoTitleWrapper>
          <DetailShopInfoTitle>서울다이닝</DetailShopInfoTitle>
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
            <span>127</span>
          </HeartCountBox>
        </ReviewHeartCountBox>
        <DetailInfoBox>
          <AddressBox>
            <span>주소</span>
            <p>서울특별시 강남구 도산대로45길 10-4 삼경빌딩 1F</p>
          </AddressBox>
          <PhoneBox>
            <span>전화</span>
            <p>02-1234-1234</p>
          </PhoneBox>
          <DayList>
            {dayList.map((value) => (
              <DayItem key={value} active={checkDay === value}>
                {value}
              </DayItem>
            ))}
          </DayList>
          <OpenTimeBox>
            <span>영업시간</span>
            <p>09:00 ~ 16:00</p>
          </OpenTimeBox>
          <BreakTimeBox>
            <span>브레이크 타임</span>
            <p>11:00 ~ 12:00</p>
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
              <SeeMoreBtnBox>
                <SeeMoreBtn>더보기</SeeMoreBtn>
              </SeeMoreBtnBox>
            </MenuList>
          </MenuBox>
        </DetailInfoBox>
      </DetailShopInfoWrapper>
    </DetailShopWrapper>
  );
};

const DetailShopWrapper = styled.div`
  display: flex;
`;
const DetailShopImageWrapper = styled.div`
  margin-right: 60px;
  width: calc(45% - 30px);
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
