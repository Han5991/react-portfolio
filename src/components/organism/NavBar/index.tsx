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

import {Icon, Link, Li, Ul, Line} from '@components/atom';
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
  padding: ${({theme}) => theme.size['2.5']}px;
  color: ${({theme}) => theme.color.text[700]};
`;

const NavBar = () => {
  const [navHeight, setNavHeight] = useState('44px');
  const [hiddenNavHeight, setHiddenNavHeight] = useState('0px');
  const setSubMenu = useSetRecoilState(subMenuSelector);
  const mainMenu = useRecoilValue(mainMenuSelector);
  const show = useSetRecoilState(mainMenuShowSelector);
  const {media} = useTheme();
  const isMobile = useMediaQuery(media.mobile);
  const {data: userData, status} = useSession();

  const showContests = debounce(subMenu => {
    setSubMenu([...subMenu]);
    show(true);
    setNavHeight('220px');
  }, 300);

  const hideContests = () => {
    setNavHeight('44px');
  };

  const setHideNav = () =>
    setHiddenNavHeight(prevState => (prevState === '0px' ? '100%' : '0px'));

  return (
    <RootNav height={navHeight} onMouseLeave={hideContests}>
      <NavBarUl isMobile={isMobile}>
        <NavBarLi style={{marginRight: isMobile ? 'auto' : ''}}>
          <Link href="/">
            <Icon.Home />
          </Link>
        </NavBarLi>
        {isMobile
          ? null
          : mainMenu.map(({title, link, id, subMenu}) => (
              <NavBarLi key={id} onMouseEnter={() => showContests(subMenu)}>
                <Link href={link}>{title}</Link>
              </NavBarLi>
            ))}
        <Line type="vertical" length={30} />
        <NavBarLi style={{alignItems: 'center'}}>
          {status === 'authenticated' ? (
            <Avatar src={userData?.user.picture} size="small" />
          ) : null}
        </NavBarLi>
        {isMobile ? (
          <NavBarLi
            style={{
              cursor: 'pointer',
              zIndex: 999,
            }}
            onClick={setHideNav}>
            <Icon.HamburgerButton />
          </NavBarLi>
        ) : null}
      </NavBarUl>
      {isMobile ? (
        <>
          <SubNav />
          <TopNav height={hiddenNavHeight} mainMenu={mainMenu} />
        </>
      ) : null}
    </RootNav>
  );
};

export default NavBar;
