import {useMemo, ComponentPropsWithoutRef} from 'react';

import {LoadingSpinner, Icon as Icons} from '@components/atom';
import styled, {useTheme} from '@lib/styled-components';

type ButtonProps = {
  color?: 'black' | 'blue' | 'gray' | 'red';
  size?: 'large' | 'normal' | 'small' | number;
  loading?: boolean;
  badge?: boolean | number;
  rightIcon?: keyof typeof Icons;
  leftIcon?: keyof typeof Icons;
} & ComponentPropsWithoutRef<'button'>;

const HButton = styled.button<{
  background: string;
  color: string;
  size: number;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  margin: 0;
  padding: 4px 10px;
  cursor: pointer;
  border-radius: 4px;
  background: ${({background}) => background};
  color: ${({color}) => color};
  width: ${({size}) => size * 1.8}px;
  height: ${({size}) => size}px;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  box-shadow: 0 2px 4px
    ${({theme}) => theme.color.text[700] + theme.opacity[40]};

  &:hover {
    background-color: ${({theme, background}) =>
      background + theme.opacity[80]};
  }

  &:active {
    background-color: ${({theme, background}) =>
      background + theme.opacity[90]};
  }
`;

const Button = (props: ButtonProps) => {
  const theme = useTheme();
  const {
    type = 'button',
    color: colorProp,
    size: sizeProp = 'small',
    leftIcon,
    rightIcon,
    disabled,
    loading,
    style,
    children,
    ...restProps
  } = props;

  const LeftIcon = leftIcon ? Icons[leftIcon] : null;
  const RightIcon = rightIcon ? Icons[rightIcon] : null;
  const size =
    typeof sizeProp === 'number' ? sizeProp : theme.size.button[sizeProp];
  const {background, color} = useMemo(() => {
    if (disabled)
      return {
        background: theme.color.content[400],
        color: theme.color.text[100],
      };
    switch (colorProp) {
      case 'gray':
        return {
          background: theme.color.gray[200],
          color: theme.color.text[700],
        };
      case 'blue':
        return {
          background: theme.color.blue[300],
          color: theme.color.white,
        };
      case 'black':
        return {
          background: theme.color.box[300],
          color: theme.color.white,
        };
      case 'red':
        return {
          background: theme.color.red[300],
          color: theme.color.white,
        };
      default:
        return {
          background: theme.color.content[0],
          color: theme.color.text[700],
        };
    }
  }, [disabled, colorProp, theme]);
  return (
    <HButton
      type={type}
      size={size}
      disabled={disabled || loading}
      background={background}
      color={color}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
      style={style}>
      {loading ? (
        <LoadingSpinner size={size} />
      ) : (
        <>
          {LeftIcon ? (
            <LeftIcon
              data-testid={`@button/box/leftIcon-${leftIcon}`}
              style={{marginRight: 8}}
              width={size}
              height={size}
              fill={color}
            />
          ) : null}
          {children}
          {RightIcon ? (
            <RightIcon
              data-testid={`@button/box/rightIcon-${rightIcon}`}
              style={{marginLeft: 8}}
              width={size}
              height={size}
              fill={color}
            />
          ) : null}
        </>
      )}
    </HButton>
  );
};

export default Button;
