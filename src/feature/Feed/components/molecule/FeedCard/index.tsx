import {FC} from 'react';

import {secondsToHhMmSs} from '@/utils';
import {Card} from '@components/molecule';
import {IActivity} from '@feature/Activity/types';
import styled from '@lib/styled-components';

const FeedBodyContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(10px, auto));
  grid-template-rows: repeat(3, minmax(10px, auto));
  row-gap: 10px;
  column-gap: 20px;
  place-items: center;
  align-content: space-evenly;
`;

const FeedBodyItem = styled.div`
  display: flex;
  flex-direction: column;
  place-items: center;
  border-radius: 8px;
  padding: 10px;
  border: 1px solid ${({theme}) => theme.color.content[400]};
`;

const FeedHeader = styled.div`
  padding: 15px;
  width: auto;
`;

const FeedColumn = styled.span`
  color: ${({theme}) => theme.color.content[600]};
  font-size: 14px;
  padding: 5px;
`;

const FeedCard: FC<{data: IActivity}> = props => {
  const {data} = props;
  const {
    name = 'Zwift - Group Ride: Stage 2 - Zwift Ride Series: CoastalCruise (Short) on Island Hopper in Makuri Islands',
    start_date = '2023년 6월 22일',
    sport_type = '가상 라이딩',
    distance,
    average_watts,
    comment_count,
    kudos_count,
    moving_time,
    total_elevation_gain,
    total_photo_count,
  } = data;
  return (
    <Card
      header={
        <FeedHeader>
          <h3>{name}</h3>
          <p>{start_date}</p>
          <p>{sport_type}</p>
        </FeedHeader>
      }
      body={
        <FeedBodyContainer>
          <FeedBodyItem>
            <FeedColumn>거리</FeedColumn>
            <span>{Number(distance * 0.001).toFixed(2)} km</span>
          </FeedBodyItem>
          <FeedBodyItem>
            <FeedColumn>누적 상승고도</FeedColumn>
            <span>{total_elevation_gain} M</span>
          </FeedBodyItem>
          <FeedBodyItem>
            <FeedColumn>시간</FeedColumn>
            <span>{secondsToHhMmSs(moving_time)}</span>
          </FeedBodyItem>
          <FeedBodyItem>
            <FeedColumn>평균 파워</FeedColumn>
            <span>{average_watts} w</span>
          </FeedBodyItem>
          <FeedBodyItem>
            <FeedColumn>좋아요</FeedColumn>
            <span>{kudos_count}</span>
          </FeedBodyItem>
          <FeedBodyItem>
            <FeedColumn>댓글 수</FeedColumn>
            <span>{comment_count}</span>
          </FeedBodyItem>
          <FeedBodyItem>
            <FeedColumn>이미지 수</FeedColumn>
            <span>{total_photo_count}</span>
          </FeedBodyItem>
        </FeedBodyContainer>
      }
    />
  );
};

export default FeedCard;
