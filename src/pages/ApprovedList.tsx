import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Pagenation from "../components/common/Pagenation";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getPendingListResponse } from "../apis/types/admin.type";
import { getPendingList } from "../apis/queries/adminQuery";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

const ApprovedList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [page, setPage] = useState(0);

  const [list, setList] = useState<getPendingListResponse>();
  //승인 대기중인 가게 리스트
  const { mutate: getApproved } = useMutation(
    () => getPendingList("APPROVED", String(page)),
    {
      onSuccess: (res) => {
        setList(res);
      },
      onError: (err: AxiosError<any>) => {
        alert(err.response?.data.message || "알 수 없는 에러가 발생했습니다.");
      },
    }
  );

  //onChange
  const pageOnChange = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    navigate(`/approvedList/?pagenum=${page}`);
    getApproved();
  }, [getApproved, navigate, page]);

  useEffect(() => {
    setPage(Number(searchParams.get("pagenum")));
  }, []);

  return (
    <Container>
      <StoreList>
        {list?.data.map((value, index) => (
          <StoreItem key={index}>
            <Link
              to={`/editenrollshop/contents/?storeId=${value.storeId}&role=admin`}
            >
              <Image src={value.storeImageUrl} />
            </Link>
            <InfoItem>
              <Header>
                <Name>{value.storeName}</Name>
              </Header>
              <BottomBox>
                <BottomInfoBox>
                  <InfoText>{value.phone}</InfoText>
                  <InfoText>{value.address}</InfoText>
                </BottomInfoBox>
              </BottomBox>
            </InfoItem>
          </StoreItem>
        ))}
      </StoreList>
      {list && (
        <Pagenation
          page={page}
          pageOnChange={pageOnChange}
          totalCount={list?.totalElements}
        />
      )}
    </Container>
  );
};

const Container = styled.section`
  padding: 5% 15%;
`;

const StoreList = styled.ul`
  list-style: none;
`;
const StoreItem = styled.li`
  display: flex;
  padding: 33px 41px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  margin-bottom: 53px;
  a {
  }
`;

const Image = styled.img`
  background-color: yellow;
  margin-right: 28px;
  width: 310px;
  height: 195px;
`;
const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  flex-grow: 1;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;
const Name = styled.div`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
`;

const InfoText = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
`;

const BottomBox = styled.div`
  display: flex;
  height: 50%;
  justify-content: space-between;
  flex-direction: column;
`;
const BottomInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default ApprovedList;
