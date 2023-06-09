import {withAuth} from '@lib/next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({token}) => !!token,
  },
});
