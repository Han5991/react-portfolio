import {ColorScheme, Theme} from '@styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme<ColorScheme> {}
}
