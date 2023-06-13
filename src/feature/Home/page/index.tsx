import type {NextPage, Metadata} from 'next';
import {useRouter} from 'next/router';
import React, {useEffect} from 'react';

import {Skeleton} from '@components/atom';
import {Avatar} from '@components/molecule';
import {dataLoadingSelector} from '@components/organism/NavBar/recoil';
import {useGetAccount} from '@feature/Account/hooks';
import {initActivities} from '@feature/Activity/data';
import {
  ThisMonthChart,
  ThisWeekChart,
  ThisYearHeatMap,
} from '@feature/Home/component';
import {useMediaQuery} from '@hooks/media';
import {useSetRecoilState} from '@lib/recoil';
import styled, {useTheme} from '@lib/styled-components';

export const metadata: Metadata = {
  title: 'My-Starter-Home',
  description: '자신만의 스트라바를 구축할 수 있어요',
};

const Container = styled.div<{isMobile: boolean}>`
  display: ${({isMobile}) => (isMobile ? 'flex' : 'grid')};
  flex-direction: ${({isMobile}) => (isMobile ? 'column' : 'row')};
  grid-template-columns: 45% 45%;
  grid-gap: 20px;
  justify-content: center;
`;

const Contents = styled.div`
  box-shadow: 0 2px 4px
    ${({theme}) => theme.color.text[700] + theme.opacity[40]};
  justify-content: center;
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Home: NextPage = () => {
  const router = useRouter();
  const {media} = useTheme();
  const isMobile = useMediaQuery(media.mobile);
  const {account} = useGetAccount();
  const setDataLoading = useSetRecoilState(dataLoadingSelector);

  useEffect(() => {
    const token = account?.token;
    if (token) {
      if ((token.expires_at + token.expires_in) * 1000 > new Date().getTime()) {
        setDataLoading(true);
        initActivities(
          account.id,
          token.access_token,
          account?.summary.recent_ride_totals.count,
        ).then(value => {
          if (value) {
            router.reload();
          }
          setDataLoading(false);
        });
      }
    } else {
      setDataLoading(false);
    }
  }, [account, router, setDataLoading]);

  return (
    <Container isMobile={isMobile}>
      <Contents>
        <User>
          {account ? <Avatar size={150} src={account.avatar} /> : null}
          <h1>{account?.name}</h1>
          <h3>성별 {account?.sex}</h3>
          <h3>도시 {account?.city}</h3>
          <h3>몸무게 {account?.weight}</h3>
        </User>
      </Contents>
      <Contents>
        {account ? <ThisWeekChart id={account?.id} /> : <Skeleton show />}
      </Contents>
      {account && !isMobile ? (
        <ThisYearHeatMap id={account?.id} />
      ) : (
        <Skeleton show />
      )}
      <Contents>
        {account ? <ThisMonthChart id={account?.id} /> : <Skeleton show />}
      </Contents>
    </Container>
  );
};

export default Home;
