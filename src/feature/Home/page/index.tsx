import type {NextPage, Metadata} from 'next';
import React, {useMemo} from 'react';

import {Avatar, Card, HeatMap} from '@components/molecule';
import {useGetAccount} from '@feature/Account/hooks';
import {useMediaQuery} from '@hooks/media';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from '@lib/chart.js';
import type {ChartOptions, ChartData} from '@lib/chart.js';
import {Bar} from '@lib/react-chartjs-2';
import styled, {useTheme} from '@lib/styled-components';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const metadata: Metadata = {
  title: 'My-Starter-Home',
  description: '자신만의 스트라바를 구축할 수 있어요',
};

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const LeftArea = styled.div<{isMobile: boolean}>`
  display: ${({isMobile}) => (isMobile ? 'none' : 'flex')};
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const RightArea = styled.div`
  display: flex;
  flex: 2;
  justify-content: center;
`;

const Home: NextPage = () => {
  const {media, color} = useTheme();
  const isMobile = useMediaQuery(media.mobile);
  const {account} = useGetAccount();
  const options = useMemo<ChartOptions>(
    () => ({
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
        title: {
          display: true,
          text: '이번주 운동 거리',
        },
      },
    }),
    [],
  );

  const data = useMemo<ChartData<'bar'>>(
    () => ({
      labels: ['일', '월', '화', '수', '목', '금', '토'],
      datasets: [
        {
          label: '거리',
          data: [46, 7.22, 48, 46, 46, 46, 46],
          backgroundColor: color.blue[200],
        },
      ],
    }),
    [color.blue],
  );

  const hitMapData = Array(365)
    .fill(0)
    .map(() => Math.floor(Math.random() * 5));

  return (
    <Container>
      <LeftArea isMobile={isMobile}>
        <Avatar size={250} src={account?.avatar as string} />
        <h2>{account?.name}</h2>
        <h3>성별 {account?.sex}</h3>
        <h3>도시 {account?.city}</h3>
        <h3>몸무게 {account?.weight}</h3>
        <Card
          style={{height: 300}}
          body={<Bar options={options} data={data} />}
        />
      </LeftArea>
      <RightArea>
        <HeatMap count={hitMapData} />
      </RightArea>
    </Container>
  );
};

export default Home;
