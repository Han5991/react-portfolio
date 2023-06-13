import React, {FC, useMemo} from 'react';

import {useThisMonthActivities} from '@feature/Activity/hooks';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from '@lib/chart.js';
import type {ChartData, ChartOptions} from '@lib/chart.js';
import {Bar} from '@lib/react-chartjs-2';
import styled, {useTheme} from '@lib/styled-components';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type ThisMonthChartProps = {
  id: string;
};

const Container = styled.div`
  margin: 10px;
  box-sizing: border-box;
`;

const ThisMonthChart: FC<ThisMonthChartProps> = props => {
  const {id} = props;
  const {color} = useTheme();
  const {monthActivities} = useThisMonthActivities(id);
  const options = useMemo<ChartOptions>(
    () => ({
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
        title: {
          display: true,
          text: '이번달 스트라바 요금',
        },
      },
    }),
    [],
  );

  const data = useMemo<ChartData<'bar'>>(
    () => ({
      labels: ['6월'],
      datasets: [
        {
          barPercentage: 0.5,
          label: '1회 운동 요금',
          data: [Math.round(22000 / monthActivities), 6000],
          backgroundColor: () => {
            if (Math.round(22000 / monthActivities) < 2000)
              return color.blue[200];
            return color.red[200];
          },
        },
      ],
    }),
    [color.blue, color.red, monthActivities],
  );

  return (
    <Container>
      {Intl.NumberFormat().format(Math.round(22000 / monthActivities))} 원 이번
      달 하루 운동 비용
      <Bar options={options} data={data} />
    </Container>
  );
};

export default ThisMonthChart;
