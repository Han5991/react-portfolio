import type {Athlete} from '@feature/User/types';
import type {JWT} from '@lib/next-auth';

declare module 'next-auth' {
  interface Session {
    user: JWT & {
      name: string;
      picture: string;
      athlete: Athlete;
      exp: number;
      iat: number;
      scope: 'read' | 'activity:read_all';
    };
  }
}
