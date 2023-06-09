import {getAccount} from '@feature/Account/data';
import {useSession} from '@lib/next-auth/react';
import {useQuery} from '@lib/react-query';

export const useGetAccount = () => {
  const {data: session, status} = useSession();

  const {data, error, isLoading} = useQuery({
    queryKey: ['account'],
    queryFn: () => getAccount(session?.user.sub),
    enabled: status === 'authenticated',
  });

  return {
    account: data,
    error,
    isLoading,
  };
};
