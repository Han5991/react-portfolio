import {createGlobalStyle} from '@lib/styled-components';
import {normalize} from '@lib/styled-normalize';

const GlobalStyle = createGlobalStyle`
  ${normalize}
  .content {
    margin-top: 44px;
  }
  
  h1 {
    margin: 0;
  }
`;

export default GlobalStyle;
