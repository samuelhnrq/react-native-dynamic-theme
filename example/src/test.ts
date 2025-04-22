import {
  themeFromSourceColor,
  argbFromHex,
  hexFromArgb,
  SchemeContent,
  Scheme,
  SchemeTonalSpot,
  DynamicScheme,
} from '@material/material-color-utilities';

// Define the source color
const sourceColor = '#3C2043';
const sourceColorArgb = argbFromHex(sourceColor);
console.log('Source color:', sourceColor);
console.log('Source color ARGB:', sourceColorArgb);

// Create the base theme
const theme = themeFromSourceColor(sourceColorArgb);
console.log('Theme created:', theme);

// Create a DynamicScheme for each variant to get all the surface container colors
const lightDynamicScheme = new DynamicScheme({
  sourceColorArgb: sourceColorArgb,
  variant: 0, // 0 for TonalSpot, which is the default Material 3 scheme
  contrastLevel: 0,
  isDark: false,
  primaryPalette: theme.palettes.primary,
  secondaryPalette: theme.palettes.secondary,
  tertiaryPalette: theme.palettes.tertiary,
  neutralPalette: theme.palettes.neutral,
  neutralVariantPalette: theme.palettes.neutralVariant,
});
console.log('Light dynamic scheme created:', lightDynamicScheme);

const darkDynamicScheme = new DynamicScheme({
  sourceColorArgb: sourceColorArgb,
  variant: 0,
  contrastLevel: 0,
  isDark: true,
  primaryPalette: theme.palettes.primary,
  secondaryPalette: theme.palettes.secondary,
  tertiaryPalette: theme.palettes.tertiary,
  neutralPalette: theme.palettes.neutral,
  neutralVariantPalette: theme.palettes.neutralVariant,
});
console.log('Dark dynamic scheme created:', darkDynamicScheme);

// Create contrast versions
const lightMediumContrastScheme = new DynamicScheme({
  sourceColorArgb: sourceColorArgb,
  variant: 0,
  contrastLevel: 0.5, // Medium contrast
  isDark: false,
  primaryPalette: theme.palettes.primary,
  secondaryPalette: theme.palettes.secondary,
  tertiaryPalette: theme.palettes.tertiary,
  neutralPalette: theme.palettes.neutral,
  neutralVariantPalette: theme.palettes.neutralVariant,
});
console.log('Light medium contrast scheme created:', lightMediumContrastScheme);

const lightHighContrastScheme = new DynamicScheme({
  sourceColorArgb: sourceColorArgb,
  variant: 0,
  contrastLevel: 1.0, // High contrast
  isDark: false,
  primaryPalette: theme.palettes.primary,
  secondaryPalette: theme.palettes.secondary,
  tertiaryPalette: theme.palettes.tertiary,
  neutralPalette: theme.palettes.neutral,
  neutralVariantPalette: theme.palettes.neutralVariant,
});
console.log('Light high contrast scheme created:', lightHighContrastScheme);

const darkMediumContrastScheme = new DynamicScheme({
  sourceColorArgb: sourceColorArgb,
  variant: 0,
  contrastLevel: 0.5,
  isDark: true,
  primaryPalette: theme.palettes.primary,
  secondaryPalette: theme.palettes.secondary,
  tertiaryPalette: theme.palettes.tertiary,
  neutralPalette: theme.palettes.neutral,
  neutralVariantPalette: theme.palettes.neutralVariant,
});
console.log('Dark medium contrast scheme created:', darkMediumContrastScheme);

const darkHighContrastScheme = new DynamicScheme({
  sourceColorArgb: sourceColorArgb,
  variant: 0,
  contrastLevel: 1.0,
  isDark: true,
  primaryPalette: theme.palettes.primary,
  secondaryPalette: theme.palettes.secondary,
  tertiaryPalette: theme.palettes.tertiary,
  neutralPalette: theme.palettes.neutral,
  neutralVariantPalette: theme.palettes.neutralVariant,
});
console.log('Dark high contrast scheme created:', darkHighContrastScheme);

