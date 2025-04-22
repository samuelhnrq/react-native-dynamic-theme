import {
  argbFromHex,
  Hct,
  hexFromArgb,
  SchemeTonalSpot,
} from '@material/material-color-utilities';
import type { ColorScheme, DynamicColorScheme } from '../NativeDynamicTheme';
import { CONTRAST_LEVEL } from '../constants/dynamicColorSchemeConstants';
import type {
  AdditionalDynamicColorSchemes,
  ExtendedDynamicColorScheme,
} from '../types/colorSchemeTypes';

const convertDynamicSchemeTohex = (scheme: SchemeTonalSpot): ColorScheme => {
  return {
    primary: hexFromArgb(scheme.primary),
    surfaceTint: hexFromArgb(scheme.primary),
    onPrimary: hexFromArgb(scheme.onPrimary),
    primaryContainer: hexFromArgb(scheme.primaryContainer),
    onPrimaryContainer: hexFromArgb(scheme.onPrimaryContainer),
    secondary: hexFromArgb(scheme.secondary),
    onSecondary: hexFromArgb(scheme.onSecondary),
    secondaryContainer: hexFromArgb(scheme.secondaryContainer),
    onSecondaryContainer: hexFromArgb(scheme.onSecondaryContainer),
    tertiary: hexFromArgb(scheme.tertiary),
    onTertiary: hexFromArgb(scheme.onTertiary),
    tertiaryContainer: hexFromArgb(scheme.tertiaryContainer),
    onTertiaryContainer: hexFromArgb(scheme.onTertiaryContainer),
    error: hexFromArgb(scheme.error),
    onError: hexFromArgb(scheme.onError),
    errorContainer: hexFromArgb(scheme.errorContainer),
    onErrorContainer: hexFromArgb(scheme.onErrorContainer),
    background: hexFromArgb(scheme.background),
    onBackground: hexFromArgb(scheme.onBackground),
    surface: hexFromArgb(scheme.surface),
    onSurface: hexFromArgb(scheme.onSurface),
    surfaceVariant: hexFromArgb(scheme.surfaceVariant),
    onSurfaceVariant: hexFromArgb(scheme.onSurfaceVariant),
    outline: hexFromArgb(scheme.outline),
    outlineVariant: hexFromArgb(scheme.outlineVariant),
    scrim: hexFromArgb(scheme.scrim),
    inverseSurface: hexFromArgb(scheme.inverseSurface),
    inverseOnSurface: hexFromArgb(scheme.inverseOnSurface),
    inversePrimary: hexFromArgb(scheme.inversePrimary),
    surfaceDim: hexFromArgb(scheme.surfaceDim),
    surfaceBright: hexFromArgb(scheme.surfaceBright),
    surfaceContainerLowest: hexFromArgb(scheme.surfaceContainerLowest),
    surfaceContainerLow: hexFromArgb(scheme.surfaceContainerLow),
    surfaceContainer: hexFromArgb(scheme.surfaceContainer),
    surfaceContainerHigh: hexFromArgb(scheme.surfaceContainerHigh),
    surfaceContainerHighest: hexFromArgb(scheme.surfaceContainerHighest),
  };
};

export const createDynamicColorSchemeFromSourceColor = (
  sourceColor: string
): DynamicColorScheme => {
  const sourceColorArgb = argbFromHex(sourceColor);
  const lightDynamicScheme = new SchemeTonalSpot(
    Hct.fromInt(sourceColorArgb),
    false,
    CONTRAST_LEVEL.STANDARD
  );

  const darkDynamicScheme = new SchemeTonalSpot(
    Hct.fromInt(sourceColorArgb),
    true,
    CONTRAST_LEVEL.STANDARD
  );

  return {
    dark: convertDynamicSchemeTohex(darkDynamicScheme),
    light: convertDynamicSchemeTohex(lightDynamicScheme),
  };
};

export const createAdditionalDynamicColorSchemeFromSourceColor = (
  sourceColor: string
): AdditionalDynamicColorSchemes => {
  const sourceColorArgb = argbFromHex(sourceColor);

  const lightMediumContrastScheme = new SchemeTonalSpot(
    Hct.fromInt(sourceColorArgb),
    false,
    CONTRAST_LEVEL.MEDIUM
  );

  const darkMediumContrastScheme = new SchemeTonalSpot(
    Hct.fromInt(sourceColorArgb),
    true,
    CONTRAST_LEVEL.MEDIUM
  );

  const lightHighContrastScheme = new SchemeTonalSpot(
    Hct.fromInt(sourceColorArgb),
    false,
    CONTRAST_LEVEL.HIGH
  );

  const darkHighContrastScheme = new SchemeTonalSpot(
    Hct.fromInt(sourceColorArgb),
    true,
    CONTRAST_LEVEL.HIGH
  );

  return {
    darkMediumContrast: convertDynamicSchemeTohex(darkMediumContrastScheme),
    darkHighContrast: convertDynamicSchemeTohex(darkHighContrastScheme),
    lightMediumContrast: convertDynamicSchemeTohex(lightMediumContrastScheme),
    lightHighContrast: convertDynamicSchemeTohex(lightHighContrastScheme),
  };
};
