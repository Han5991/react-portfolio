import {useEffect} from 'react';

import {dataLoadingSelector} from '@components/organism/NavBar/recoil';
import {useSetRecoilState} from '@lib/recoil';
import styled from '@lib/styled-components';

const PlanContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 92vh;
`;

const Plan = () => {
  const setDataLoading = useSetRecoilState(dataLoadingSelector);
  useEffect(() => {
    setDataLoading(false);
  }, [setDataLoading]);
  return (
    <PlanContainer>
      <section>
        <div style={{}}>
          <h1>Plan</h1>
        </div>
      </section>
    </PlanContainer>
  );
};

export default Plan;
