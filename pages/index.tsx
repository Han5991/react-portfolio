import type {NextPage} from 'next';
import React from 'react';

import {Box, Image, Link, LoadingSpinner, Skeleton} from '@components/atom';
import {Button} from '@components/molecule';
import {signIn, signOut} from '@lib/next-auth/react';
import {useTheme} from '@lib/styled-components';

const Home: NextPage = () => {
  const {color, size} = useTheme();
  return (
    <>
      <Box size="small">
        <Skeleton show />
      </Box>
      <Link
        href="/api/auth/signin"
        onClick={e => {
          e.preventDefault();
          signIn();
        }}>
        Sign in
      </Link>
      <Link
        href="/api/auth/signout"
        onClick={e => {
          e.preventDefault();
          signOut().then(console.log);
        }}>
        Sign out
      </Link>
      <Box
        type="square"
        borderColor={color.box[400]}
        style={{position: 'relative'}}>
        <Image
          src="https://lh3.googleusercontent.com/p/AF1QipM_kOL6lEzQQvyFilmXXDBeZYmAJYgiXSbIcmO1=s1360-w1360-h1020"
          alt="1"
          fill
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

export default Home;
