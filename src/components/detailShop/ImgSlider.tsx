import React from "react";
import styled from "styled-components";
import Slick from "../../components/common/Slick";
import { useQuery } from "@tanstack/react-query";
import { getImg } from "../../apis/queries/storeQuery";
import { imgListType } from "./type";
import { useSearchParams } from "react-router-dom";

const ImgSlider = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const storeId = searchParams.get("storeId");
  //가게 이미지 리스트 가져오기
  const { data: imgList } = useQuery(["imgList"], () => getImg(storeId));

  return (
    <ImageSlicer>
      <DetailShopImageWrapper>
        <Slick>
          {Array.isArray(imgList) &&
            imgList.map((item: imgListType, index: number) => (
              <SliderItem key={index}>
                <img src={item.url} alt={item.url} />
              </SliderItem>
            ))}
        </Slick>
      </DetailShopImageWrapper>
    </ImageSlicer>
  );
};

const ImageSlicer = styled.div`
  display: flex;
  width: 45%;
  padding: 0 60px;
  margin: auto;
  @media (max-width: 1080px) {
    width: 100%;
    padding: 0;
  }
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
const SliderItem = styled.div`
  width: 100%;
  aspect-ratio: 16 / 10;
  img {
    margin: 0 auto;
    max-width: 99%;
    height: 100%;
  }
`;

export default ImgSlider;
