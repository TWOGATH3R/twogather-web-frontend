import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { role } from "../../apis/types/common.type";
import { getCookie } from "../cookie/cookie";
import mypageImg from "../../assets/person-icon.svg";
import { Link } from "react-router-dom";

interface infoType {
  logoutOnClick: any;
}
const Nav = ({ logoutOnClick }: infoType) => {
  return (
    <>
      <MenuInput id="menu" type="checkbox" />
      <MenuList>
        <NavContainer>
          <MenuCheckListXBtn htmlFor="menu">X</MenuCheckListXBtn>

          <MenuCheckListMypageIcon>
            <NavLink to="/mypage/info">
              <img src={mypageImg} alt="mypage" />
            </NavLink>
          </MenuCheckListMypageIcon>

          <MenuItem>
            <NavLink to="/">Home</NavLink>
          </MenuItem>

          {localStorage.getItem("role") === role.ROLE_ADMIN ? (
            <>
              <MenuItem>
                <NavLink to="/">WaitingList</NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink to="/">ApprovedList</NavLink>
              </MenuItem>
            </>
          ) : localStorage.getItem("role") === role.ROLE_STORE_OWNER ? (
            <>
              <MenuItem>
                <NavLink to="/enrollshop">Resgistration</NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink to="/">Stores</NavLink>
              </MenuItem>
            </>
          ) : null}
        </NavContainer>

        <MenuItem>
          <LoginBox>
            {getCookie("accessToken") === undefined ? (
              <Link to="/login">Login</Link>
            ) : (
              <>
                <p onClick={() => logoutOnClick()}>logout</p>
                <Link to="/mypage/info">
                  <MypageImg src={mypageImg} alt="mypage" />
                </Link>
              </>
            )}
          </LoginBox>
        </MenuItem>
      </MenuList>
    </>
  );
};

const NavContainer = styled.nav`
  display: flex;
  width: 100%;
  @media (max-width: 880px) {
    flex-direction: column;
    justify-content: flex-start;
  }
`;

const MenuInput = styled.input`
  display: none;
  &:checked {
    & + ul {
      opacity: 1;
      right: 0;
    }
  }
`;
const MenuList = styled.ul`
  list-style: none;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  @media (max-width: 880px) {
    opacity: 0;
    position: fixed;
    z-index: 99;
    top: 0;
    right: -200px;
    flex-direction: column;
    justify-content: flex-start;
    padding: 0 15px;
    width: 200px;
    height: 100vh;
    background-color: #ffffff;
    border-left: 2px solid #d3d3d3;
    color: #707070;
    transition: all 0.5s;
  }
`;
const MenuItem = styled.li`
  margin-right: 35px;
  a {
    color: #707070;
    &:hover {
      color: #ff6262;
    }
  }
  @media (max-width: 880px) {
    margin: 0;
    padding: 10px 0;
    width: 100%;
    font-size: 1.5rem;
    cursor: pointer;
    a {
      display: block;
      width: 100%;
      color: #707070;
    }
    p {
      &:hover {
        color: #ff6262;
      }
    }
  }
`;

const MenuCheckListMypageIcon = styled(MenuItem)`
  display: none;
  text-align: center;
  img {
    width: 50%;
  }
  @media (max-width: 880px) {
    display: block;
  }
`;

const MenuCheckListXBtn = styled.label`
  padding: 10px 20px 0 0;
  display: none;
  width: 100%;
  text-align: right;
  cursor: pointer;
  @media (max-width: 880px) {
    display: block;
  }
`;

const MypageImg = styled.img`
  @media (max-width: 880px) {
    display: none;
  }
`;

const LoginBox = styled.div`
  display: flex;
  p {
    margin-right: 10px;
    cursor: pointer;
  }
`;

export default Nav;
