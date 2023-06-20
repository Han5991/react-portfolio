import React, {Fragment} from 'react';
import {useSetRecoilState} from 'recoil';

import {leftMenuShowSelector, topNavShowSelector} from '../recoil';

import {Icon, Li, Link, Ul as LeftNavUl} from '@components/atom';
import {useRecoilState} from '@lib/recoil';
import styled from '@lib/styled-components';

const HiddenNav = styled.nav<{isOpen: boolean}>`
  position: fixed;
  top: 0;
  left: ${({isOpen}) => (isOpen ? '0' : '-100%')};
  width: ${({theme}) => theme.size['1/2']};
  height: ${({theme}) => theme.size['1/2']};
  background-color: ${({theme}) => theme.color.content[100]};
  transition: left 0.3s;
`;

const LeftNavLinks = styled.div`
  display: grid;
  padding: ${({theme}) => theme.size['1']}px ${({theme}) => theme.size['12']}px;
`;

const LeftNavLi = styled(Li)`
  align-items: center;
  padding: ${({theme}) => theme.size['1']}px ${({theme}) => theme.size['12']}px;
  height: ${({theme}) => theme.size['12']}px;
`;

const LeftIcon = styled(Icon.ChevronLeft)`
  padding: 10px;
  cursor: pointer;
  transition: opacity 0.3s;
`;

const LeftNav = () => {
  const [showLeftNav, setShowLeftNav] = useRecoilState(leftMenuShowSelector);
  const setTopNavHeight = useSetRecoilState(topNavShowSelector);
  const {show, content} = showLeftNav;

  const hideNav = () => {
    setTopNavHeight('0px');
    setShowLeftNav({show: !show});
  };

  return (
    <HiddenNav isOpen={show}>
      <LeftIcon onClick={() => setShowLeftNav({show: !show, content})} />
      <LeftNavUl>
        {content
          ? content.map(({id, title, content: subContent}) => (
              <Fragment key={id}>
                <LeftNavLi>
                  <h1>{title}</h1>
                </LeftNavLi>
                <LeftNavLinks>
                  {subContent.map(
                    ({
                      id: subContentId,
                      title: subContentTitle,
                      link: subContentLink,
                    }) => (
                      <Link
                        onClick={hideNav}
                        style={{paddingBottom: 10}}
                        href={subContentLink}
                        key={subContentId}>
                        {subContentTitle}
                      </Link>
                    ),
                  )}
                </LeftNavLinks>
              </Fragment>
            ))
          : '메뉴가 없습니다.'}
      </LeftNavUl>
    </HiddenNav>
  );
};

export default LeftNav;
