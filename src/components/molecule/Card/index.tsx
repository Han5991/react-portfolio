import React, {CSSProperties, FC, ReactNode, useMemo} from 'react';

import {Box, Line} from '@components/atom';
import styled, {useTheme} from '@lib/styled-components';

type CardProps = {
  size?: 'small' | 'normal' | 'large';
  header?: ReactNode;
  body?: ReactNode;
  footer?: ReactNode;
  style?: CSSProperties;
};

const Container = styled(Box)`
  flex-direction: column;
  margin-block-start: 1em;
  margin-inline-start: 0;
  margin-inline-end: 0;
`;

const Card: FC<CardProps> = props => {
  const {size: sizeProp = 'normal', footer, header, body, style} = props;
  const {color, size} = useTheme();
  const width = size.box[sizeProp];
  const CardLine = useMemo(
    () => (
      <Line type="horizontal" length={width * 0.9} color={color.content[400]} />
    ),
    [color.content, width],
  );
  return (
    <Container size={sizeProp} style={style} borderColor={color.content[400]}>
      {header ? (
        <>
          <hgroup style={{width: '95%'}}>{header}</hgroup>
          {body ? CardLine : null}
        </>
      ) : null}
      {body ? (
        <>
          <Box size={width}>{body}</Box>
          {footer ? CardLine : null}
        </>
      ) : null}
      {footer ? <Box size={width * 0.2}>{footer}</Box> : null}
    </Container>
  );
};

export default Card;
