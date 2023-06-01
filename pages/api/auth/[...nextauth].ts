import NextAuth, {NextAuthOptions} from '@lib/next-auth';
import StravaProvider from '@lib/next-auth/providers/strava';

export const authOptions: NextAuthOptions = {
  providers: [
    StravaProvider({
      clientId: process.env.STRAVA_ID,
      clientSecret: process.env.STRAVA_SECRET,
      // @ts-ignore
      style: {
        logo: 'https://seeklogo.com/images/S/strava-logo-C419D1A461-seeklogo.com.png',
      },
    }),
  ],
  callbacks: {
    jwt: ({token, account}) => ({...token, ...account, scope: 'read'}),
    session: ({session, token}) => ({...session, user: {...token}}),
  },
};

export default NextAuth(authOptions);
