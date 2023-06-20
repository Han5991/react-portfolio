import React, {useEffect} from 'react';

import {secondsToHhMmSs} from '@/utils';
import {Skeleton} from '@components/atom';
import {dataLoadingSelector} from '@components/organism/NavBar/recoil';
import {useGetAccount} from '@feature/Account/hooks';
import {ThisYearHeatMap} from '@feature/Home/component';
import {useSetRecoilState} from '@lib/recoil';
import styled from '@lib/styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SummaryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-template-rows: repeat(2, auto);
  text-align: center;
`;

const Heatmap = () => {
  const setDataLoading = useSetRecoilState(dataLoadingSelector);
  useEffect(() => {
    setDataLoading(false);
  }, [setDataLoading]);

  const {account} = useGetAccount();

  return (
    <section>
      <SummaryContainer>
        <h3>올해 운동 횟수</h3>
        <h3>올해 달린거리</h3>
        <h3>올해 획득고도</h3>
        <h3>올해 운동시간</h3>
        {account && (
          <>
            <p>{account.summary.ytd_ride_totals.count}</p>
            <p>
              {Number(account.summary.ytd_ride_totals.distance * 0.001).toFixed(
                2,
              )}
              km
            </p>
            <p>{account.summary.ytd_ride_totals.elevation_gain}M</p>
            <p>
              {secondsToHhMmSs(account.summary.ytd_ride_totals.moving_time)}
            </p>
          </>
        )}
      </SummaryContainer>
      <Container>
        {account ? <ThisYearHeatMap id={account?.id} /> : <Skeleton show />}
        <iframe
          style={{border: 0}}
          title="strava"
          height="454"
          width="300"
          src={`https://www.strava.com/athletes/${account?.id}/latest-rides/3f16a9a16c4acab6577b0ab4e2a375dd1c0a016a`}
        />
      </Container>
    </section>
  );
};

export default Heatmap;
