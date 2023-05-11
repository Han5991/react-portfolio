import * as colors from './colors';
import opacity from './opacity';
import shadow from './shadow';
import size from './size';
import typography from './typography';

export const enum ColorScheme {
  LIGHT = 'light',
  DARK = 'dark',
}

export type Color<T extends ColorScheme> = Recursive<(typeof colors)[T]>;
export type Size = Recursive<typeof size>;
export type Shadow = Recursive<typeof shadow>;
export type Typography = Recursive<typeof typography>;
export type Opacity = Recursive<typeof opacity>;
export type Insets = {top: number; bottom: number; right: number; left: number};

export type Theme<T extends ColorScheme> = {
  color: Color<T>;
  size: Size;
  shadow: Shadow;
  typography: Typography;
  opacity: Opacity;
  insets: Insets;
};

const themeWithoutColor: Omit<Theme<ColorScheme>, 'color'> = {
  size,
  opacity,
  shadow,
  typography,
  insets: {top: 0, bottom: 0, right: 0, left: 0},
};

const themeWithColorScheme: Record<ColorScheme, Theme<ColorScheme>> = {
  light: {color: colors.light, ...themeWithoutColor},
  dark: {color: colors.dark, ...themeWithoutColor},
};

export default themeWithColorScheme;
