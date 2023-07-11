import React, { useEffect } from "react";
import styled from "styled-components";
import LOGO from "../../assets/img/LOGO.png";
import { getCookie, removeCookie } from "../cookie/cookie";
import { GiHamburgerMenu } from "react-icons/gi";
import Nav from "./Nav";
import { useSetRecoilState } from "recoil";
import { MemberId } from "../../store/userInfoAtom";

export default function Header() {
  const setMemberId = useSetRecoilState(MemberId);

  useEffect(() => {
    const memberId = localStorage.getItem("memberId");
    memberId && setMemberId(Number(memberId));
    if (getCookie("accessToken") === undefined && localStorage.getItem("role"))
      console.log();
  }, []);

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <LogoBox>
          <LogoImg src={LOGO} />
        </LogoBox>
        <NavContainer>
          <MenuTwoGatherTitle>TwoGather</MenuTwoGatherTitle>
          <Nav />
        </NavContainer>
        <MenuBox>
          <MenuBtn htmlFor="menu">
            <MenuBtnIcon />
          </MenuBtn>
        </MenuBox>
      </HeaderWrapper>
    </HeaderContainer>
  );
}

const MenuBox = styled.div``;
const MenuBtn = styled.label`
  cursor: pointer;
`;
const MenuBtnIcon = styled(GiHamburgerMenu)`
  display: none;
  font-size: 2rem;
  @media (max-width: 880px) {
    display: block;
  }
`;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 7vh;
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;
const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
`;
const LogoBox = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.balck};
  font-weight: bold;
  margin-right: 20px;
`;
const LogoImg = styled.img`
  margin-bottom: 3px;
`;

const NavContainer = styled.nav`
  display: flex;
  width: calc(100% - 185px);
  align-items: flex-start;
  @media (max-width: 880px) {
    justify-content: space-between;
    width: 80%;
  }
`;
const MenuTwoGatherTitle = styled.span`
  margin-right: 55px;
  font-weight: bold;
`;
