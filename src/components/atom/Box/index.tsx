import React, {ComponentPropsWithoutRef, FC} from 'react';

import styled, {useTheme} from '@lib/styled-components';

type DivProps = ComponentPropsWithoutRef<'div'> & {
  borderRadius?: number;
  aspectRatio?: number;
  backgroundColor?: string;
  border?: string;
  borderColor?: string;
};

type BoxProps = {
  size?: 'large' | 'normal' | 'small' | number;
  type?: 'circle' | 'rectangle' | 'square' | 'chip';
} & DivProps;

const Container = styled.div<BoxProps>`
  width: ${({size}) => size}px;
  height: ${({size}) => size}px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({borderRadius}) => borderRadius || 0}px;
  aspect-ratio: ${({aspectRatio}) => aspectRatio};
  background-color: ${({backgroundColor}) => backgroundColor};
  border: ${({border}) => border};
`;

const Box: FC<BoxProps> = props => {
  const theme = useTheme();
  const {
    children,
    style,
    size: sizeProp = 'large',
    type = 'rectangle',
    borderColor,
    backgroundColor,
    ...restProps
  } = props;
  const size =
    typeof sizeProp === 'number' ? sizeProp : theme.size.box[sizeProp];
  const borderRadius =
    type === 'circle' || type === 'chip' ? size : theme.size['1.5'];
  const aspectRatio = type === 'circle' || type === 'square' ? 1 : undefined;

  return (
    <Container
      size={size}
      borderRadius={borderRadius}
      aspectRatio={aspectRatio}
      backgroundColor={backgroundColor}
      border={borderColor ? `1px solid ${borderColor}` : ''}
      style={style}
      data-testid="@box/container"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}>
      {children}
    </Container>
  );
};

export default Box;
