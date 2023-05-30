import React from 'react';

import styled from '@lib/styled-components';

type LineProps = {
  type: 'horizontal' | 'vertical';
  length: number;
};

const HorizontalLine = styled.div<Pick<LineProps, 'length'>>`
  width: ${({length}) => length}px;
  height: ${({theme}) => theme.size.px};
  background-color: ${({theme}) => theme.color.content[800]};
`;

const VerticalLine = styled.div<Pick<LineProps, 'length'>>`
  width: ${({theme}) => theme.size.px};
  height: ${({length}) => length}px;
  background-color: ${({theme}) => theme.color.content[800]};
`;

const Line = (props: LineProps) => {
  const {type, length} = props;
  return type === 'horizontal' ? (
    <HorizontalLine length={length} />
  ) : (
    <VerticalLine length={length} />
  );
};

export default Line;
