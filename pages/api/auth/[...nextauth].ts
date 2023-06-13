import NextAuth, {NextAuthOptions} from '@lib/next-auth';
import StravaProvider from '@lib/next-auth/providers/strava';

const authOption: NextAuthOptions = {
  providers: [StravaProvider],
  callbacks: {
    jwt: ({token}) => token,
    session: ({session, token}) => ({...session, user: {...token}}),
  },
};

export default NextAuth(authOption);
