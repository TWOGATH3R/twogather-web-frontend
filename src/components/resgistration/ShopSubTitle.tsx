import React from 'react';
import styled from 'styled-components';

type Props = {
  children: React.ReactNode;
};

export default function ShopSubTitle({ children }: Props) {
  return (
    <ShopInnerOutlineTitleWrapper>
      <ShopInnerOutlineBigTitle>
        {children} <span>*</span>
      </ShopInnerOutlineBigTitle>
    </ShopInnerOutlineTitleWrapper>
  );
}
const ShopInnerOutlineTitleWrapper = styled.div`
  padding: 1% 0;
`;
const ShopInnerOutlineBigTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: bold;
  span {
    color: #ff4f4f;
    font-weight: bold;
    margin-left: -5px;
  }
`;
