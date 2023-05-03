import React from "react";
import styled from "styled-components";
import LOGO from "../../img/LOGO.png";
import { NavLink, Link } from "react-router-dom";

export default function Header() {
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <LogoBox>
          <LogoImg src={LOGO} />
        </LogoBox>
        <NavContainer>
          <MenuList>
            <MenuTwoGatherTitle>TwoGather</MenuTwoGatherTitle>
            <MenuItem>
              <NavLink to="/">home</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/">Resgistration</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/">stores</NavLink>
            </MenuItem>
          </MenuList>
          <LoginBox>
            <Link to="/">Login</Link>
          </LoginBox>
        </NavContainer>
      </HeaderWrapper>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  height: 7vh;
  font-size: ${({ theme }) => theme.fontSizes.xl};

  border-bottom: 1px solid #a4a4a4;
`;
const HeaderWrapper = styled.div`
  display: flex;
  padding: 1% 10% 0 10%;
  width: 100%;
`;
const LogoBox = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.balck};
  font-weight: bold;
  margin-right: 20px;
`;
const LogoImg = styled.img``;

const NavContainer = styled.nav`
  display: flex;
  width: calc(100% - 185px);
  align-items: flex-start;
`;
const MenuList = styled.ul`
  list-style: none;
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: 100%;
`;
const MenuTwoGatherTitle = styled.span`
  margin-right: 55px;
  font-weight: bold;
`;
const MenuItem = styled.li`
  margin-right: 35px;
  a {
    color: #707070;
  }
`;

const LoginBox = styled.div`
  display: flex;
  align-items: center;
  a {
    color: #000000;
  }
`;
