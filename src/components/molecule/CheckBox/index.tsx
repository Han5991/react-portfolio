'use client';

import {InputPropsWithoutRef} from '@lib/react-html-props';
import styled, {useTheme} from '@lib/styled-components';

type CheckBoxProps = {
  size?: 'large' | 'normal' | 'small' | number;
} & Omit<InputPropsWithoutRef, 'type' | 'size'>;

const HCheckBox = styled.input<{size: number}>`
  height: ${({size}) => size}px;
  width: ${({size}) => size}px;
`;

const CheckBox = (props: CheckBoxProps) => {
  const theme = useTheme();
  const {size: sizeProp = 'small', style, ...restProps} = props;
  const size =
    typeof sizeProp === 'number' ? sizeProp : theme.size.icon[sizeProp];
  return (
    <HCheckBox
      type="checkbox"
      size={size}
      style={style}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
    />
  );
};

export default CheckBox;
