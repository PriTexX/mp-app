import {
  DarkTheme as NavigationDefaultDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { adaptNavigationTheme, MD3DarkTheme } from 'react-native-paper';

const colors = {
  dark: {
    primary: 'rgb(106, 211, 255)',
    onPrimary: 'rgb(0, 53, 70)',
    primaryContainer: 'rgb(0, 77, 101)',
    onPrimaryContainer: 'rgb(190, 233, 255)',
    secondary: 'rgb(180, 202, 214)',
    onSecondary: 'rgb(31, 51, 61)',
    secondaryContainer: 'rgb(53, 74, 84)',
    onSecondaryContainer: 'rgb(208, 230, 242)',
    tertiary: 'rgb(198, 194, 234)',
    onTertiary: 'rgb(47, 45, 76)',
    tertiaryContainer: 'rgb(70, 67, 100)',
    onTertiaryContainer: 'rgb(227, 223, 255)',
    error: 'rgb(255, 180, 171)',
    onError: 'rgb(105, 0, 5)',
    errorContainer: 'rgb(147, 0, 10)',
    onErrorContainer: 'rgb(255, 180, 171)',
    background: 'rgb(25, 28, 30)',
    onBackground: 'rgb(225, 226, 229)',
    surface: 'rgb(25, 28, 30)',
    onSurface: 'rgb(225, 226, 229)',
    surfaceVariant: 'rgb(64, 72, 76)',
    onSurfaceVariant: 'rgb(192, 200, 205)',
    outline: 'rgb(138, 146, 151)',
    outlineVariant: 'rgb(64, 72, 76)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(225, 226, 229)',
    inverseOnSurface: 'rgb(46, 49, 51)',
    inversePrimary: 'rgb(0, 102, 133)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(29, 37, 41)',
      level2: 'rgb(32, 43, 48)',
      level3: 'rgb(34, 48, 55)',
      level4: 'rgb(35, 50, 57)',
      level5: 'rgb(36, 54, 62)',
    },
    surfaceDisabled: 'rgba(225, 226, 229, 0.12)',
    onSurfaceDisabled: 'rgba(225, 226, 229, 0.38)',
    backdrop: 'rgba(42, 49, 54, 0.4)',
  },
};

export function getTheme() {
  const customMaterialDarkTheme = { ...MD3DarkTheme, colors: colors.dark };

  const { DarkTheme: NavigationDarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDefaultDarkTheme,
    materialDark: customMaterialDarkTheme,
  });

  return {
    ...customMaterialDarkTheme,
    ...NavigationDarkTheme,
    colors: {
      ...customMaterialDarkTheme.colors,
      ...NavigationDarkTheme.colors,
    },
  };
}
