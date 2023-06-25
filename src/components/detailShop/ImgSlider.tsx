import React from "react";
import styled from "styled-components";
import Slick from "../../components/common/Slick";

const ImgSlider = () => {
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
  return (
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
  );
};

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
const SliderItem = styled.div`
  width: 100%;
  aspect-ratio: 16 / 10;
  img {
    max-width: 100%;
    height: 100%;
  }
`;

export default ImgSlider;
