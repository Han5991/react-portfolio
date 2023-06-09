import type {JWT} from '@lib/next-auth';

declare module 'next-auth' {
  interface Session {
    user: JWT & {
      sub: string;
      name: string;
      picture: string;
      exp: number;
      iat: number;
      scope: 'read' | 'activity:read_all';
    };
  }
}
