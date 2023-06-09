import * as colors from './colors';
import {media} from './media';
import opacity from './opacity';
import size from './size';
import typography from './typography';

export const enum ColorScheme {
  LIGHT = 'light',
  DARK = 'dark',
}

export type Color<T extends ColorScheme> = Recursive<(typeof colors)[T]>;
export type Size = Recursive<typeof size>;
export type Media = Recursive<typeof media>;
export type Typography = Recursive<typeof typography>;
export type Opacity = Recursive<typeof opacity>;
export type Insets = {top: number; bottom: number; right: number; left: number};

export type Theme<T extends ColorScheme> = {
  color: Color<T>;
  size: Size;
  typography: Typography;
  opacity: Opacity;
  insets: Insets;
  media: Media;
};

const themeWithoutColor: Omit<Theme<ColorScheme>, 'color'> = {
  size,
  opacity,
  typography,
  insets: {top: 0, bottom: 0, right: 0, left: 0},
  media,
};

const themeWithColorScheme: Record<ColorScheme, Theme<ColorScheme>> = {
  light: {color: colors.light, ...themeWithoutColor},
  dark: {color: colors.dark, ...themeWithoutColor},
};

export default themeWithColorScheme;
