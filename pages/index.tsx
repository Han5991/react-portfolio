import {GetServerSideProps} from 'next';

import {getAccount, setToken, updateToken} from '@feature/Account/data';
import Home from '@feature/Home/page';
import {isBefore, fromUnixTime} from '@lib/date-fns';
import {getToken} from '@lib/next-auth/jwt';

export default Home;

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
  res,
}) => {
  const {code, scope} = query;
  if (typeof code === 'string' && typeof scope === 'string') {
    const id = (await getToken({req}))?.sub as string;
    const accounts = await getAccount(id);
    if (accounts?.token) {
      const lastUpdateTime = fromUnixTime(accounts.token.expires_at);
      await updateToken(id);
      if (isBefore(lastUpdateTime, new Date())) {
        await updateToken(id);
      }
    } else {
      await setToken(code, id);
    }
    res.writeHead(302, {Location: req.url?.split('?')[0]});
    res.end();
  }
  return {
    props: {},
  };
};
