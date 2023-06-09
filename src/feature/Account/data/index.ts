import {IAthlete, IAccount} from '@feature/Account/types';
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
  setDoc<IAccount>(
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
