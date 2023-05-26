'use client';

import React, {ComponentPropsWithoutRef} from 'react';

import {Box} from '@components/atom';
import styled from '@lib/styled-components';

type SelectBoxProps = {} & ComponentPropsWithoutRef<'select'>;

const Container = styled(Box)`
  background-color: ${({theme}) => theme.color.content[100]};
`;

const SelectBox = (props: SelectBoxProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {children, style} = props;
  return <Container />;
};
export default SelectBox;
