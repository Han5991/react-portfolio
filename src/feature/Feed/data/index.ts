import {IActivity} from '@feature/Activity/types';
import {
  collection,
  orderBy,
  query,
  limit,
  startAfter,
  getDocs,
  db,
} from '@lib/firebase/firestore';
import type {
  Query,
  QueryConstraint,
  DocumentSnapshot,
} from '@lib/firebase/firestore';

export const PageSize = 5 as const;

export const getActivityPagination = async (
  id: string,
  lastDocument?: DocumentSnapshot<IActivity>,
) => {
  const constraints: QueryConstraint[] = [
    orderBy('start_date', 'desc'),
    limit(PageSize),
  ];
  if (lastDocument) {
    constraints.push(startAfter(lastDocument));
  }
  const collectionRef = query(
    collection(db, 'activities', id, 'activity'),
    ...constraints,
  ) as Query<IActivity>;

  return (await getDocs<IActivity>(collectionRef)).docs;
};
