import { extendTheme } from 'native-base'

export const DEFAULT_THEME = extendTheme({
  colors: {
    blue: {
      400: '#4AC3C6',
      500: '#2FA7AB',
      600: '#2D939C',
      700: '#286E76',
      950: '#143238',
    },
    gray: {
      100: '#E1E1E6',
      200: '#A1A1AA',
      300: '#7C7C8A',
      400: '#323238',
      500: '#29292E',
      600: '#202024',
      700: '#202020',
    },
    white: '#FFFFFF',
    black: '#070707',
  },
  fonts: {
    bold: 'Roboto_700Bold',
    light: 'Roboto_300Light',
    regular: 'Roboto_400Regular',
    semibold: 'Roboto_500Medium',
  },
  fontSizes: {
    xs: 11,
    sm: 16,
    md: 18,
    lg: 20,
    xl: 24,
    xxl: 32,
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
})
type CustomThemeType = typeof DEFAULT_THEME

declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {}
}
