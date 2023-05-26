import {debounce} from 'lodash';
import {useState} from 'react';

import {
  mainMenuSelector,
  subMenuSelector,
  mainMenuShowSelector,
} from './recoil';
import RootNav from './RootNav';
import SubNav from './SubNav';
import TopNav from './TopNav';

import {Icon, Link, Li, Ul} from '@components/atom';
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
  padding: ${({theme}) => theme.size['2.5']}px;
`;

type NavigationProps = {
  showBlur: () => void;
  hideBlur: () => void;
};

const NavBar = ({showBlur, hideBlur}: NavigationProps) => {
  const [navHeight, setNavHeight] = useState('44px');
  const [hiddenNavHeight, setHiddenNavHeight] = useState('0px');
  const setSubMenu = useSetRecoilState(subMenuSelector);
  const mainMenu = useRecoilValue(mainMenuSelector);
  const show = useSetRecoilState(mainMenuShowSelector);
  const {media} = useTheme();
  const isMobile = useMediaQuery(media.mobile);

  const showContests = debounce(subMenu => {
    setSubMenu([...subMenu]);
    show(true);
    showBlur();
    setNavHeight('220px');
  }, 300);

  const hideContests = () => {
    hideBlur();
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
        <NavBarLi>
          <Link href="/">
            <Icon.Search />
          </Link>
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
      <SubNav />
      <TopNav height={hiddenNavHeight} mainMenu={mainMenu} />
    </RootNav>
  );
};

export default NavBar;
