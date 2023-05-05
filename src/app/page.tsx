'use client';

import React from 'react';

import {
  Badge,
  Box,
  Image,
  LoadingSpinner,
} from '@components/basicComponent/atom';
import {useTheme} from '@lib/styled-components';

const Home = () => {
  const {color, size} = useTheme();
  return (
    <>
      <Box
        size="large"
        type="square"
        borderColor={color.box[400]}
        onClick={() => console.log(1)}
        style={{position: 'relative'}}>
        <Image
          src="https://lh3.googleusercontent.com/p/AF1QipM_kOL6lEzQQvyFilmXXDBeZYmAJYgiXSbIcmO1=s1360-w1360-h1020"
          alt="1"
          fill
          style={{borderRadius: size['1.5']}}
        />
      </Box>
      <Badge count={10} />
      <LoadingSpinner />
    </>
  );
};

export default Home;
