---
sidebar_position: 2
---

# API Reference

Complete API documentation for React Native Dynamic Theme.

## Functions

### `getDynamicColorScheme(fallbackColor?: string)`

Retrieves the dynamic color scheme from the device or generates one from a fallback color.

**Parameters:**
- `fallbackColor` (optional): Hex color string to use as fallback on unsupported platforms or older Android versions

**Returns:** `DynamicColorScheme | null`
- Returns the device's dynamic color scheme on Android 12+
- Returns generated scheme from fallbackColor on older Android versions or iOS
- Returns `null` if no fallback is provided and device doesn't support dynamic theming

**Example:**
```tsx
import { getDynamicColorScheme } from 'react-native-dynamic-theme';

// Use device colors with fallback
const colors = getDynamicColorScheme('#FF5722');

// Use device colors or null
const colors = getDynamicColorScheme();
if (colors) {
  // Use colors.light or colors.dark
}
```

### `getExtendedDynamicSchemeFromSourceColor(sourceColor: string)`

Generates a complete dynamic color scheme from any source color.

**Parameters:**
- `sourceColor`: Hex color string (e.g., '#FF5722')

**Returns:** `DynamicColorScheme`
- Complete light and dark color schemes generated from the source color

**Example:**
```tsx
import { getExtendedDynamicSchemeFromSourceColor } from 'react-native-dynamic-theme';

const scheme = getExtendedDynamicSchemeFromSourceColor('#2196F3');
const lightColors = scheme.light;
const darkColors = scheme.dark;
```

### `getExtendedDynamicScheme(fallbackColor?: string)`

Gets the device's dynamic scheme with additional contrast variants and tonal palettes.

**Parameters:**
- `fallbackColor` (optional): Hex color string for fallback

**Returns:** `ExtendedDynamicScheme`
- Includes standard light/dark schemes plus medium/high contrast variants
- Complete tonal palettes for all color groups
- Source color information

**Example:**
```tsx
import { getExtendedDynamicScheme } from 'react-native-dynamic-theme';

const extendedScheme = getExtendedDynamicScheme('#4CAF50');

// Access different contrast levels
const lightColors = extendedScheme.schemes.light;
const darkColors = extendedScheme.schemes.dark;
const lightMediumContrast = extendedScheme.schemes.lightMediumContrast;
const darkHighContrast = extendedScheme.schemes.darkHighContrast;

// Access tonal palettes
const primaryPalette = extendedScheme.palettes.primary;
const neutralPalette = extendedScheme.palettes.neutral;
```

### `getExtendedDynamicColorSchemeFromSourceColor(sourceColor: string)`

Alias for `getExtendedDynamicSchemeFromSourceColor` - returns only the light/dark schemes.

## Types

### `ColorScheme`

Represents a complete Material 3 color scheme (light or dark).

```typescript
interface ColorScheme {
  // Primary colors
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  inversePrimary: string;
  
  // Secondary colors
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  
  // Tertiary colors
  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;
  
  // Error colors
  error: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;
  
  // Background and surface colors
  background: string;
  onBackground: string;
  surface: string;
  onSurface: string;
  surfaceVariant: string;
  onSurfaceVariant: string;
  surfaceTint: string;
  
  // Surface container colors
  surfaceDim: string;
  surfaceBright: string;
  surfaceContainer: string;
  surfaceContainerHigh: string;
  surfaceContainerHighest: string;
  surfaceContainerLow: string;
  surfaceContainerLowest: string;
  
  // Inverse colors
  inverseSurface: string;
  inverseOnSurface: string;
  
  // Outline colors
  outline: string;
  outlineVariant: string;
  
  // Other
  scrim: string;
}
```

### `DynamicColorScheme`

Contains both light and dark color schemes.

```typescript
interface DynamicColorScheme {
  light: ColorScheme;
  dark: ColorScheme;
}
```

### `ExtendedDynamicScheme`

Complete dynamic scheme with additional contrast variants and tonal palettes.

```typescript
interface ExtendedDynamicScheme {
  sourceColor: string;
  schemes: {
    light: ColorScheme;
    dark: ColorScheme;
    lightMediumContrast: ColorScheme;
    lightHighContrast: ColorScheme;
    darkMediumContrast: ColorScheme;
    darkHighContrast: ColorScheme;
  };
  palettes: {
    primary: TonalColorPalette;
    secondary: TonalColorPalette;
    tertiary: TonalColorPalette;
    neutral: TonalColorPalette;
    neutralVariant: TonalColorPalette;
    error: TonalColorPalette;
  };
}
```

