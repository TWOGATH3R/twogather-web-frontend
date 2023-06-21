import React from 'react';
import styled from 'styled-components';

type InputLabel = { children: React.ReactNode };

export default function InputLabel({ children }: InputLabel) {
  return <ShopTitle>{children}</ShopTitle>;
}

const ShopTitle = styled.span`
  flex: 1;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: bold;
`;
