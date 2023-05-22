import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SignUpType = () => {
  return (
    <>
      <StoreOwnerBtnBox>
        <Link to={"/signUp/storeowner"}>사업자</Link>
      </StoreOwnerBtnBox>
      <CustomerBtnBox>
        <Link to={"/signUp/customer"}>개인</Link>
      </CustomerBtnBox>
    </>
  );
};

const StoreOwnerBtnBox = styled.button`
  margin: 30px 0 25px 0;
  padding: 15px 0;
  width: 75%;
  background-color: transparent;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  transition: all 0.5s;
  a {
    color: ${({ theme }) => theme.colors.black};
    transition: all 0.5s;
  }
  &:hover {
    border: 1px solid #ff5171;
    a {
      color: #ff5171;
    }
  }
`;
const CustomerBtnBox = styled(StoreOwnerBtnBox)``;

export default SignUpType;
