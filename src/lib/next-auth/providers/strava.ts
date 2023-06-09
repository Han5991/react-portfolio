import StravaProvider from 'next-auth/providers/strava';

import {createAccount} from '@feature/Account/data';
import {IAthlete} from '@feature/Account/types';

const {STRAVA_ID, STRAVA_SECRET} = process.env;
export default StravaProvider<IAthlete>({
  clientId: STRAVA_ID,
  clientSecret: STRAVA_SECRET,
  profile: async (user, tokens) => {
    const {id, firstname, lastname, profile} = user;
    const accessToken = tokens?.access_token as string;

    await createAccount(user, accessToken);
    return {
      id: id.toString(),
      name: firstname + lastname,
      image: profile,
    };
  },
  // @ts-ignore
  style: {
    logo: 'https://seeklogo.com/images/S/strava-logo-C419D1A461-seeklogo.com.png',
    logoDark:
      'https://seeklogo.com/images/S/strava-logo-C419D1A461-seeklogo.com.png',
  },
});
