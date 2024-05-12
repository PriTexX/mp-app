import {
  DarkTheme as NavigationDefaultDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
} from 'react-native-paper';
import { useSettingsStore } from 'src/store/useSettingsStore';

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

  light: {
    primary: 'rgb(0, 95, 175)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(212, 227, 255)',
    onPrimaryContainer: 'rgb(0, 28, 58)',
    secondary: 'rgb(84, 95, 113)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(216, 227, 248)',
    onSecondaryContainer: 'rgb(17, 28, 43)',
    tertiary: 'rgb(110, 86, 118)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(247, 216, 255)',
    onTertiaryContainer: 'rgb(39, 20, 48)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(253, 252, 255)',
    onBackground: 'rgb(26, 28, 30)',
    surface: 'rgb(253, 252, 255)',
    onSurface: 'rgb(26, 28, 30)',
    surfaceVariant: 'rgb(224, 226, 236)',
    onSurfaceVariant: 'rgb(67, 71, 78)',
    outline: 'rgb(116, 119, 127)',
    outlineVariant: 'rgb(195, 198, 207)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(47, 48, 51)',
    inverseOnSurface: 'rgb(241, 240, 244)',
    inversePrimary: 'rgb(165, 200, 255)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(240, 244, 251)',
      level2: 'rgb(233, 239, 249)',
      level3: 'rgb(225, 235, 246)',
      level4: 'rgb(223, 233, 245)',
      level5: 'rgb(218, 230, 244)',
    },
    surfaceDisabled: 'rgba(26, 28, 30, 0.12)',
    onSurfaceDisabled: 'rgba(26, 28, 30, 0.38)',
    backdrop: 'rgba(45, 49, 56, 0.4)',
  },
};

const customMaterialDarkTheme = { ...MD3DarkTheme, colors: colors.dark };
const customMaterialLightTheme = { ...MD3LightTheme, colors: colors.light };

const { DarkTheme: NavigationDarkTheme, LightTheme: NavigationLightTheme } =
  adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDefaultDarkTheme,
    materialDark: customMaterialDarkTheme,
    materialLight: customMaterialLightTheme,
  });

const darkModeTheme = {
  ...customMaterialDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...customMaterialDarkTheme.colors,
    ...NavigationDarkTheme.colors,
  },
};

const lightModeTheme = {
  ...customMaterialLightTheme,
  ...NavigationLightTheme,
  colors: {
    ...customMaterialLightTheme.colors,
    ...NavigationLightTheme.colors,
  },
};

export function useAppTheme() {
  const isDarkMode = useSettingsStore((s) => s.settings.isDarkMode);

  return isDarkMode ? darkModeTheme : lightModeTheme;
}
