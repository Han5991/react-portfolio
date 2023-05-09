import {InputPropsWithoutRef} from '@lib/react-html-props';
import styled from '@lib/styled-components';

type InputProps = {} & InputPropsWithoutRef;

const HInput = styled.input`
  border: 1px solid ${({theme}) => theme.color.content[700]};
  border-radius: 4px;
`;

const Input = (props: InputProps) => {
  const {children, ...restProps} = props;

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <HInput {...restProps}>{children}</HInput>
  );
};

export default Input;
