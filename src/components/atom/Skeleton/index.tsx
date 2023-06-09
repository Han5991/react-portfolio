import {FC} from 'react';

import styled, {keyframes} from '@lib/styled-components';

const skeletonLoading = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const SkeletonContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #eee 25%, #f5f5f5 37%, #eee 63%);
  background-size: 100%;
  animation: ${skeletonLoading} 10s infinite linear;
`;

type SkeletonProps = {
  show: boolean;
};

const Skeleton: FC<SkeletonProps> = props => {
  const {show} = props;
  return show ? <SkeletonContainer data-testid="@Skeleton" /> : null;
};

export default Skeleton;
