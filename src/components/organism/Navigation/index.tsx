'use client';

import {useState} from 'react';

import {Icon, Link} from '@components/atom';
import styled from '@lib/styled-components';

const Nav = styled.nav<{height: number}>`
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  width: ${({theme}) => theme.size.full};
  height: ${({theme}) => theme.size.box.large}px;
  background-color: ${({theme}) => theme.color.content[100]};
  z-index: 999;
  overflow: hidden;
  transition: height 0.5s;

  :hover {
    height: ${({height}) => height}px;
  }
`;

const Ul = styled.ul`
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const Li = styled.li`
  padding: 10px;
`;

const Navigation = () => {
  const [contests, setContests] = useState<string>('');
  const [height, setHeight] = useState<number>(100);

  return (
    <Nav height={height}>
      <Ul>
        <Li key="1">
          <Link
            onMouseEnter={() => {
              setContests('l1');
              setHeight(110);
            }}
            href="/">
            <Icon.Home />
          </Link>
          <div style={{paddingTop: 10}}>{contests}</div>
        </Li>
        <Li key="2">
          <Link
            onMouseEnter={() => {
              setContests('l2');
              setHeight(120);
            }}
            href="/">
            스토어
          </Link>
        </Li>
        <Li key="3">
          <Link
            onMouseEnter={() => {
              setContests('l3');
              setHeight(130);
            }}
            href="/">
            iPhone
          </Link>
        </Li>
      </Ul>
    </Nav>
  );
};

export default Navigation;
