import {getFirestore} from '@firebase/firestore';
import {initializeApp} from 'firebase/app';
import {collection, getDocs, query, where, orderBy} from 'firebase/firestore';
import React, {useEffect} from 'react';

import {Box, Image, LoadingSpinner} from '@components/atom';
import {Button} from '@components/molecule';
import {useTheme} from '@lib/styled-components';

const Home = () => {
  const {color, size} = useTheme();

  useEffect(() => {
    const firebaseConfig = {
      apiKey: 'AIzaSyCG4K72fSes1zjUxie3WrcnNEJPANOmGoA',
      authDomain: 'peeps-business.firebaseapp.com',
      databaseURL: 'https://peeps-business-default-rtdb.firebaseio.com',
      projectId: 'peeps-business',
      storageBucket: 'peeps-business.appspot.com',
      messagingSenderId: '58864711977',
      appId: '1:58864711977:web:5b3824124c060f69a31f38',
      measurementId: 'G-167LQDWY1R',
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    async function getAll() {
      const querySnapshot = await getDocs(
        query(
          collection(db, 'community'),
          orderBy('name'),
          where('deleted', '==', false),
        ),
      );
      return Promise.all(querySnapshot.docs.map(doc => doc.data()));
    }

    getAll().then(console.log);
  }, []);

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
export default Home;
