import {GetServerSideProps} from 'next';

import {getAccount, updateToken} from '@feature/Account/data';
import {IAccount} from '@feature/Account/types';
import Home from '@feature/Home/page';
import {getToken} from '@lib/next-auth/jwt';

export default Home;

export const getServerSideProps: GetServerSideProps = async ({query, req}) => {
  const {code, scope} = query;
  if (typeof code === 'string' && typeof scope === 'string') {
    const token = await getToken({req});
    const newScope = scope.split(',')[1].replace(':', '_');
    const account = (await getAccount(token?.sub as string)) as IAccount;
    // @ts-ignore
    const lastUpdateTime = new Date(account[newScope].expires_at * 1000);
    if (lastUpdateTime < new Date()) {
      await updateToken(code, newScope, token?.sub as string);
    }
  }
  return {
    props: {},
  };
};
