import NLink, {LinkProps as NLinkProps} from 'next/link';
import React, {CSSProperties, ReactNode} from 'react';

import styled from '@lib/styled-components';

type LinkProps = {children?: ReactNode; style?: CSSProperties} & NLinkProps;

const SLink = styled(NLink)`
  text-decoration: none;
  color: ${({theme}) => theme.color.text[700]};

  &:hover {
    color: ${({theme}) => theme.color.text[600]};
  }
` as typeof NLink;

const Link = (props: LinkProps) => {
  const {children, ...restProps} = props;
  return (
    <SLink
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}>
      {children}
    </SLink>
  );
};

export default Link;
