import {debounce} from 'lodash';
import React, {useState} from 'react';

import {
  mainMenuSelector,
  subMenuSelector,
  mainMenuShowSelector,
} from './recoil';
import RootNav from './RootNav';
import SubNav from './SubNav';
import TopNav from './TopNav';

import {Icon, Link, Li, Ul} from '@components/atom';
import {Avatar} from '@components/molecule';
import {useMediaQuery} from '@hooks/media';
import {useSession} from '@lib/next-auth/react';
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
  cursor: pointer;
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
  const {data: userData, status} = useSession();

  const showContests = debounce(subMenu => {
    setSubMenu(subMenu);
    mainMenuShow(true);
    setRootNavHeight('150px');
  }, 300);

  const hideContests = () => setRootNavHeight('44px');

  const setHideNav = () =>
    setTopNavHeight(prevState => (prevState === '0px' ? '100%' : '0px'));

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
            {status !== 'loading' ? (
              <>
                안녕하세요 {userData?.user.name}님
                <AvatarContainer>
                  <Avatar src={userData?.user.picture} size="small" />
                </AvatarContainer>
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
