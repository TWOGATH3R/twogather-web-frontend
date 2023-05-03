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
          TwoGather
        </LogoBox>
        <NavContainer>
          <MenuList>
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
  justify-content: center;
  height: 7vh;
  font-size: ${({ theme }) => theme.fontSizes.xxl};
`;
const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 1440px;
`;
const LogoBox = styled.div`
  display: flex;
  align-items: center;
  width: 185px;
  color: ${({ theme }) => theme.colors.balck};
  font-weight: bold;
`;
const LogoImg = styled.img``;

const NavContainer = styled.nav`
  display: flex;
  width: calc(100% - 185px);
`;
const MenuList = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
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
