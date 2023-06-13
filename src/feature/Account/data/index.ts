import {IAthlete, IAccount, ISummaryType} from '@feature/Account/types';
import {stravaApi, AxiosRequestConfig} from '@lib/axios';
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  db,
  DocumentReference,
} from '@lib/firebase/firestore';

export const createAccount = async (params: IAthlete, accessToken: string) => {
  const summary = await getAccountActivitiesSummary(
    params.id.toString(),
    accessToken,
  );
  const setData: IAccount = {
    id: params.id.toString(),
    name: params.firstname + params.lastname,
    avatar: params.profile,
    city: params.city,
    country: params.country,
    sex: params.sex,
    weight: params.weight,
    summary,
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
  const data: AxiosRequestConfig = {
    params: {
      client_id: STRAVA_ID,
      client_secret: STRAVA_SECRET,
      code,
      grant_type: 'authorization_code',
    },
  };
  return (await stravaApi.post('oauth/token', {}, data)).data;
};

export const getAccountTokenByRefresh = async (refresh_token: string) => {
  const {STRAVA_ID, STRAVA_SECRET} = process.env;
  const data: AxiosRequestConfig = {
    params: {
      client_id: STRAVA_ID,
      client_secret: STRAVA_SECRET,
      refresh_token,
      grant_type: 'refresh_token',
    },
  };
  return (await stravaApi.post('api/v3/oauth/token', {}, data)).data;
};

export const updateToken = async (id: string) => {
  const account = await getAccount(id);
  const {access_token, expires_at, refresh_token, expires_in} =
    await getAccountTokenByRefresh(account?.token?.refresh_token as string);
  const setData = {
    token: {
      access_token,
      expires_at,
      refresh_token,
      expires_in,
    },
  };
  await updateDoc(doc(db, 'accounts', id), setData);
};

export const setToken = async (code: string, id: string) => {
  const {access_token, expires_at, refresh_token, expires_in} =
    await getAccountToken(code);
  const setData = {
    token: {
      access_token,
      expires_at,
      refresh_token,
      expires_in,
    },
  };
  await setDoc(doc(db, 'accounts', id), setData, {merge: true});
};

export const getAccountActivitiesSummary = async (
  id: string,
  accessToken: string,
) => {
  const {data} = await stravaApi.get<ISummaryType>(
    `api/v3/athletes/${id}/stats`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return {
    recent_ride_totals: data.recent_ride_totals,
    all_ride_totals: data.all_ride_totals,
    ytd_ride_totals: data.ytd_ride_totals,
  };
};
