import NextAuth, {NextAuthOptions} from '@lib/next-auth';
import StravaProvider from '@lib/next-auth/providers/strava';

export const authOptions: NextAuthOptions = {
  providers: [
    StravaProvider({
      clientId: process.env.STRAVA_ID,
      clientSecret: process.env.STRAVA_SECRET,
    }),
  ],
  callbacks: {
    async jwt({token, account}) {
      return {token, account};
    },
  },
};

export default NextAuth(authOptions);