### `TonalColorPalette`

Represents a complete tonal palette with all tone values.

```typescript
interface TonalColorPalette {
  0: string;   // Black
  5: string;
  10: string;
  15: string;
  20: string;
  25: string;
  30: string;
  35: string;
  40: string;
  50: string;
  60: string;
  70: string;
  80: string;
  90: string;
  95: string;
  98: string;
  99: string;
  100: string; // White
  }
```

## Usage Patterns

### Basic Theme Provider Pattern

```tsx
import React, { createContext, useContext, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { getDynamicColorScheme, ColorScheme } from 'react-native-dynamic-theme';

interface ThemeContextType {
  colors: ColorScheme;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemColorScheme = useColorScheme();
  const dynamicColors = getDynamicColorScheme('#006971');
  
  const isDark = systemColorScheme === 'dark';
  const colors = isDark ? dynamicColors.dark : dynamicColors.light;
  
  return (
    <ThemeContext.Provider value={{ colors, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
```

### Custom Hook for Dynamic Colors

```tsx
import { useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { getDynamicColorScheme, ColorScheme } from 'react-native-dynamic-theme';

export const useDynamicColors = (fallbackColor = '#006971'): ColorScheme => {
  const systemColorScheme = useColorScheme();
  
  return useMemo(() => {
    const dynamicColors = getDynamicColorScheme(fallbackColor);
    return systemColorScheme === 'dark' 
      ? dynamicColors.dark 
      : dynamicColors.light;
  }, [systemColorScheme, fallbackColor]);
};
```

### Accessing Tonal Palettes

```tsx
import { getExtendedDynamicScheme } from 'react-native-dynamic-theme';

const scheme = getExtendedDynamicScheme('#FF5722');

// Access specific tones from palettes
const primaryTone40 = scheme.palettes.primary[40];  // Primary color
const primaryTone90 = scheme.palettes.primary[90];  // Primary container
const neutralTone10 = scheme.palettes.neutral[10];  // Dark background
const neutralTone99 = scheme.palettes.neutral[99];  // Light background
```

## Platform Behavior

### Android 12+ (API 31+)
- Uses device's actual dynamic color scheme from wallpaper
- Automatically updates when user changes wallpaper
- Supports all Material You color extraction algorithms

### Android < 12
- Falls back to generating scheme from provided fallback color
- Uses default teal color if no fallback provided
- Consistent Material 3 color relationships maintained

### iOS
- Always generates scheme from fallback color or default
- Provides same API for consistent cross-platform development
- Future iOS dynamic color support can be added seamlessly

## Error Handling

### Null Checks
```tsx
const colors = getDynamicColorScheme();
if (!colors) {
  // Handle unsupported platform
  return <UnsupportedPlatformFallback />;
}
```

### Invalid Color Handling
```tsx
try {
  const scheme = getExtendedDynamicSchemeFromSourceColor('#invalid');
} catch (error) {
  // Handle invalid color format
  console.error('Invalid color format:', error);
}
```

## Performance Considerations

### Memoization
Always memoize color schemes to prevent unnecessary recalculations:

```tsx
const colors = useMemo(() => {
  const scheme = getDynamicColorScheme('#006971');
  return isDark ? scheme.dark : scheme.light;
}, [isDark]);
```

### Component Optimization
```tsx
const ThemedComponent = React.memo(({ colors }: { colors: ColorScheme }) => {
  return (
    <View style={{ backgroundColor: colors.surface }}>
      <Text style={{ color: colors.onSurface }}>Optimized Component</Text>
    </View>
  );
});
```

## Migration Guide

### From v0.1.x to v0.2.x
- `getDynamicColorScheme()` now accepts optional fallback color parameter
- Added `getExtendedDynamicScheme()` for access to contrast variants and palettes
- All color values are now guaranteed to be valid hex strings
- Improved TypeScript definitions for better IDE support

## Common Issues

### Colors not updating on wallpaper change
This is expected behavior - the app needs to be restarted for new wallpaper colors to take effect on Android.

### TypeScript errors with color properties
Ensure you're using the latest version and have proper type imports:
```tsx
import type { ColorScheme, DynamicColorScheme } from 'react-native-dynamic-theme';
```

### Performance issues with frequent color changes
Use React.memo and useMemo to optimize re-renders:
```tsx
const MemoizedComponent = React.memo(YourComponent);
```