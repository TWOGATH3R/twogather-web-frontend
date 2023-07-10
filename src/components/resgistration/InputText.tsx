import React from "react";
import styled from "styled-components";
import InputLabel from "./InputLabel";

type InputTextProps = {
  inputTxt: string;
  title: string;
  type?: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  pathName: string;
  guideMsg?: string;
  placeholder: string;
  style?: React.CSSProperties;
};

export default function InputText({
  type = "text",
  title,
  inputTxt,
  onChangeHandler,
  pathName,
  guideMsg,
  placeholder,
  style,
}: InputTextProps) {
  const isDisabled =
    pathName === "/enrollshop" || pathName === "/editenrollshop/"
      ? false
      : true;

  return (
    <ShopInnerWrapper>
      <InputLabel>{title}</InputLabel>
      <InputMessageWrapper>
        <ShopInput
          type={type}
          value={inputTxt}
          placeholder={placeholder}
          onChange={onChangeHandler}
          disabled={isDisabled}
          style={style}
        />
        <InputMessage>{inputTxt.length > 0 ? guideMsg : ""}</InputMessage>
      </InputMessageWrapper>
    </ShopInnerWrapper>
  );
}

const InputMessage = styled.span`
  margin-left: 15px;
  margin-top: 5px;
  height: 20px;
  color: ${({ theme }) => theme.colors.subColor3};
  font-size: ${({ theme }) => theme.fontSizes.small};
  @media (max-width: 680px) {
    display: none;
  }
`;
const InputMessageWrapper = styled.div`
  flex: 5;
  height: 70px;
  display: flex;
  flex-direction: column;
`;

const ShopInnerWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 2px 0;
  .time-wave {
    font-size: 23px;
  }
  input[type="checkbox"] {
    display: none;
  }
  input[type="checkbox"] + label {
    display: flex;
    width: 30px;
    height: 30px;
    border: 1px solid ${({ theme }) => theme.colors.subColor1};
    position: relative;
    align-items: center;
    justify-content: center;
  }
  input[id="checkbox1"]:checked + label::after,
  [id="checkbox2"]:checked + label::after {
    content: "✔";
    font-size: 25px;
    width: 30px;
    height: 30px;
    text-align: center;
    position: absolute;
    color: #ff8181;
    left: 0;
    top: 0;
  }
  @media (max-width: 680px) {
    flex-direction: column;
    margin-bottom: 20px;
  }
`;

const ShopInput = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.subColor1};
  outline: none;
  height: 40px;
  padding: 0 15px;

  &::placeholder {
    color: #999;
  }
`;
