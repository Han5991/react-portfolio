import {getFirestore, collection, doc} from 'firebase/firestore';

import {initializeApp, FirebaseOptions} from '../app';

const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyDzbc8aviTZS8rSpaeLNMducWHAce9BjnA',
  authDomain: 'my-strava-5e372.firebaseapp.com',
  projectId: 'my-strava-5e372',
  storageBucket: 'my-strava-5e372.appspot.com',
  messagingSenderId: '157655976073',
  appId: '1:157655976073:web:354b8cdb2e8e41fff55e58',
  measurementId: 'G-ZF6TZ38YWS',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const customCollection = (path: string, ...pathSegments: string[]) =>
  collection(db, path, ...pathSegments);

type docPathMap = 'accounts' | 'activity';

const customDoc = (path: docPathMap, ...pathSegments: string[]) =>
  doc(db, path, ...pathSegments);

export * from 'firebase/firestore';
export {customCollection as collection, customDoc as doc};
