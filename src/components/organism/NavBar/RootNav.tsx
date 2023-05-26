import styled from '@lib/styled-components';

const RootNav = styled.nav<{height: string}>`
  position: fixed;
  top: ${({theme}) => theme.size['0']}px;
  left: ${({theme}) => theme.size['0']}px;
  width: ${({theme}) => theme.size.full};
  background-color: ${({theme}) => theme.color.content[100]};
  z-index: 998;
  overflow: hidden;
  transition: height 0.3s;
  height: ${({height}) => height};
`;
export default RootNav;
