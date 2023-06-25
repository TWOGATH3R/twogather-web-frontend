import React, { useEffect } from "react";
import styled from "styled-components";
import ShopImgInfo from "../components/detailShop/ShopImgInfo";
import ReviewEnroll from "../components/detailShop/ReviewEnroll";
import Reviews from "../components/detailShop/Reviews";
import { useMutation } from "@tanstack/react-query";
import { getStoreOne } from "../apis/queries/storeQuery";
import { useRecoilState } from "recoil";
import {
  Address,
  CategoryName,
  KeywordList,
  LikeCount,
  Phone,
  StoreId,
  StoreName,
} from "../store/storeDetailAtom";
import { useSearchParams } from "react-router-dom";

export default function DetailShop() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [storeId, setStoreId] = useRecoilState(StoreId);
  const [address, setAddress] = useRecoilState(Address);
  const [keywordList, setKeywordList] = useRecoilState(KeywordList);
  const [likeCount, setLikeCount] = useRecoilState(LikeCount);
  const [phone, setPhone] = useRecoilState(Phone);
  const [storeName, setStoreName] = useRecoilState(StoreName);
  const [category, setCategory] = useRecoilState(CategoryName);

  useEffect(()=>{
    setStoreId(Number(searchParams.get("storeId")));
  },[])

  const { mutate: getStoreInfo } = useMutation(() => getStoreOne(storeId), {
    onSuccess: (res) => {
      const data = res.data;
      setAddress(data.address);
      setCategory(data.categoryName);
      setKeywordList(data.keywordList);
      setLikeCount(data.likeCount);
      setPhone(data.phone);
      setStoreId(data.storeId);
      setStoreName(data.storeName);
    },
    onError: (err) => {
      console.log(err)
      alert("존재하지 않거나 허용되지 않은 가게입니다.");
    },
  });

  useEffect(() => {
    getStoreInfo();
  }, [getStoreInfo]);

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
