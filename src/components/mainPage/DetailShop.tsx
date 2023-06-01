import React from "react";
import styled from "styled-components";
import Slick from "../common/Slick";

interface itemsProps {
  item: string;
  name: string;
}

const SliderItem = styled.div`
  width: 100%;
  img {
    max-width: 100%;
    height: auto;
  }
`;
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
export default function DetailShop() {
  return (
    <DetailShopContainer>
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
        <DetailShopInfoWrapper></DetailShopInfoWrapper>
      </DetailShopWrapper>
    </DetailShopContainer>
  );
}
const DetailShopContainer = styled.div`
  height: 100%;
  padding: 5%;
  border: 1px solid black;
`;

const DetailShopWrapper = styled.div`
  border: 1px solid red;
  display: flex;
`;
const DetailShopImageWrapper = styled.div`
  border: 1px solid green;
  width: 40%;
`;
const DetailShopInfoWrapper = styled.div`
  width: 100%;
  border: 1px solid blue;
`;
