import React, {CSSProperties, FC, ReactNode, useMemo} from 'react';

import {Box, Line} from '@components/atom';
import styled, {useTheme} from '@lib/styled-components';

const sizeMap = {
  small: 280,
  normal: 450,
  large: 610,
} as const;

type CardProps = {
  size?: keyof typeof sizeMap;
  header?: ReactNode;
  body?: ReactNode;
  footer?: ReactNode;
  style?: CSSProperties;
};

const Container = styled(Box)`
  height: auto;
  flex-direction: column;
  box-shadow: 0 2px 4px
    ${({theme}) => theme.color.text[700] + theme.opacity[40]};
`;

const Card: FC<CardProps> = props => {
  const {size = 'normal', footer, header, body, style} = props;
  const width = sizeMap[size];
  const {color} = useTheme();
  const CardLine = useMemo(
    () => <Line type="horizontal" length={width} color={color.content[400]} />,
    [color.content, width],
  );

  return (
    <Container style={style}>
      {header ? (
        <>
          <Box>{header}</Box>
          {body ? CardLine : null}
        </>
      ) : null}
      {body ? (
        <>
          <Box>{body}</Box>
          {footer ? CardLine : null}
        </>
      ) : null}
      {footer ? <Box>{footer}</Box> : null}
    </Container>
  );
};

export default Card;
