import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getPendingList, patchApproveStore } from "../apis/queries/adminQuery";
import Pagenation from "../components/common/Pagenation";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getPendingListResponse } from "../apis/types/admin.type";
import DeniedPopup from "../components/waitingList/DeniedPopup";
import Swal from "sweetalert2";
import Exception from "../components/common/Exception";

const WaitingList = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(0);

  const [storeId, setStoreId] = useState<number>(0);
  const [list, setList] = useState<getPendingListResponse>();
  const pageNum = searchParams.get("pagenum");
  //승인 대기중인 가게 리스트
  const { mutate: getPending } = useMutation(
    () => getPendingList("PENDING", pageNum),
    {
      onSuccess: (res) => {
        setList(res);
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );
  //가게 승인하기
  const { mutate: approve } = useMutation(() => patchApproveStore(storeId), {
    onSuccess: (res) => {
      getPending();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  //onChange
  const pageOnChange = (page: any) => {
    setPage(page);
  };

  //onClick
  const btnOnClick = (storeId: number) => {
    setStoreId(storeId);
  };
  const approveBtnOnClick = () => {
    Swal.fire({
      title: "승인하시겠습니까?",
      confirmButtonColor: "#0075FF",
      cancelButtonColor: "#738598",
      showCancelButton: true,
      confirmButtonText: "승인",
      cancelButtonText: "취소",
      padding: "3em",
    }).then((result) => {
      if (result.isConfirmed) {
        approve();
      }
    });
  };

  useEffect(() => {
    navigate(`/waitingList/?pagenum=${page}`);
    getPending();
  }, [getPending, navigate, page]);

  return (
    <Container>
      {list && list?.data.length < 1 ? (
        <Exception text={"대기중인 가게"} />
      ) : (
        <>
          <DeniedInput id="denied" type="checkbox" />
          <DeniedPopup storeId={storeId} />
          <StoreList>
            {list?.data.map((value, index) => (
              <StoreItem key={index}>
                <Image src={value.storeImageUrl} />
                <InfoItem>
                  <Header>
                    <Name>{value.storeName}</Name>
                  </Header>
                  <BottomBox>
                    <BottomInfoBox>
                      <InfoText>{value.phone}</InfoText>
                      <InfoText>{value.address}</InfoText>
                    </BottomInfoBox>
                    <BottomButtonBox onClick={() => btnOnClick(value.storeId)}>
                      <ModifyBtn onClick={() => approveBtnOnClick()}>
                        승인
                      </ModifyBtn>
                      <DeniedBtn htmlFor="denied">거부</DeniedBtn>
                    </BottomButtonBox>
                  </BottomBox>
                </InfoItem>
              </StoreItem>
            ))}
          </StoreList>
          {list && (
            <Pagenation
              page={page}
              pageOnChange={pageOnChange}
              totalCount={list.totalElements}
            />
          )}
        </>
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
const BottomButtonBox = styled.div`
  display: flex;
  font-size: small;
`;

const ModifyBtn = styled.button`
  box-sizing: border-box;
  margin-right: 15px;
  width: 97px;
  height: 30px;
  background: #4d74ff;
  color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  :hover {
    cursor: pointer;
  }
`;
const DeniedBtn = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin-right: 15px;
  width: 97px;
  height: 30px;
  background: #4d74ff;
  color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  :hover {
    cursor: pointer;
  }
`;

const DeniedInput = styled.input`
  display: none;
  &:checked {
    & + label {
      display: block;
    }
  }
`;

export default WaitingList;
