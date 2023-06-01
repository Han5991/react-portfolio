import type {JWT, Account} from '@lib/next-auth';
import type {Athlete} from '@lib/next-auth/providers/strava';

declare module 'next-auth' {
  interface Session {
    user: JWT &
      Account & {
        name: string;
        picture: string;
        athlete: Athlete;
        exp: number;
        iat: number;
        scope: 'read' | 'activity:read_all';
      };
  }
}
