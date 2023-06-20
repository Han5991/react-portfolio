import {debounce} from 'lodash';
import React, {useMemo, useState} from 'react';
import {useRecoilState} from 'recoil';

import {
  mainMenuSelector,
  subMenuSelector,
  mainMenuShowSelector,
  dataLoadingSelector,
  topNavShowSelector,
} from './recoil';
import RootNav from './RootNav';
import SubNav from './SubNav';
import TopNav from './TopNav';

import {Icon, Link, Li, Ul, Skeleton} from '@components/atom';
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
  const [topNavHeight, setTopNavHeight] = useRecoilState(topNavShowSelector);
  const mainMenu = useRecoilValue(mainMenuSelector);
  const dataLoading = useRecoilValue(dataLoadingSelector);
  const setSubMenu = useSetRecoilState(subMenuSelector);
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

  const buttonColor = useMemo(() => {
    if (account?.token === undefined) return 'red';
    return new Date((account?.token?.expires_at as number) * 1000) < new Date()
      ? 'red'
      : 'blue';
  }, [account?.token]);

  const authorizationUrl = useMemo(() => {
    const query = new URLSearchParams({
      client_id: '108048',
      response_type: 'code',
      redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI as string,
      approval_prompt: 'force',
      scope: 'read,read_all,activity:read_all,profile:read_all',
    }).toString();
    return `https://www.strava.com/oauth/authorize?${query}`;
  }, []);

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
                <Button
                  color={buttonColor}
                  style={{marginLeft: 10}}
                  loading={dataLoading}>
                  <Link style={{color: 'white'}} href={authorizationUrl}>
                    데이터 갱신하기
                  </Link>
                </Button>
              </>
            ) : (
              <Skeleton show={isLoading} />
            )}
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
