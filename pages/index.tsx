import type {GetServerSideProps, NextPage} from 'next';

import {Box, Image, Link, LoadingSpinner} from '@components/atom';
import {Button} from '@components/molecule';
import {getDocs, query, collection} from '@lib/firebase/firestore';
import {getToken} from '@lib/next-auth/jwt';
import {signIn, signOut} from '@lib/next-auth/react';
import {useQuery} from '@lib/react-query';
import {useTheme} from '@lib/styled-components';

const Home: NextPage = props => {
  console.log(props);
  const {data, isLoading} = useQuery({
    queryKey: ['promotion'],
    queryFn: async () => {
      const querySnapshot = await getDocs(query(collection('promotion')));
      return Promise.all(querySnapshot.docs.map(doc => doc.data()));
    },
  });
  console.log(data, isLoading);

  const {color, size} = useTheme();
  return (
    <>
      <Link
        href="/api/auth/signin"
        onClick={e => {
          e.preventDefault();
          signIn().then(console.log);
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

export const getServerSideProps: GetServerSideProps = async ({req}) => ({
  props: {data: await getToken({req})},
});

export default Home;
