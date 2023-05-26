import React, {ComponentPropsWithoutRef} from 'react';

import styled, {useTheme} from '@lib/styled-components';

type BadgeProps = {
  size?: number;
  color?: string;
  count?: number;
} & ComponentPropsWithoutRef<'div'>;

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
