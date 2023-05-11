'use client';

import {Box} from '@components/atom';
import {SelectPropsWithoutRef} from '@lib/react-html-props';
import styled from '@lib/styled-components';

type SelectBoxProps = {} & SelectPropsWithoutRef;

const Container = styled(Box)`
  background-color: ${({theme}) => theme.color.content[100]};
`;

const SelectBox = (props: SelectBoxProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {children, style} = props;
  return <Container />;
};
export default SelectBox;
