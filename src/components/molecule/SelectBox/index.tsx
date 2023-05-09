import {Box} from '@components/atom';
import {SelectPropsWithoutRef} from '@lib/react-html-props';
import styled from '@lib/styled-components';

type SelectBoxProps = {} & SelectPropsWithoutRef;

const Container = styled(Box)`
  background-color: ${({theme}) => theme.color.content[100]};
`;

const SelectBox = (props: SelectBoxProps) => {
  const {children, style} = props;
  return (
    <Container>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <select style={style} {...props}>
        {children}
      </select>
    </Container>
  );
};
export default SelectBox;
