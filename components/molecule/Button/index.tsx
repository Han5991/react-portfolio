import {useMemo} from 'react';

import {Badge, LoadingSpinner, Icon as Icons} from '@components/atom';
import {ButtonPropsWithoutRef} from '@lib/react-html-props';
import styled, {useTheme} from '@lib/styled-components';

type ButtonProps = {
  color?: 'black' | 'blue' | 'gray';
  size?: 'large' | 'normal' | 'small' | number;
  loading?: boolean;
  badge?: boolean | number;
  rightIcon?: keyof typeof Icons;
  leftIcon?: keyof typeof Icons;
} & ButtonPropsWithoutRef;

const HButton = styled.button<{
  background: string;
  color: string;
  size: number;
}>`
  display: flex;
  margin: 0;
  border: 0;
  padding: 2px 8px;
  cursor: pointer;
  background: ${({background}) => background};
  color: ${({color}) => color};
  min-width: ${({size}) => size}px;
  min-height: ${({size}) => size}px;
`;

const ButtonBadge = styled(Badge)`
  position: absolute;
  right: ${({theme}) => theme.size['2.5']}px;
`;

const Button = (props: ButtonProps) => {
  const theme = useTheme();
  const {
    type = 'button',
    color: colorProp,
    size: sizeProp = 'large',
    leftIcon,
    rightIcon,
    badge,
    disabled,
    loading,
    style,
    children,
    ...restProps
  } = props;
  const LeftIcon = leftIcon ? Icons.HamburgerButton : null;
  const RightIcon = rightIcon ? Icons[rightIcon] : null;
  const size =
    typeof sizeProp === 'number' ? sizeProp : theme.size.box[sizeProp];
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
      default:
        return {
          background: 'transparent',
          color: theme.color.black,
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
              width={size}
              height={size}
              fill={color}
            />
          ) : null}
          {children}
          {RightIcon ? (
            <RightIcon
              data-testid={`@button/box/rightIcon-${rightIcon}`}
              width={size}
              height={size}
              fill={color}
            />
          ) : null}
          {badge ? (
            <ButtonBadge
              count={typeof badge === 'number' ? badge : undefined}
            />
          ) : null}
        </>
      )}
    </HButton>
  );
};

export default Button;
