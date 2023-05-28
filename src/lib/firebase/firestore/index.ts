import {getFirestore, collection, doc} from 'firebase/firestore';

import {initializeApp, FirebaseOptions} from '../app';

const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyCG4K72fSes1zjUxie3WrcnNEJPANOmGoA',
  authDomain: 'peeps-business.firebaseapp.com',
  databaseURL: 'https://peeps-business-default-rtdb.firebaseio.com',
  projectId: 'peeps-business',
  storageBucket: 'peeps-business.appspot.com',
  messagingSenderId: '58864711977',
  appId: '1:58864711977:web:5b3824124c060f69a31f38',
  measurementId: 'G-167LQDWY1R',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const customCollection = (path: string, ...pathSegments: string[]) =>
  collection(db, path, ...pathSegments);

const customDoc = (path: string, ...pathSegments: string[]) =>
  doc(db, path, ...pathSegments);

export * from 'firebase/firestore';
export {customCollection as collection, customDoc as doc};
