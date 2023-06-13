import React, {FC} from 'react';

import {HeatMap} from '@components/molecule';
import {useThisYearActivities} from '@feature/Activity/hooks';

type ThisYearHeatMapProps = {
  id: string;
};

const ThisYearHeatMap: FC<ThisYearHeatMapProps> = props => {
  const {id} = props;
  const {yearActivities} = useThisYearActivities(id);
  return <HeatMap count={yearActivities} />;
};

export default ThisYearHeatMap;
