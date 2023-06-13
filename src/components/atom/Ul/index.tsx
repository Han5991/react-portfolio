import {ComponentPropsWithoutRef, FC} from 'react';

import styled from '@lib/styled-components';

type UlProps = ComponentPropsWithoutRef<'ul'>;

const HUl = styled.ul`
  margin: ${({theme}) => theme.size['0']}px;
  padding: ${({theme}) => theme.size['0']}px;
`;

const Ul: FC<UlProps> = props => {
  const {children, ...restPres} = props;
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <HUl {...restPres}>{children}</HUl>;
};

export default Ul;
