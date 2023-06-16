import {useEffect, useState} from 'react';

import {IActivity} from '@feature/Activity/types';
import {getActivityPagination, PageSize} from '@feature/Feed/data';
import {useScrollEnd} from '@hooks/media';
import {useSession} from '@lib/next-auth/react';
import {useInfiniteQuery} from '@lib/react-query';

export const useActivityPagination = () => {
  const isScrollEnd = useScrollEnd();
  const {data: session, status} = useSession();
  const {
    data: pageData,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['activityPost'],
    queryFn: ({pageParam}) =>
      getActivityPagination(session?.user.sub, pageParam),
    enabled: status === 'authenticated',
    getNextPageParam: lastPage => lastPage.length <= PageSize,
    retryDelay: 500,
  });

  const [feed, setFeed] = useState<IActivity[]>([]);

  useEffect(() => {
    const data = pageData?.pages.flat();
    if (data) {
      setFeed(data.map(doc => doc.data()));
    }
  }, [pageData]);

  useEffect(() => {
    if (hasNextPage && isScrollEnd) {
      const lastDocumentSnapshot =
        // eslint-disable-next-line no-unsafe-optional-chaining
        pageData?.pages[pageData?.pages.length - 1][PageSize - 1];

      if (lastDocumentSnapshot) {
        fetchNextPage({pageParam: lastDocumentSnapshot});
      }
    }
  }, [fetchNextPage, hasNextPage, isScrollEnd, isLoading, pageData]);

  return {pageData: feed, isLoading};
};
