import {NextPage} from 'next';
import {useEffect} from 'react';

import {LoadingSpinner} from '@components/atom';
import {dataLoadingSelector} from '@components/organism/NavBar/recoil';
import {FeedCard} from '@feature/Feed/components/molecule';
import {useActivityPagination} from '@feature/Feed/hooks';
import {useSetRecoilState} from '@lib/recoil';
import styled from '@lib/styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoadingContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Feed: NextPage = () => {
  const setDataLoading = useSetRecoilState(dataLoadingSelector);
  const {pageData, isLoading} = useActivityPagination();
  useEffect(() => {
    setDataLoading(false);
  }, [setDataLoading]);

  return (
    <section>
      <Container>
        <article>
          {isLoading ? (
            <LoadingContainer>
              <LoadingSpinner size={200} />
            </LoadingContainer>
          ) : (
            pageData.map(activity => (
              <FeedCard key={activity.id} data={activity} />
            ))
          )}
        </article>
      </Container>
    </section>
  );
};

export default Feed;
