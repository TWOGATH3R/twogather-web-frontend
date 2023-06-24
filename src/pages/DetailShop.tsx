import React from "react";
import styled from "styled-components";
import ShopImgInfo from "../components/detailShop/ShopImgInfo";
import ReviewEnroll from "../components/detailShop/ReviewEnroll";
import Reviews from "../components/detailShop/Reviews";

export default function DetailShop() {
  return (
    <DetailShopContainer>
      <ShopImgInfo />
      <Title>리뷰 작성하기</Title>
      <ReviewEnroll />
      <Title>리뷰 (54)</Title>
      <Reviews />
    </DetailShopContainer>
  );
}
const DetailShopContainer = styled.div`
  height: 100%;
  width: 1440px;
  margin: 0 auto;
  padding: 5%;
`;
const Title = styled.h2`
  margin-top: 20px;
  color: #606060;
`;
