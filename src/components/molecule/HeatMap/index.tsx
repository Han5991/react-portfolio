import React, {FC, useMemo} from 'react';

import {MONTHS, WEEK_DAYS, DAYS_IN_YEAR} from './constants';
import {transformCount, transformPixelsToNumber} from './utils';

import styled from '@lib/styled-components';

const Wrapper = styled.div`
  box-sizing: border-box;
  ul {
    padding-inline-start: 0;
    list-style: none;
  }
`;
const Graph = styled.div`
  padding: 15px;
  display: inline-grid;
  grid-template-areas:
    'empty months'
    'days squares';
  grid-template-columns: auto 1fr;
  grid-gap: 10px;
  box-shadow: 0 2px 4px
    ${({theme}) => theme.color.text[700] + theme.opacity[40]};
`;
const Months = styled.ul<{weekWidth: string}>`
  padding-inline-start: 0;
  grid-area: months;
  margin-bottom: 0;
  display: grid;
  grid-template-columns:
    calc(${({weekWidth}) => weekWidth} * 4) /* jan */
    calc(${({weekWidth}) => weekWidth} * 4) /* feb */
    calc(${({weekWidth}) => weekWidth} * 4) /* mar */
    calc(${({weekWidth}) => weekWidth} * 5) /* apr */
    calc(${({weekWidth}) => weekWidth} * 4) /* may */
    calc(${({weekWidth}) => weekWidth} * 4) /* jun */
    calc(${({weekWidth}) => weekWidth} * 5) /* jul */
    calc(${({weekWidth}) => weekWidth} * 4) /* aug */
    calc(${({weekWidth}) => weekWidth} * 4) /* sep */
    calc(${({weekWidth}) => weekWidth} * 5) /* oct */
    calc(${({weekWidth}) => weekWidth} * 4) /* nov */
    calc(${({weekWidth}) => weekWidth} * 5) /* dec */;
`;
const Days = styled.ul<{squareGap: string; squareSize: string}>`
  margin-block-end: 0;
  margin-block-start: 0;
  grid-area: days;
  display: grid;
  grid-gap: ${({squareGap}) => squareGap};
  grid-template-rows: repeat(7, ${({squareSize}) => squareSize});

  li:nth-child(odd) {
    visibility: hidden;
  }
`;
const SquaresList = styled.ul<{squareGap: string; squareSize: string}>`
  margin-top: 0;
  margin-block-start: 0;
  grid-area: squares;
  display: grid;
  grid-gap: ${({squareGap}) => squareGap};
  grid-template-rows: repeat(7, ${({squareSize}) => squareSize});
  z-index: 1;
  grid-auto-flow: column;
  grid-auto-columns: ${({squareSize}) => squareSize};
`;
const SquareListItem = styled.li<{colour: string}>`
  border-radius: 3px;
  border: 1px rgba(27, 31, 35, 0.06) solid;
  background-color: ${({colour}) => colour};

  &[data-tooltip] {
    position: relative;
    cursor: pointer;
  }

  &[data-tooltip]:before,
  &[data-tooltip]:after {
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
  }

  &[data-tooltip]:before {
    position: absolute;
    z-index: 999;
    bottom: 150%;
    left: 100%;
    margin-bottom: 5px;
    margin-left: -90px;
    padding: 7px;
    width: 150px;
    border-radius: 3px;
    background-color: hsla(0, 0%, 20%, 0.9);
    color: #fff;
    content: attr(data-tooltip);
    text-align: center;
    font-size: 10px;
    line-height: 1.2;
  }

  &[data-tooltip]:after {
    position: absolute;
    bottom: 150%;
    left: 50%;
    margin-left: -5px;
    width: 0;
    border-top: 5px solid hsla(0, 0%, 20%, 0.9);
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    font-size: 0;
    line-height: 0;
    z-index: inherit;
  }

  &[data-tooltip]:hover:before,
  &[data-tooltip]:hover:after {
    visibility: visible;
    opacity: 1;
  }
`;

type HeatMapProps = {
  colour?: [string, string, string, string, string];
  squareNumber?: number;
  count: number[];
  squareGap?: `${number}px`;
  squareSize?: `${number}px`;
};

const HeatMap: FC<HeatMapProps> = props => {
  const {
    colour = ['#ebedf0', '#c6e48b', '#40c463', '#30a14e', '#216e39'],
    squareNumber = DAYS_IN_YEAR,
    count,
    squareGap = '2px',
    squareSize = '10px',
  } = props;
  const level = useMemo(() => count.map(transformCount), [count]);
  const weekWidth = useMemo(
    () =>
      `${
        transformPixelsToNumber(squareGap) + transformPixelsToNumber(squareSize)
      }px`,
    [squareGap, squareSize],
  );
  return (
    <Wrapper>
      <Graph>
        <Months weekWidth={weekWidth}>
          {MONTHS.map(months => (
            <li key={months}>{months}</li>
          ))}
        </Months>
        <Days squareGap={squareGap} squareSize={squareSize}>
          {WEEK_DAYS.map(weekDays => (
            <li key={weekDays}>{weekDays}</li>
          ))}
        </Days>
        <SquaresList squareSize={squareSize} squareGap={squareGap}>
          {[...Array(squareNumber)].map((_, i) => (
            <SquareListItem
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              colour={colour[level[i] || 0]}
              data-tooltip={`${count[i] || 0} activity on this day`}
            />
          ))}
        </SquaresList>
      </Graph>
    </Wrapper>
  );
};

export default HeatMap;
