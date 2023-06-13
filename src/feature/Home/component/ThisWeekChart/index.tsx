import React, {FC, useMemo} from 'react';

import {useThisWeekActivities} from '@feature/Activity/hooks';
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
import {useTheme} from '@lib/styled-components';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type ThisWeekChartProps = {
  id: string;
};

const ThisWeekChart: FC<ThisWeekChartProps> = props => {
  const {id} = props;
  const {color} = useTheme();
  const {weekActivities} = useThisWeekActivities(id);

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
          label: '거리 (Km)',
          data: weekActivities,
          backgroundColor: color.blue[200],
        },
      ],
    }),
    [color.blue, weekActivities],
  );

  return <Bar options={options} data={data} />;
};

export default ThisWeekChart;