// Helper function to convert a scheme to hex
function convertSchemeToHex(scheme: DynamicScheme) {
  return {
    primary: hexFromArgb(scheme.primary),
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
    shadow: hexFromArgb(scheme.shadow),
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
    primaryFixed: hexFromArgb(scheme.primaryFixed),
    primaryFixedDim: hexFromArgb(scheme.primaryFixedDim),
    onPrimaryFixed: hexFromArgb(scheme.onPrimaryFixed),
    onPrimaryFixedVariant: hexFromArgb(scheme.onPrimaryFixedVariant),
    secondaryFixed: hexFromArgb(scheme.secondaryFixed),
    secondaryFixedDim: hexFromArgb(scheme.secondaryFixedDim),
    onSecondaryFixed: hexFromArgb(scheme.onSecondaryFixed),
    onSecondaryFixedVariant: hexFromArgb(scheme.onSecondaryFixedVariant),
    tertiaryFixed: hexFromArgb(scheme.tertiaryFixed),
    tertiaryFixedDim: hexFromArgb(scheme.tertiaryFixedDim),
    onTertiaryFixed: hexFromArgb(scheme.onTertiaryFixed),
    onTertiaryFixedVariant: hexFromArgb(scheme.onTertiaryFixedVariant),
  };
}

// Helper to create palette maps
function createPaletteMap(palette: any) {
  const toneValues = [
    0, 5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100,
  ];
  const result: Record<string, string> = {};

  toneValues.forEach((tone) => {
    result[tone.toString()] = hexFromArgb(palette.tone(tone));
  });

  return result;
}

// Convert all schemes to hex
const lightColors = convertSchemeToHex(lightDynamicScheme);
const darkColors = convertSchemeToHex(darkDynamicScheme);
const lightMediumColors = convertSchemeToHex(lightMediumContrastScheme);
const lightHighColors = convertSchemeToHex(lightHighContrastScheme);
const darkMediumColors = convertSchemeToHex(darkMediumContrastScheme);
const darkHighColors = convertSchemeToHex(darkHighContrastScheme);

console.log('Light colors:', lightColors);
console.log('Dark colors:', darkColors);

// Create palette maps
const primaryPalette = createPaletteMap(theme.palettes.primary);
const secondaryPalette = createPaletteMap(theme.palettes.secondary);
const tertiaryPalette = createPaletteMap(theme.palettes.tertiary);
const neutralPalette = createPaletteMap(theme.palettes.neutral);
const neutralVariantPalette = createPaletteMap(theme.palettes.neutralVariant);

console.log('Primary palette:', primaryPalette);
console.log('Secondary palette:', secondaryPalette);
console.log('Tertiary palette:', tertiaryPalette);
console.log('Neutral palette:', neutralPalette);
console.log('Neutral variant palette:', neutralVariantPalette);

// Create the full theme object with all the variants
const completeTheme = {
  description: `TYPE: CUSTOM\nMaterial Theme Builder export ${new Date().toLocaleString()}`,
  seed: sourceColor,
  coreColors: {
    primary: sourceColor,
  },
  extendedColors: [],
  schemes: {
    'light': lightColors,
    'light-medium-contrast': lightMediumColors,
    'light-high-contrast': lightHighColors,
    'dark': darkColors,
    'dark-medium-contrast': darkMediumColors,
    'dark-high-contrast': darkHighColors,
  },
  palettes: {
    'primary': primaryPalette,
    'secondary': secondaryPalette,
    'tertiary': tertiaryPalette,
    'neutral': neutralPalette,
    'neutral-variant': neutralVariantPalette,
  },
};

// Output the complete theme as JSON
const themeJson = JSON.stringify(completeTheme, null, 4);
console.log('Complete theme JSON:');
console.log(themeJson);

export default completeTheme;
