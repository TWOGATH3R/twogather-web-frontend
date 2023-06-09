import React, { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Email, Id, Name, Role } from "../store/userInfoAtom";
import {
  getAdminInfo,
  getConsumerInfo,
  getOwnerInfo,
} from "../apis/queries/myPageQuery";
import { useMutation } from "@tanstack/react-query";
import { role } from "../apis/types/common.type";
import { AxiosError } from "axios";

const MyPage = () => {
  const name = useRecoilValue(Name);

  const setNameDate = useSetRecoilState(Name);
  const setEmailDate = useSetRecoilState(Email);
  const setIdDate = useSetRecoilState(Id);

  const memberId = localStorage.getItem("memberId");
  //고객 정보 가져오기 query
  const { mutate: consumerInfoGet } = useMutation(
    () => getConsumerInfo(memberId),
    {
      onSuccess: (res) => {
        setNameDate(res.data.name);
        setEmailDate(res.data.email);
        setIdDate(res.data.username);
      },
      onError: (err: AxiosError<any>) => {
        alert(err.response?.data.message || "알 수 없는 에러가 발생했습니다.");
      },
    }
  );
  //사업자 정보 가져오기 query
  const { mutate: ownerInfoGet } = useMutation(() => getOwnerInfo(memberId), {
    onSuccess: (res) => {
      setNameDate(res.data.name);
      setEmailDate(res.data.email);
      setIdDate(res.data.username);
    },
    onError: (err: AxiosError<any>) => {
      alert(err.response?.data.message || "알 수 없는 에러가 발생했습니다.");
    },
  });
  //사업자 정보 가져오기 query
  const { mutate: adminInfoGet } = useMutation(() => getAdminInfo(memberId), {
    onSuccess: (res) => {
      setNameDate(res.data.name);
      setEmailDate(res.data.email);
      setIdDate(res.data.username);
    },
    onError: (err: AxiosError<any>) => {
      alert(err.response?.data.message || "알 수 없는 에러가 발생했습니다.");
    },
  });

  //사용자 권한
  const roleText = useRecoilValue(Role);
  useEffect(() => {
    if (roleText === role.ROLE_ADMIN) adminInfoGet();
    else if (roleText === role.ROLE_CONSUMER) consumerInfoGet();
    else if (roleText === role.ROLE_STORE_OWNER) ownerInfoGet();
  }, []);

  return (
    <MyPageContainer>
      <MyPageWrraper>
        <UserNameBox>
          <span>{name}</span>
        </UserNameBox>
        <MenuList>
          <MenuItem>
            <NavLink
              to={`/mypage/info`}
              className={({ isActive }) => (isActive ? "active" : "null")}
            >
              정보
            </NavLink>
          </MenuItem>
          {roleText === role.ROLE_ADMIN ? null : roleText ===
            role.ROLE_CONSUMER ? (
            <>
              <MenuItem>
                <NavLink to={`/mypage/review/?pagenum=1`}>리뷰</NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink to={`/mypage/like/?pagenum=1`}>좋아요</NavLink>
              </MenuItem>
            </>
          ) : (
            <MenuItem>
              <NavLink to={`/stores/?pagenum=1`}>내가게</NavLink>
            </MenuItem>
          )}
          {roleText === role.ROLE_ADMIN ? null : (
            <MenuItem>
              <NavLink to={`/mypage/withdraw`}>탈퇴</NavLink>
            </MenuItem>
          )}
        </MenuList>
        <Outlet />
      </MyPageWrraper>
    </MyPageContainer>
  );
};

const MyPageContainer = styled.div`
  padding-top: 8vh;
  height: calc(93vh - 8vh);
  font-family: "Inter";
  font-weight: 400;
`;
const MyPageWrraper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  box-sizing: border-box;
  width: 900px;
  @media (max-width: 900px) {
    width: 80%;
  }
`;

const UserNameBox = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 40px;
  width: 100%;
  border-bottom: 1px solid #4b4b4b;
  font-size: ${({ theme }) => theme.fontSizes.subTitleSize};
`;

const MenuList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  padding: 30px 0 60px;
  width: 100%;
  @media (max-width: 680px) {
    flex-direction: column;
    align-items: center;
    padding: 10px 0 60px;
  }
`;
const MenuItem = styled.li`
  margin: 0 40px;
  @media (max-width: 680px) {
    margin: 5px 0;
  }
  a {
    padding: 0 10px;
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ theme }) => theme.fontSizes.xxxl};
    &.active {
      border-bottom: 4px solid #2663ff;
    }
  }
`;

export default MyPage;
