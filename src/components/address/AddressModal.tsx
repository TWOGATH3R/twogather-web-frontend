import DaumPostcode from "react-daum-postcode";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { address } from "../../store/addressAtom";
import { visibleAddress } from "../../store/addressAtom";

export default function AddressModal() {
  const setStoreAddress = useSetRecoilState(address);
  const setStoreVisibleAddress = useSetRecoilState(visibleAddress);
  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setStoreAddress(fullAddress);
    setStoreVisibleAddress(false);
  };
  return (
    <Modal>
      <ModalCloseWrapper>
        <ModalCloseButton onClick={() => setStoreVisibleAddress(false)}>
          x
        </ModalCloseButton>
      </ModalCloseWrapper>
      <DaumPostcode onComplete={handleComplete} />
    </Modal>
  );
}

const Modal = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 5;
`;
const ModalCloseWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
const ModalCloseButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: white;
  border: none;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
`;
