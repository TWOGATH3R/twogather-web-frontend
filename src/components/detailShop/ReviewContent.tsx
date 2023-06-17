import React from 'react';
import styled from 'styled-components';

type Props = {};

export default function ReviewContent({}: Props) {
  return (
    <div>
      <ReivewContent readOnly={true} autoFocus={false}>
        {'맛있지만 맛 없어요 귀엽지만 귀엽지 않아요 그것이 모순'}
      </ReivewContent>
    </div>
  );
}
const ReivewContent = styled.textarea`
  width: 100%;
  margin: 10px 0;
  padding: 0;
  border-width: 0px;
  margin-right: 10px;
  overflow: hidden;
  resize: none;
  :focus-visible {
    outline: none;
  }
`;
