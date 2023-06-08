import {subMenuSelector, mainMenuShowSelector} from './recoil';

import {Link, Li, Ul} from '@components/atom';
import {useRecoilValue, useRecoilState} from '@lib/recoil';
import styled from '@lib/styled-components';

const Container = styled.div`
  display: flex;
`;

const SubNavLi = styled(Li)`
  padding: 10px;
  transition: opacity 0.3s linear;
`;

const LiContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;

const MenuContainer = styled.div<{isVisible: boolean}>`
  flex-direction: column;
  padding: 0 10px 0 40px;
  opacity: ${({isVisible}) => (isVisible ? 1 : 0)};
  transition: opacity 0.3s linear;
  align-items: center;
`;

const MenuTitle = styled.h2`
  font-size: ${({theme}) => theme.typography.fontSizes.sm}px;
  color: ${({theme}) => theme.color.text[300]};
  padding: 10px 10px 0 10px;
  transition: opacity 0.3s linear;
`;

const SubNav = () => {
  const [isVisible, setIsVisible] = useRecoilState(mainMenuShowSelector);
  const subMenus = useRecoilValue(subMenuSelector);

  return (
    <Container onMouseLeave={() => setIsVisible(false)}>
      <LiContainer>
        {subMenus.map(({id, title, content}) => (
          <MenuContainer key={id} isVisible={isVisible}>
            <MenuTitle>{title}</MenuTitle>
            <Ul>
              {content.map(({id: contentId, title: contentTitle, link}) => (
                <SubNavLi key={contentId}>
                  <Link href={link}>{contentTitle}</Link>
                </SubNavLi>
              ))}
            </Ul>
          </MenuContainer>
        ))}
      </LiContainer>
      <LiContainer />
    </Container>
  );
};

export default SubNav;
