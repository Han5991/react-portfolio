import {ComponentPropsWithoutRef, FC} from 'react';

import styled from '@lib/styled-components';

type LiProps = {} & ComponentPropsWithoutRef<'li'>;

const HLi = styled.li`
  display: flex;
  align-content: center;
  list-style-type: none;
`;

const Li: FC<LiProps> = props => {
  const {children, ...restProps} = props;
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <HLi {...restProps}>{children}</HLi>;
};

export default Li;
