import NLink, {LinkProps as NLinkProps} from 'next/link';
import React, {CSSProperties, ReactNode} from 'react';

import {useTheme} from '@lib/styled-components';

type LinkProps = {children?: ReactNode; style?: CSSProperties} & NLinkProps;

const Link = (props: LinkProps) => {
  const {children, style, ...restProps} = props;
  const {color} = useTheme();
  return (
    <NLink
      style={{color: color.text[700], textDecoration: 'none', ...style}}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}>
      {children}
    </NLink>
  );
};

export default Link;
