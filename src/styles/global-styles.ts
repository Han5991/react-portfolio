import {createGlobalStyle} from '@lib/styled-components';
import {normalize} from '@lib/styled-normalize';

const GlobalStyle = createGlobalStyle`
  ${normalize}
  
  body {
    background-color: ${({theme}) => theme.color.text[0]};
  }

  .content {
    margin: 44px 77px 0 77px;
    padding: 16px 0;
  }
`;

export default GlobalStyle;
