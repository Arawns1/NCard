import { extendTheme } from 'native-base'

export const DEFAULT_THEME = extendTheme({
  colors: {
    blue: {
      400: 'rgba(74, 195, 198, 1)',
      500: 'rgba(47, 167, 171, 1)',
      600: 'rgba(45, 147, 156, 1)',
      700: 'rgba(40, 110, 118, 1)',
      950: 'rgba(20, 50, 56, 1)',
    },
    gray: {
      100: 'rgba(225, 225, 230, 1)',
      200: 'rgba(161, 161, 170, 1)',
      300: 'rgba(124, 124, 138, 1)',
      400: 'rgba(50, 50, 56, 1)',
      500: 'rgba(41, 41, 46, 1)',
      600: 'rgba(32, 32, 36, 1)',
      700: 'rgba(32, 32, 32, 1)',
    },
    white: '#FFFFFF',
    black: '#070707',
  },
  fonts: {
    light: 'Roboto_300Light',
    regular: 'Roboto_400Regular',
    semibold: 'Roboto_500Medium',
    bold: 'Roboto_700Bold',
  },
  fontSizes: {
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  space: {
    0.5: 4,
    1: 8,
    2: 16,
    3: 24,
    4: 32,
    5: 40,
    6: 48,
    7: 56,
    16: 64,
    20: 80,
  },
  radii: {
    none: 0,
    xs: 4,
    sm: 6,
    md: 8,
    lg: 12,
    full: 9999,
  },
  sizes: {
    16: 60,
  },
})
type CustomThemeType = typeof DEFAULT_THEME

declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {}
}
