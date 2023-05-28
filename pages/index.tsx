import type {GetServerSideProps, NextPage} from 'next';
import React from 'react';

import {Box, Image, LoadingSpinner} from '@components/atom';
import {Button} from '@components/molecule';
import {useTheme} from '@lib/styled-components';

const Home: NextPage<{data: string}> = props => {
  const {data} = props;
  console.log(data);
  const {color, size} = useTheme();
  return (
    <>
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
      <Button onClick={() => console.log(1)}>
        <p>메뉴</p>
      </Button>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getServerSideProps: GetServerSideProps = async ({query}) =>
  // const {code} = query;
  // const url = 'https://www.strava.com/oauth/token';
  //
  // const params = {
  //   client_id: '108048',
  //   client_secret: '5d6f334d0301e956bfb89336c1ec7f7a1aa59914',
  //   code,
  //   grant_type: 'authorization_code',
  // };
  // const response = await axios.post(url, null, {params}).catch(console.log);
  ({props: {data: 'response?.data'}});

export default Home;
