import React from "react";
import styled from "styled-components";
import LOGO from "../../assets/img/LOGO.png";
import mypageImg from "../../assets/person-icon.svg";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { getCookie, removeCookie } from "../cookie/cookie";
import Swal from "sweetalert2";
import role from "../../rolePermission"

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
        navigate("/login");
        window.location.reload();
        removeCookie();
        localStorage.clear();
      }
    });
  };

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
`;
const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
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
const LogoImg = styled.img`
  margin-bottom: 3px;
`;

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
`;
