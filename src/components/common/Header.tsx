import React from "react";
import styled from "styled-components";
import LOGO from "../../assets/img/LOGO.png";
import mypageImg from "../../assets/person-icon.svg";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { getCookie, removeCookie } from "../cookie/cookie";
import Swal from "sweetalert2";
import { role } from "../../apis/types/common.type";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Header() {
  const navigate = useNavigate();

  const logoutOnClick = () => {
    Swal.fire({
      title: "로그아웃 하시겠습니까?",
      confirmButtonColor: "#0075FF",
      cancelButtonColor: "#738598",
      showCancelButton: true,
      confirmButtonText: "로그아웃",
      cancelButtonText: "돌아가기",
      padding: "3em",
    }).then((result) => {
      if (result.isConfirmed) {
        removeCookie();
        window.location.reload();
      }
    });
  };

  return (
    <HeaderContainer>
      <MenuInput id="menu" type="checkbox" />
      <MenuCheckList>
        <MenuCheckListXBtn htmlFor="menu">X</MenuCheckListXBtn>
        {getCookie("accessToken") === undefined ? (
          <MenuCheckItem>
            <Link to="/login">Login</Link>
          </MenuCheckItem>
        ) : (
          <>
            <MenuCheckListMypageIcon>
              <Link to="/mypage/info">
                <img src={mypageImg} alt="mypage" />
              </Link>
            </MenuCheckListMypageIcon>
            <MenuCheckItem>
              <Link to="/" onClick={() => logoutOnClick()}>
                logout
              </Link>
            </MenuCheckItem>
          </>
        )}
        <MenuCheckItem>
          <NavLink to="/">Home</NavLink>
        </MenuCheckItem>
        {localStorage.getItem("role") === role.ROLE_STORE_OWNER ? (
          <>
            <MenuCheckItem>
              <NavLink to="/enrollshop">Resgistration</NavLink>
            </MenuCheckItem>
            <MenuCheckItem>
              <NavLink to="/">Stores</NavLink>
            </MenuCheckItem>
          </>
        ) : null}
      </MenuCheckList>
      <HeaderWrapper>
        <LogoBox>
          <LogoImg src={LOGO} />
        </LogoBox>
        <NavContainer>
          <MenuList>
            <MenuTwoGatherTitle>TwoGather</MenuTwoGatherTitle>
            <MenuItem>
              <NavLink to="/">Home</NavLink>
            </MenuItem>
            {localStorage.getItem("role") === role.ROLE_STORE_OWNER ? (
              <>
                <MenuItem>
                  <NavLink to="/enrollshop">Resgistration</NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink to="/">Stores</NavLink>
                </MenuItem>
              </>
            ) : null}
          </MenuList>
          <LoginBox>
            {getCookie("accessToken") === undefined ? (
              <Link to="/login">Login</Link>
            ) : (
              <>
                <Link to="/" onClick={() => logoutOnClick()}>
                  logout
                </Link>
                <Link to="/mypage/info">
                  <img src={mypageImg} alt="mypage" />
                </Link>
              </>
            )}
            <MenuBox>
              <MenuBtn htmlFor="menu">
                <MenuBtnIcon />
              </MenuBtn>
            </MenuBox>
          </LoginBox>
        </NavContainer>
      </HeaderWrapper>
    </HeaderContainer>
  );
}

const MenuBox = styled.div``;
const MenuInput = styled.input`
  display: none;
  &:checked {
    & + ul {
      display: block;
      right: 0;
    }
  }
`;
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
const MenuCheckList = styled.ul`
  position: absolute;
  z-index: 99;
  top: 0;
  right: -200px;
  display: none;
  list-style: none;
  width: 200px;
  height: 100%;
  background-color: #ffffff;
  border-left: 2px solid #d3d3d3;
`;
const MenuCheckItem = styled.li`
  padding: 15px 20px;
  font-size: 1.5rem;
  cursor: pointer;
  &:hover {
    a {
      color: #ff6262;
    }
  }
  a {
    color: #707070;
  }
`;
const MenuCheckListXBtn = styled.label`
  display: block;
  padding: 20px 25px 10px 25px;
  text-align: right;
  cursor: pointer;
`;
const MenuCheckListMypageIcon = styled(MenuCheckItem)`
  text-align: center;
  img {
    width: 50%;
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
const MenuList = styled.ul`
  list-style: none;
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  @media (max-width: 880px) {
    display: inline;
    width: fit-content;
    span {
      margin: 0;
    }
    a {
      display: none;
    }
  }
`;
const MenuTwoGatherTitle = styled.span`
  margin-right: 55px;
  font-weight: bold;
`;
const MenuItem = styled.li`
  margin-right: 35px;
  a {
    color: #707070;
    &:hover {
      color: #ff6262;
    }
  }
`;

const LoginBox = styled.div`
  display: flex;
  align-items: flex-start;
  a {
    margin-right: 10px;
    color: #000000;
  }
  @media (max-width: 880px) {
    a {
      display: none;
    }
  }
`;
