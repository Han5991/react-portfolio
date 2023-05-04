'use client';

import React from 'react';

import {Box, Icon} from '@components/basicComponent/atom';
import {useTheme} from '@lib/styled-components';

const Home = () => {
  const {color} = useTheme();
  return (
    <Box
      size="large"
      type="square"
      borderColor={color.box[400]}
      onClick={() => console.log(1)}>
      <Icon.HamburgerButton fill={color.green[100]} />
    </Box>
  );
};

export default Home;
