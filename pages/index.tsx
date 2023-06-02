import type {NextPage} from 'next';
import React from 'react';

import {Box, Link, LoadingSpinner, Skeleton} from '@components/atom';
import {Button} from '@components/molecule';
import {signIn, signOut} from '@lib/next-auth/react';

const Home: NextPage = () => (
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
        signOut();
      }}>
      Sign out
    </Link>
    <LoadingSpinner />
    <Button onClick={() => console.log(1)}>
      <p>메뉴</p>
    </Button>
  </>
);

export default Home;
