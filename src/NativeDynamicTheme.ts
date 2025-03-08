import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export type ColorScheme = {
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  inversePrimary: string;
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;
  background: string;
  onBackground: string;
  surface: string;
  onSurface: string;
  surfaceVariant: string;
  onSurfaceVariant: string;
  inverseSurface: string;
  inverseOnSurface: string;
  outline: string;
  outlineVariant: string;
  surfaceBright: string;
  surfaceDim: string;
  surfaceContainer: string;
  surfaceContainerHigh: string;
  surfaceContainerHighest: string;
  surfaceContainerLow: string;
  surfaceContainerLowest: string;
  surfaceTint: string;
};

export type DynamicColorScheme = {
  light: ColorScheme;
  dark: ColorScheme;
};

export interface Spec extends TurboModule {
  getDynamicColorScheme(): DynamicColorScheme;
}

export default TurboModuleRegistry.getEnforcing<Spec>('DynamicTheme');
