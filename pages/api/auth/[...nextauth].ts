import NextAuth from '@lib/next-auth';
import StravaProvider from '@lib/next-auth/providers/strava';

export default NextAuth({
  providers: [StravaProvider],
  callbacks: {
    jwt: ({token}) => ({...token, scope: 'read'}),
    session: ({session, token}) => ({...session, user: {...token}}),
  },
});
