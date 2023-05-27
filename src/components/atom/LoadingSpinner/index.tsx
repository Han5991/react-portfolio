import React from 'react';

import styled, {keyframes, CSSProperties} from '@lib/styled-components';

type LoadingSpinnerProps = {size?: number; style?: CSSProperties};

const spinner = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Loading = styled.div<Pick<LoadingSpinnerProps, 'size'>>`
  width: ${({theme, size}) => size || theme.size[5]}px;
  height: ${({theme, size}) => size || theme.size[5]}px;
  border: 3px solid ${({theme}) => theme.color.text[700]};
  border-top: 3px solid ${({theme}) => theme.color.text[0]};
  border-radius: 50%;
  animation: ${spinner} 0.7s linear infinite;
`;

const LoadingSpinner = (props: LoadingSpinnerProps) => {
  const {size, style} = props;
  return <Loading size={size} style={style} data-testid="@loadingSpinner" />;
};

export default LoadingSpinner;
