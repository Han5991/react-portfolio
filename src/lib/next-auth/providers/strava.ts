import StravaProvider from 'next-auth/providers/strava';

import {create} from '@feature/User/data';
import {Athlete} from '@feature/User/types';

const {STRAVA_ID, STRAVA_SECRET} = process.env;

export default StravaProvider<Athlete>({
  clientId: STRAVA_ID,
  clientSecret: STRAVA_SECRET,
  profile: async user => {
    const {id, firstname, lastname, profile} = user;
    await create(user);
    return {
      id: id.toString(),
      name: firstname + lastname,
      image: profile,
    };
  },
  // @ts-ignore
  style: {
    logo: 'https://seeklogo.com/images/S/strava-logo-C419D1A461-seeklogo.com.png',
  },
});
