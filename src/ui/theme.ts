import {
  DarkTheme as NavigationDefaultDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { adaptNavigationTheme, MD3DarkTheme } from 'react-native-paper';

const colors = {
  dark: {
    primary: 'rgb(170, 199, 255)',
    onPrimary: 'rgb(0, 47, 100)',
    primaryContainer: 'rgb(0, 69, 141)',
    onPrimaryContainer: 'rgb(214, 227, 255)',
    secondary: 'rgb(190, 198, 220)',
    onSecondary: 'rgb(40, 49, 65)',
    secondaryContainer: 'rgb(62, 71, 89)',
    onSecondaryContainer: 'rgb(218, 226, 249)',
    tertiary: 'rgb(220, 188, 224)',
    onTertiary: 'rgb(63, 40, 68)',
    tertiaryContainer: 'rgb(87, 62, 92)',
    onTertiaryContainer: 'rgb(249, 216, 253)',
    error: 'rgb(255, 180, 171)',
    onError: 'rgb(105, 0, 5)',
    errorContainer: 'rgb(147, 0, 10)',
    onErrorContainer: 'rgb(255, 180, 171)',
    background: 'rgb(26, 27, 30)',
    onBackground: 'rgb(227, 226, 230)',
    surface: 'rgb(26, 27, 30)',
    onSurface: 'rgb(227, 226, 230)',
    surfaceVariant: 'rgb(68, 71, 78)',
    onSurfaceVariant: 'rgb(196, 198, 208)',
    outline: 'rgb(142, 144, 153)',
    outlineVariant: 'rgb(68, 71, 78)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(227, 226, 230)',
    inverseOnSurface: 'rgb(47, 48, 51)',
    inversePrimary: 'rgb(40, 94, 169)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(33, 36, 41)',
      level2: 'rgb(38, 41, 48)',
      level3: 'rgb(42, 46, 55)',
      level4: 'rgb(43, 48, 57)',
      level5: 'rgb(46, 51, 62)',
    },
    surfaceDisabled: 'rgba(227, 226, 230, 0.12)',
    onSurfaceDisabled: 'rgba(227, 226, 230, 0.38)',
    backdrop: 'rgba(45, 48, 56, 0.4)',
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
