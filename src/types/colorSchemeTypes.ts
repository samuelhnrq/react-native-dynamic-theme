import type { ColorScheme, DynamicColorScheme } from '../NativeDynamicTheme';
import type { ExtendedTonalPalettes } from './tonalPaletteTypes';

export interface AdditionalDynamicColorSchemes {
  lightMediumContrast: ColorScheme;
  lightHighContrast: ColorScheme;
  darkMediumContrast: ColorScheme;
  darkHighContrast: ColorScheme;
}

export interface ExtendedDynamicColorScheme
  extends DynamicColorScheme,
    AdditionalDynamicColorSchemes {}

export interface ExtendedDynamicScheme {
  sourceColor: string;
  schemes: ExtendedDynamicColorScheme;
  palettes: ExtendedTonalPalettes;
}
