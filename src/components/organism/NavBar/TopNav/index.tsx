import LeftNav from '../LeftNav';
import {leftMenuShowSelector} from '../recoil';
import RootNav from '../RootNav';
import {MainMenu, SubMenu} from '../types';

import {Ul, Li, Icon} from '@components/atom';
import {useSetRecoilState} from '@lib/recoil';
import styled from '@lib/styled-components';

const HiddenNav = styled(RootNav)``;

const TopNavUl = styled(Ul)`
  padding-top: ${({theme}) => theme.size['13']}px;
`;

const RightIcon = styled(Icon.ChevronRight)`
  opacity: 0;
  transition: opacity 0.2s;
`;

const TopNavLi = styled(Li)`
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  height: ${({theme}) => theme.size['12']}px;
  padding: ${({theme}) => theme.size['1']}px ${({theme}) => theme.size['12']}px;

  &:hover ${RightIcon} {
    opacity: 1;
  }
`;

type HiddenNavProps = {
  height: string;
  mainMenu: MainMenu[];
};

const TopNav = ({height, mainMenu}: HiddenNavProps) => {
  const setLeftMenuShow = useSetRecoilState(leftMenuShowSelector);
  const handleLeftMenu = (content: SubMenu[]) =>
    setLeftMenuShow(({show}) => ({
      show: !show,
      content,
    }));

  return (
    <HiddenNav height={height}>
      <TopNavUl>
        {mainMenu.map(({id, title, subMenu}) => (
          <TopNavLi key={id} onClick={() => handleLeftMenu(subMenu)}>
            <h1>{title}</h1>
            <RightIcon />
          </TopNavLi>
        ))}
      </TopNavUl>
      <LeftNav />
    </HiddenNav>
  );
};
export default TopNav;
