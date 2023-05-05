import React from 'react';

import {DivPropsWithoutRef} from '@lib/react-html-props';
import styled, {useTheme} from '@lib/styled-components';

type BadgeProps = {
  size?: number;
  color?: string;
  count?: number;
} & DivPropsWithoutRef;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({theme}) => theme.color.white};
  font-size: ${({theme}) => theme.typography.fontSizes.xs}px;
`;

const Badge = (props: BadgeProps) => {
  const theme = useTheme();
  const {
    size = theme.size['2.5'],
    color = theme.color.red[300],
    count,
    style,
  } = props;

  return (
    <Container
      data-testid="@badge/container"
      style={{
        backgroundColor: color,
        minWidth: size,
        minHeight: size,
        borderRadius: size,
        ...style,
      }}>
      {count}
    </Container>
  );
};

export default Badge;
