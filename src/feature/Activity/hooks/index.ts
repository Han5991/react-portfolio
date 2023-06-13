import {
  getThisMonthActivities,
  getThisWeekActivities,
  getThisYearActivities,
} from '@feature/Activity/data';
import {useQuery} from '@lib//react-query';

export const useThisWeekActivities = (id: string) => {
  const {
    data: weekActivities,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['thisWeekActivities'],
    queryFn: () => getThisWeekActivities(id),
  });

  return {
    weekActivities: weekActivities || Array.from({length: 7}, () => 0),
    error,
    isLoading,
  };
};

export const useThisYearActivities = (id: string) => {
  const {
    data: yearActivities,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['thisYearActivities'],
    queryFn: () => getThisYearActivities(id),
  });

  return {
    yearActivities: yearActivities || Array.from({length: 365}, () => 0),
    error,
    isLoading,
  };
};

export const useThisMonthActivities = (id: string) => {
  const {
    data: monthActivities,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['thisMonthActivities'],
    queryFn: () => getThisMonthActivities(id),
  });

  return {
    monthActivities: monthActivities || 0,
    isLoading,
    error,
  };
};
