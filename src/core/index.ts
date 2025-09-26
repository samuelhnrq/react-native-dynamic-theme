import { Platform, TurboModuleRegistry } from 'react-native';
import type { DynamicColorScheme, Spec } from '../NativeDynamicTheme';
import {
  createAdditionalDynamicColorSchemeFromSourceColor,
  createDynamicColorSchemeFromSourceColor,
} from '../utils/dynamicColorSchemeUtils';
import { DEFAULT_SOURCE_COLOR } from '../constants/dynamicColorSchemeConstants';
import type { ExtendedDynamicScheme } from '../types/colorSchemeTypes';
import { createExtendedTonalPalettesFromSourceColor } from '../utils/tonalPaletteUtils';

export const getExtendedDynamicSchemeFromSourceColor = (
  sourceColor: string
) => {
  const dynamicScheme = createDynamicColorSchemeFromSourceColor(sourceColor);

  const additionalDynamicColorSchemes =
    createAdditionalDynamicColorSchemeFromSourceColor(sourceColor);
  const tonalPalettesVariants =
    createExtendedTonalPalettesFromSourceColor(sourceColor);
  return {
    sourceColor: sourceColor,
    palettes: tonalPalettesVariants,
    schemes: {
      ...dynamicScheme,
      ...additionalDynamicColorSchemes,
    },
  };
};

export const getExtendedDynamicColorSchemeFromSourceColor = (
  sourceColor: string
): DynamicColorScheme => {
  return createDynamicColorSchemeFromSourceColor(sourceColor);
};

export const getDynamicColorScheme = (
  fallbackColor?: string | undefined
): DynamicColorScheme => {
  if (Platform.OS === 'android' && Platform.Version >= 31) {
    const module = TurboModuleRegistry.getEnforcing<Spec>('DynamicTheme');
    return module.getDynamicColorScheme();
  } else if (fallbackColor) {
    return createDynamicColorSchemeFromSourceColor(fallbackColor);
  } else {
    return createDynamicColorSchemeFromSourceColor(DEFAULT_SOURCE_COLOR);
  }
};

export const getExtendedDynamicScheme = (
  fallbackColor?: string | undefined
): ExtendedDynamicScheme => {
  const dynamicScheme = getDynamicColorScheme(fallbackColor);

  const primaryLightColor = dynamicScheme.light.primary;
  const additionalDynamicColorSchemes =
    createAdditionalDynamicColorSchemeFromSourceColor(primaryLightColor);
  const tonalPalettesVariants =
    createExtendedTonalPalettesFromSourceColor(primaryLightColor);
  return {
    sourceColor: primaryLightColor,
    palettes: tonalPalettesVariants,
    schemes: {
      ...dynamicScheme,
      ...additionalDynamicColorSchemes,
    },
  };
};
