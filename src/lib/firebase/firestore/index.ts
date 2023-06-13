import {getFirestore, connectFirestoreEmulator} from 'firebase/firestore';

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
export const db = getFirestore(app);
try {
  if (process.env.NODE_ENV === 'development') {
    connectFirestoreEmulator(db, 'localhost', 8080);
  }
} catch (e) {
  // nothing
}

export * from 'firebase/firestore';
