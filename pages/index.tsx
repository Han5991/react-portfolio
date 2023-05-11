import React from 'react';

import {Box, Image, LoadingSpinner} from '@components/atom';
import {Button} from '@components/molecule';
import {useTheme} from '@lib/styled-components';

const Home = () => {
  const {color, size} = useTheme();
  return (
    <Box>
      <Box
        type="square"
        borderColor={color.box[400]}
        style={{position: 'relative'}}>
        <Image
          src="https://lh3.googleusercontent.com/p/AF1QipM_kOL6lEzQQvyFilmXXDBeZYmAJYgiXSbIcmO1=s1360-w1360-h1020"
          alt="1"
          fill
          priority
          style={{borderRadius: size['1.5']}}
        />
      </Box>
      <LoadingSpinner />
      <Button leftIcon="HamburgerButton">메뉴</Button>
    </Box>
  );
};
export default Home;
