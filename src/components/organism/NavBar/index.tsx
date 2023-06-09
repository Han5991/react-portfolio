import * as process from 'process';

import {debounce} from 'lodash';
import React, {useMemo, useState} from 'react';

import {
  mainMenuSelector,
  subMenuSelector,
  mainMenuShowSelector,
} from './recoil';
import RootNav from './RootNav';
import SubNav from './SubNav';
import TopNav from './TopNav';

import {Icon, Link, Li, Ul} from '@components/atom';
import {Avatar, Button} from '@components/molecule';
import {useGetAccount} from '@feature/Account/hooks';
import {useMediaQuery} from '@hooks/media';
import {useRecoilValue, useSetRecoilState} from '@lib/recoil';
import styled, {useTheme} from '@lib/styled-components';

const NavBarUl = styled(Ul)<{isMobile: boolean}>`
  display: flex;
  align-items: center;
  justify-content: ${({isMobile}) => (isMobile ? 'space-between' : 'center')};
  height: ${({theme}) => theme.size.list.small}px;
`;

const NavBarLi = styled(Li)`
  padding: 10px;
  color: ${({theme}) => theme.color.text[700]};
`;

const LiContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;

const NavBarLink = styled(Link)`
  display: flex;
  align-items: center;
`;

const AvatarContainer = styled.div`
  padding-left: 10px;
`;

const HamburgButtonContainer = styled(NavBarLi)`
  cursor: pointer;
  z-index: 999;
`;

const NavBar = () => {
  const [rootNavHeight, setRootNavHeight] = useState('44px');
  const [topNavHeight, setTopNavHeight] = useState('0px');
  const setSubMenu = useSetRecoilState(subMenuSelector);
  const mainMenu = useRecoilValue(mainMenuSelector);
  const mainMenuShow = useSetRecoilState(mainMenuShowSelector);
  const {media} = useTheme();
  const isMobile = useMediaQuery(media.mobile);
  const {account, isLoading} = useGetAccount();
  const showContests = debounce(subMenu => {
    setSubMenu(subMenu);
    mainMenuShow(true);
    setRootNavHeight('150px');
  }, 300);

  const hideContests = () => setRootNavHeight('44px');

  const setHideNav = () =>
    setTopNavHeight(prevState => (prevState === '0px' ? '100%' : '0px'));

  const buttonColor = useMemo(
    () =>
      new Date((account?.activity_read?.expires_at as number) * 1000) <
      new Date()
        ? 'red'
        : 'blue',
    [account?.activity_read?.expires_at],
  );

  const authorizationUrl = useMemo(
    () =>
      `https://www.strava.com/oauth/authorize?client_id=108048&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&approval_prompt=force&scope=activity:read`,
    [],
  );

  return (
    <RootNav height={rootNavHeight} onMouseLeave={hideContests}>
      <NavBarUl isMobile={isMobile}>
        <LiContainer style={{justifyContent: 'inherit'}}>
          <NavBarLi>
            <Link href="/">
              <Icon.Home />
            </Link>
          </NavBarLi>
          {isMobile
            ? null
            : mainMenu.map(({title, link, id, subMenu}) => (
                <NavBarLi key={id} onMouseEnter={() => showContests(subMenu)}>
                  <NavBarLink href={link}>{title}</NavBarLink>
                </NavBarLi>
              ))}
        </LiContainer>
        <LiContainer
          style={{justifyContent: isMobile ? 'flex-end' : 'inherit'}}>
          <NavBarLi style={{alignItems: 'center'}}>
            {!isLoading ? (
              <>
                안녕하세요 {account?.name}님
                <AvatarContainer>
                  <Avatar src={account?.avatar as string} size="small" />
                </AvatarContainer>
                <Button color={buttonColor} style={{marginLeft: 10}}>
                  <Link style={{color: 'white'}} href={authorizationUrl}>
                    데이터 갱신하기
                  </Link>
                </Button>
              </>
            ) : null}
          </NavBarLi>
        </LiContainer>
        {isMobile ? (
          <HamburgButtonContainer onClick={setHideNav}>
            <Icon.HamburgerButton />
          </HamburgButtonContainer>
        ) : null}
      </NavBarUl>
      <SubNav />
      {isMobile ? <TopNav height={topNavHeight} mainMenu={mainMenu} /> : null}
    </RootNav>
  );
};

export default NavBar;
