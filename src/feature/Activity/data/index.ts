import {isEmpty} from 'lodash';

import type {IActivity} from '@feature/Activity/types';
import {stravaApi} from '@lib/axios';
import {
  differenceInDays,
  formatISO,
  getDay,
  getYear,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from '@lib/date-fns';
import type {Query} from '@lib/firebase/firestore';
import {
  collection,
  db,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  where,
} from '@lib/firebase/firestore';

const saveAndReturnResults = async (id: string, allActivities: IActivity[]) => {
  const promiseResult = await Promise.allSettled(
    allActivities.map(activity => saveActivities(id, activity)),
  );
  return promiseResult.map(item =>
    item.status === 'fulfilled' ? 'ok' : 'fail',
  );
};

export const initActivities = async (
  id: string,
  accessToken: string,
  activitiesCount: number,
) => {
  const lastActivity = await getLastActivities(id);
  let rep: string[] | null = null;
  if (!lastActivity) {
    const allActivities = await allActivitiesByStrava(
      accessToken,
      activitiesCount,
    );
    rep = await saveAndReturnResults(id, allActivities);
  } else {
    const {start_date} = lastActivity[0];
    const lastStartDate = new Date(start_date);
    const allActivities = await getActivitiesAfter(
      lastStartDate.getTime() / 1000,
      accessToken,
    );
    if (!isEmpty(allActivities)) {
      rep = await saveAndReturnResults(id, allActivities);
    }
  }
  return rep;
};

export const saveActivities = async (id: string, data: IActivity) => {
  await setDoc(doc(db, 'activities', id, 'activity', data.id.toString()), data);
};

export const allActivitiesByStrava = (
  accessToken: string,
  activitiesCount: number,
) => {
  const perPage = 200;
  const totalPages = Math.ceil(activitiesCount / perPage);

  const promises = Array.from({length: totalPages}, (_, page) =>
    getActivitiesByStrava(accessToken, page + 1, perPage),
  );

  return Promise.all(promises).then(activityArrays => activityArrays.flat());
};

export const getActivitiesByStrava = async (
  accessToken: string,
  page: number,
  per_page: number = 30,
) => {
  const rep = await stravaApi.get<IActivity[]>('api/v3/athlete/activities', {
    headers: {Authorization: `Bearer ${accessToken}`},
    params: {
      page,
      per_page,
    },
  });
  return rep.data;
};

export const getThisYearActivities = async (id: string) => {
  const currentYear = getYear(new Date());
  const dataArray = Array.from({length: 365}, () => 0);

  const dataQuerySnapshot = await getDocs<IActivity>(
    query(
      collection(db, 'activities', id, 'activity'),
      where('start_date', '>=', `${currentYear}-01-01`),
    ) as Query<IActivity>,
  );

  dataQuerySnapshot.docs.forEach(docSnap => {
    const {start_date} = docSnap.data();
    const date = new Date(start_date);
    const dayOfYear = differenceInDays(date, startOfYear(date));
    dataArray[dayOfYear] = +1;
  });
  return dataArray;
};

export const getThisWeekActivities = async (id: string) => {
  const toDay = new Date();
  const weekStartDate = formatISO(startOfWeek(toDay));

  const dataQuerySnapshot = await getDocs<IActivity>(
    query(
      collection(db, 'activities', id, 'activity'),
      where('start_date', '>=', weekStartDate),
      orderBy('start_date', 'asc'),
    ) as Query<IActivity>,
  );

  const dataArray = Array.from({length: 7}, () => 0);
  dataQuerySnapshot.docs.forEach(docSnap => {
    const {start_date, distance} = docSnap.data();
    const dayOfWeek = getDay(new Date(start_date));
    dataArray[dayOfWeek] = distance / 1000;
  });

  return dataArray;
};

export const getThisMonthActivities = async (id: string) => {
  const toDay = new Date();
  const currentStartMonth = startOfMonth(toDay);
  const dataQuerySnapshot = await getDocs<IActivity>(
    query(
      collection(db, 'activities', id, 'activity'),
      where('start_date', '>=', formatISO(currentStartMonth)),
    ) as Query<IActivity>,
  );
  return dataQuerySnapshot.size;
};

export const getLastActivities = async (id: string) => {
  const dataQuerySnapshot = await getDocs<IActivity>(
    query(
      collection(db, 'activities', id, 'activity'),
      orderBy('start_date', 'desc'),
      limit(1),
    ) as Query<IActivity>,
  );
  return !dataQuerySnapshot.empty
    ? dataQuerySnapshot.docs.map(activity => activity.data())
    : null;
};

export const getActivitiesAfter = async (
  after: number,
  accessToken: string,
) => {
  const rep = await stravaApi.get<IActivity[]>('api/v3/athlete/activities', {
    headers: {Authorization: `Bearer ${accessToken}`},
    params: {
      after,
      per_page: 200,
    },
  });
  return rep.data;
};
