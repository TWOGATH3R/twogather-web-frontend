import React, { useEffect } from "react";
import styled from "styled-components";
import ShopImgInfo from "../components/detailShop/ShopInfo";
import ReviewEnroll from "../components/detailShop/ReviewEnroll";
import Reviews from "../components/detailShop/Reviews";
import { useMutation } from "@tanstack/react-query";
import { getStoreOne } from "../apis/queries/storeQuery";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  Address,
  CategoryName,
  KeywordList,
  LikeCount,
  OwnerId,
  Phone,
  StoreId,
  StoreName,
} from "../store/storeDetailAtom";
import { useSearchParams } from "react-router-dom";
import { role } from "../apis/types/common.type";

export default function DetailShop() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [storeId, setStoreId] = useRecoilState(StoreId);
  const setOwnerId = useSetRecoilState(OwnerId);
  const setAddress = useSetRecoilState(Address);
  const setKeywordList = useSetRecoilState(KeywordList);
  const setLikeCount = useSetRecoilState(LikeCount);
  const setPhone = useSetRecoilState(Phone);
  const setStoreName = useSetRecoilState(StoreName);
  const setCategory = useSetRecoilState(CategoryName);

  useEffect(() => {
    setStoreId(Number(searchParams.get("storeId")));
  }, [searchParams, setStoreId]);

  const { mutate: getStoreInfo } = useMutation(() => getStoreOne(storeId), {
    onSuccess: (res) => {
      const data = res.data;
      setOwnerId(data.ownerId);
      setAddress(data.address);
      setCategory(data.categoryName);
      setKeywordList(data.keywordList);
      setLikeCount(data.likeCount);
      setPhone(data.phone);
      setStoreId(data.storeId);
      setStoreName(data.storeName);
    },
    onError: (err) => {
      alert("존재하지 않거나 허용되지 않은 가게입니다.");
    },
  });

  useEffect(() => {
    getStoreInfo();
  }, [getStoreInfo]);

  return (
    <DetailShopContainer>
      <ShopImgInfo />
      {localStorage.getItem("role") === role.ROLE_CONSUMER ? (
        <>
          <Title>리뷰 작성하기</Title>
          <ReviewEnroll />
        </>
      ) : null}
      <Reviews />
    </DetailShopContainer>
  );
}
const DetailShopContainer = styled.div`
  height: 100%;
  width: 1440px;
  margin: 0 auto;
  padding: 5%;
  @media (max-width: 1440px) {
    width: 80%;
  }
`;
const Title = styled.h2`
  margin-top: 20px;
  color: #606060;
`;
