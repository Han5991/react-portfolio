import * as process from 'process';

import {IAthlete, IAccount, IStravaToken} from '@feature/Account/types';
import {stravaApi} from '@lib/axios';
import {
  doc,
  setDoc,
  getDoc,
  db,
  DocumentReference,
} from '@lib/firebase/firestore';

export const createAccount = async (params: IAthlete) => {
  const setData: IAccount = {
    id: params.id.toString(),
    name: params.firstname + params.lastname,
    avatar: params.profile,
    city: params.city,
    country: params.country,
    sex: params.sex,
    weight: params.weight,
  };
  await setDoc<IAccount>(
    doc(db, 'accounts', params.id.toString()) as DocumentReference<IAccount>,
    setData,
    {merge: true},
  );
};

export const getAccount = async (id: string) => {
  const docRef = await getDoc<IAccount>(
    doc(db, 'accounts', id) as DocumentReference<IAccount>,
  );
  return docRef.exists() ? docRef.data() : undefined;
};

export const getAccountToken = async (code: string) => {
  const {STRAVA_ID, STRAVA_SECRET} = process.env;
  const rep = await stravaApi.post<IStravaToken>('api/v3/oauth/token', {
    client_id: STRAVA_ID,
    client_secret: STRAVA_SECRET,
    code,
    grant_type: 'authorization_code',
  });
  return rep.data;
};

export const updateToken = async (code: string, scope: string, id: string) => {
  const {access_token, expires_at, refresh_token, expires_in} =
    await getAccountToken(code);
  const setData = {
    [scope]: {
      access_token,
      expires_at,
      refresh_token,
      expires_in,
    },
  };
  await setDoc(doc(db, 'accounts', id), setData, {merge: true});
};
