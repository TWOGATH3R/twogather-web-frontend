import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { role } from "../../apis/types/common.type";
import { Link } from "react-router-dom";
import { getCookie } from "../cookie/cookie";
import mypageImg from "../../assets/person-icon.svg";

interface infoType {
  logoutOnClick: any;
}
const SideMenu = ({ logoutOnClick }: infoType) => {
  return (
    <>
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
    </>
  );
};

const MenuInput = styled.input`
  display: none;
  &:checked {
    & + ul {
      display: block;
      right: 0;
    }
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
    display: block;
    width: 100%;
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

export default SideMenu;
