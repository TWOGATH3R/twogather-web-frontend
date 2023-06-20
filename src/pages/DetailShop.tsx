import React from 'react';
import Review from '../components/detailShop/Review';
import styled from 'styled-components';
import ShopImgInfo from '../components/detailShop/ShopImgInfo';

export default function DetailShop() {
  return (
    <DetailShopContainer>
      <ShopImgInfo />
      <Title>리뷰작성하기</Title>
      <Review option={'enroll'} />
      {/* //todo 인자 넘기기 */}
      <OtherReviewList>
        <Title>리뷰 (54)</Title>
        <Review option={'road'} />
        {/* //todo 인자 넘기기 */}
        <PageNation> 1 2 3 4 5</PageNation>
      </OtherReviewList>
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
  color: #606060;
`;
const OtherReviewList = styled.div`
  margin: 100px auto;
`;
const PageNation = styled.div`
  margin-top: 20px;
  text-align: center;
`;
