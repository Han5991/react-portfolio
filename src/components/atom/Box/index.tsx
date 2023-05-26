import React, {useMemo, ComponentPropsWithoutRef} from 'react';

import styled, {useTheme, CSSProperties} from '@lib/styled-components';

type DivProps = ComponentPropsWithoutRef<'div'>;

type BoxProps = {
  size?: 'large' | 'normal' | 'small' | number;
  type?: 'circle' | 'rectangle' | 'square' | 'chip';
  borderColor?: string;
  backgroundColor?: string;
} & DivProps;

const Container = styled.div<DivProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({theme}) => theme.color.content[100]};
  }

  &:active {
    background-color: ${({theme}) => theme.color.content[300]};
  }
`;

const Box = (props: BoxProps) => {
  const theme = useTheme();
  const {
    children,
    style: styleProp,
    size: sizeProp = 'large',
    type = 'rectangle',
    borderColor,
    backgroundColor,
    ...restProps
  } = props;
  const style: CSSProperties = useMemo(() => {
    const size =
      typeof sizeProp === 'number' ? sizeProp : theme.size.box[sizeProp];
    const borderRadius =
      type === 'circle' || type === 'chip' ? size : theme.size['1.5'];
    const aspectRatio = type === 'circle' || type === 'square' ? 1 : undefined;
    return {
      height: size,
      minWidth: size,
      borderRadius,
      aspectRatio,
      backgroundColor,
      border: borderColor ? `1px solid ${borderColor}` : '',
      ...styleProp,
    };
  }, [sizeProp, type, borderColor, backgroundColor, styleProp, theme]);
  return (
    <Container
      style={style}
      data-testid="@box/container"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}>
      {children}
    </Container>
  );
};

export default Box;
