import React from 'react';
import styled from 'styled-components';
import InputLabel from './InputLabel';

type InputKeywordProps = {
  inputTxt: string[];
  title: string;
  onClickHandler: React.MouseEventHandler<HTMLInputElement>;
  pathName: string;
  guideMsg?: string;
  placeholder?: string;
  visiblePopup: boolean;
  style?: React.CSSProperties;
};

export default function InputKeyword({
  inputTxt,
  title,
  onClickHandler,
  pathName,
  visiblePopup,
  placeholder,
  style,
}: InputKeywordProps) {
  return (
    <ShopInnerWrapper>
      <InputLabel>{title}</InputLabel>
      <InputMessageWrapper>
        <ShopInput
          placeholder={placeholder}
          value={inputTxt}
          onClick={onClickHandler}
          style={style}
          disabled={pathName === '/enrollshop/contents' ? true : false}
        />
        {!visiblePopup ? <InputMessage /> : null}
      </InputMessageWrapper>
    </ShopInnerWrapper>
  );
}
const InputMessageWrapper = styled.div`
  flex: 5;
  display: flex;
  flex-direction: column;
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

const ShopInnerWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 2px 0;
  .time-wave {
    font-size: 23px;
  }
  input[type='checkbox'] {
    display: none;
  }
  input[type='checkbox'] + label {
    display: flex;
    width: 30px;
    height: 30px;
    border: 1px solid ${({ theme }) => theme.colors.subColor1};
    position: relative;
    align-items: center;
    justify-content: center;
  }
  input[id='checkbox1']:checked + label::after,
  [id='checkbox2']:checked + label::after {
    content: '✔';
    font-size: 25px;
    width: 30px;
    height: 30px;
    text-align: center;
    position: absolute;
    color: #ff8181;
    left: 0;
    top: 0;
  }
`;

const InputMessage = styled.span`
  margin-left: 15px;
  margin-top: 5px;
  height: 20px;
  color: ${({ theme }) => theme.colors.subColor3};
  font-size: ${({ theme }) => theme.fontSizes.small};
`;
