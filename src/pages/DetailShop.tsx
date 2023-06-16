import React, { useState } from "react";
import Review from "../components/detailShop/Review";
import ReviewEnroll from "../components/detailShop/ReviewEnroll";
import styled from "styled-components";
import ShopImgInfo from "../components/detailShop/ShopImgInfo";

export default function DetailShop() {
  return (
    <DetailShopContainer>
      <ShopImgInfo />
      <ReviewEnroll />
      <Review />
    </DetailShopContainer>
  );
}
const DetailShopContainer = styled.div`
  height: 100%;
  padding: 5%;
`;
