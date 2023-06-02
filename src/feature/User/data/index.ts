import {Athlete, IUser} from '@feature/User/types';
import {doc, setDoc} from '@lib/firebase/firestore';

export const create = async (params: Athlete) => {
  const setData: IUser = {
    id: params.id.toString(),
    name: params.firstname + params.lastname,
    avatar: params.profile,
    city: params.city,
    country: params.country,
    sex: params.sex,
    weight: params.weight,
  };
  setDoc(doc('accounts', params.id.toString()), setData, {merge: true});
};
