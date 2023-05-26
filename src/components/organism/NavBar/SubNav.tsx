import {subMenuSelector, mainMenuShowSelector} from './recoil';

import {Link, Li, Ul} from '@components/atom';
import {useRecoilValue, useRecoilState} from '@lib/recoil';
import styled from '@lib/styled-components';

const Container = styled.div`
  display: flex;
`;

const SubNavLi = styled(Li)<{isVisible: boolean}>`
  padding: 10px;
  opacity: ${({isVisible}) => (isVisible ? 1 : 0)};
  transition: opacity 0.3s linear;
`;

const MenuContainer = styled.div`
  flex: 1;
  flex-direction: column;
  padding-left: 22px;
  padding-right: 22px;
`;

const MenuTitle = styled.h2<{isVisible: boolean}>`
  font-size: ${({theme}) => theme.typography.fontSizes.sm}px;
  color: ${({theme}) => theme.color.text[300]};
  padding: 10px 10px 0 10px;
  opacity: ${({isVisible}) => (isVisible ? 1 : 0)};
  transition: opacity 0.3s linear;
`;

const SubNav = () => {
  const [isVisible, setIsVisible] = useRecoilState(mainMenuShowSelector);
  const subMenus = useRecoilValue(subMenuSelector);

  return (
    <Container onMouseLeave={() => setIsVisible(false)}>
      {subMenus.map(({id, title, content}) => (
        <MenuContainer key={id}>
          <MenuTitle isVisible={isVisible}>{title}</MenuTitle>
          <Ul>
            {content.map(({id: contentId, title: contentTitle, link}) => (
              <SubNavLi key={contentId} isVisible={isVisible}>
                <Link href={link}>{contentTitle}</Link>
              </SubNavLi>
            ))}
          </Ul>
        </MenuContainer>
      ))}
    </Container>
  );
};

export default SubNav;
