import React from 'react';
import styled from 'styled-components';

type Props = {
  index: number;
  startTime: string;
  onChangeStartTime: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => void;
  endTime: string;
  onChangeEndTime: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => void;
  disabled?: boolean;
};

export default function ShopTimePicker({
  endTime,
  index,
  onChangeEndTime,
  onChangeStartTime,
  startTime,
  disabled,
}: Props) {
  return (
    <ShopInputItmsBox key={index}>
      <ShopTimeInput
        style={{ width: '100%' }}
        type='time'
        value={startTime || ''}
        onChange={e => onChangeStartTime(e, index)}
        disabled={disabled}
      />
      <span className='time-wave'>~</span>
      <ShopTimeInput
        style={{ width: '100%' }}
        type='time'
        value={endTime || ''}
        onChange={e => onChangeEndTime(e, index)}
        disabled={disabled}
      />
    </ShopInputItmsBox>
  );
}

const ShopTimeInput = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.subColor1};
  outline: none;
  height: 34px;
  padding: 0 15px;
  width: 15%;
  &::placeholder {
    color: #999;
  }
`;
const ShopInputItmsBox = styled.div`
  display: flex;
  align-items: center;
`;
