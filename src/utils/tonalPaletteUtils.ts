import {
  CorePalette,
  type TonalPalette,
  argbFromHex,
  hexFromArgb,
} from '@material/material-color-utilities';
import { TONES } from '../constants/tonalPaletteConstants';
import type {
  ExtendedTonalPalettes,
  TonalColorPalette,
} from '../types/tonalPaletteTypes';

export const createTonalColorPalette = (
  palette: TonalPalette
): TonalColorPalette => {
  let tonalColorPalette = {} as TonalColorPalette;

  TONES.forEach((tone, _) => {
    const argbColorForTone = palette.tone(tone);
    const hexColorForTone = hexFromArgb(argbColorForTone);
    tonalColorPalette = { ...tonalColorPalette, [tone]: hexColorForTone };
  });

  return tonalColorPalette;
};

export const createExtendedTonalPalettesFromSourceColor = (
  sourceColor: string
): ExtendedTonalPalettes => {
  const sourceColorArgb = argbFromHex(sourceColor);
  const corePalette = CorePalette.of(sourceColorArgb);
  const primaryCorePalette = createTonalColorPalette(corePalette.a1);
  const secondaryPalette = createTonalColorPalette(corePalette.a2);
  const tertiaryPalette = createTonalColorPalette(corePalette.a3);
  const neuturalPalette = createTonalColorPalette(corePalette.n1);
  const neuturalPaletteVariant = createTonalColorPalette(corePalette.n2);
  const errorPalette = createTonalColorPalette(corePalette.error);
  return {
    primary: primaryCorePalette,
    secondary: secondaryPalette,
    tertiary: tertiaryPalette,
    neutral: neuturalPalette,
    neutralVariant: neuturalPaletteVariant,
    error: errorPalette,
  };
};
