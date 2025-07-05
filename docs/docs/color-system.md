---
sidebar_position: 5
---

# Material 3 Color System

Understanding the Material 3 color system and how to use it effectively with React Native Dynamic Theme.

## Overview

Material 3 introduces a new approach to color that emphasizes personal expression while maintaining usability and accessibility. The system is built around **tonal palettes** that generate harmonious color schemes from a single source color.

## Core Concepts

### Source Color
The **source color** is the foundation of your color scheme. It can come from:
- User's wallpaper (Android 12+ Material You)
- Brand colors
- Custom selections
- Image extraction

```tsx
import { getExtendedDynamicSchemeFromSourceColor } from 'react-native-dynamic-theme';

// Generate scheme from brand color
const scheme = getExtendedDynamicSchemeFromSourceColor('#1976D2');
```

### Tonal Palettes

Each color scheme generates **6 tonal palettes**:

1. **Primary** - Main brand color and its tones
2. **Secondary** - Complementary color for accents
3. **Tertiary** - Contrasting accent color
4. **Error** - Error states and warnings
5. **Neutral** - Surface and background colors
6. **Neutral Variant** - Subtle backgrounds and outlines

Each palette contains **13 tone values** from 0 (black) to 100 (white):

```tsx
import { getExtendedDynamicScheme } from 'react-native-dynamic-theme';

const scheme = getExtendedDynamicScheme('#FF5722');

// Access specific tones
const primaryDark = scheme.palettes.primary[20];    // Dark primary
const primaryNormal = scheme.palettes.primary[40];  // Normal primary
const primaryLight = scheme.palettes.primary[80];   // Light primary container

// Available tones: 0, 5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100
```

## Color Roles

Material 3 defines **semantic color roles** that ensure proper contrast and usability:

### Primary Colors
```tsx
// Primary colors for main actions and branding
{
  primary: string;           // Main brand color
  onPrimary: string;         // Text/icons on primary
  primaryContainer: string;  // Prominent containers
  onPrimaryContainer: string; // Text/icons on primary container
  inversePrimary: string;    // Primary color in dark theme
}
```

### Secondary Colors
```tsx
// Secondary colors for less prominent actions
{
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
}
```

### Tertiary Colors
```tsx
// Tertiary colors for contrasting accents
{
  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;
}
```

### Surface Colors
```tsx
// Surface colors for backgrounds and containers
{
  background: string;           // Main background
  onBackground: string;         // Text on background
  surface: string;              // Component backgrounds
  onSurface: string;           // Text on surface
  surfaceVariant: string;      // Subtle surface variation
  onSurfaceVariant: string;    // Text on surface variant
  
  // Surface containers (elevation levels)
  surfaceContainerLowest: string;  // Level 0
  surfaceContainerLow: string;     // Level 1
  surfaceContainer: string;        // Level 2
  surfaceContainerHigh: string;    // Level 3
  surfaceContainerHighest: string; // Level 4
}
```

## Usage Guidelines

### When to Use Each Color

#### Primary
- Main actions (floating action buttons, prominent buttons)
- Active states (selected items, progress indicators)
- Brand elements

```tsx
<TouchableOpacity style={{
  backgroundColor: colors.primary,
  // Use for main call-to-action buttons
}}>
  <Text style={{ color: colors.onPrimary }}>
    Sign Up
  </Text>
</TouchableOpacity>
```

#### Secondary
- Less prominent actions
- Filter chips and toggles
- Secondary navigation

```tsx
<View style={{
  backgroundColor: colors.secondaryContainer,
  // Use for secondary actions and containers
}}>
  <Text style={{ color: colors.onSecondaryContainer }}>
    Filter Options
  </Text>
</View>
```

#### Tertiary
- Contrasting accents
- Highlighting content
- Input field accents

```tsx
<View style={{
  backgroundColor: colors.tertiaryContainer,
  // Use for contrasting elements that need attention
}}>
  <Text style={{ color: colors.onTertiaryContainer }}>
    New Feature!
  </Text>
</View>
```

#### Surface Containers
Different elevation levels for layered interfaces:

```tsx
// Level 0 - Lowest elevation
<View style={{ backgroundColor: colors.surfaceContainerLowest }}>
  <Text>Base content</Text>
</View>

// Level 1 - Cards at rest
<View style={{ backgroundColor: colors.surfaceContainerLow }}>
  <Text>Card content</Text>
</View>

// Level 2 - Raised cards
<View style={{ backgroundColor: colors.surfaceContainer }}>
  <Text>Elevated card</Text>
</View>

// Level 3 - Dialogs and menus
<View style={{ backgroundColor: colors.surfaceContainerHigh }}>
  <Text>Dialog content</Text>
</View>

// Level 4 - Navigation drawers
<View style={{ backgroundColor: colors.surfaceContainerHighest }}>
  <Text>Navigation content</Text>
</View>
```

## Contrast Levels

Material 3 supports multiple contrast levels for accessibility:

```tsx
import { getExtendedDynamicScheme } from 'react-native-dynamic-theme';

const scheme = getExtendedDynamicScheme('#006971');

// Standard contrast (default)
const standardColors = scheme.schemes.light;

// Medium contrast (enhanced readability)
const mediumContrastColors = scheme.schemes.lightMediumContrast;

// High contrast (maximum accessibility)
const highContrastColors = scheme.schemes.lightHighContrast;

// Choose based on user preference or accessibility needs
const colors = userNeedsHighContrast 
  ? highContrastColors 
  : standardColors;
```

## Color Harmonies

Material 3 automatically creates harmonious color relationships:

### Analogous Colors
Colors that are adjacent on the color wheel:

```tsx
const scheme = getExtendedDynamicScheme('#2196F3'); // Blue

// These will be harmonious
const primary = scheme.schemes.light.primary;     // Blue
const secondary = scheme.schemes.light.secondary; // Blue-green
const tertiary = scheme.schemes.light.tertiary;   // Blue-purple
```

### Complementary Accents
The tertiary color provides complementary contrast:

```tsx
const warmScheme = getExtendedDynamicScheme('#FF5722'); // Orange

// Orange primary with blue-green tertiary for contrast
const warmPrimary = warmScheme.schemes.light.primary;   // Orange
const coolAccent = warmScheme.schemes.light.tertiary;   // Blue-green
```

## Custom Color Mappings

Map Material 3 colors to your design system:

```tsx
import { ColorScheme } from 'react-native-dynamic-theme';

// Create semantic color mappings
export const createSemanticColors = (colors: ColorScheme) => ({
  // Status colors
  success: colors.tertiary,           // Use tertiary for success
  warning: colors.error,              // Error palette for warnings
  info: colors.secondary,             // Secondary for info
  error: colors.error,                // Primary error color
  
  // Interactive states
  link: colors.primary,               // Links use primary
  visited: colors.tertiary,           // Visited links use tertiary
  focus: colors.primary,              // Focus rings use primary
  
  // Content hierarchy
  textPrimary: colors.onSurface,      // Main text
  textSecondary: colors.onSurfaceVariant, // Supporting text
  textDisabled: colors.onSurface + '61', // 38% opacity
  
  // Borders and dividers
  border: colors.outline,             // Standard borders
  borderSubtle: colors.outlineVariant, // Subtle borders
  divider: colors.outlineVariant,     // Content dividers
});

// Usage
const MyComponent = () => {
  const { colors } = useTheme();
  const semanticColors = createSemanticColors(colors);
  
  return (
    <View style={{ borderColor: semanticColors.border }}>
      <Text style={{ color: semanticColors.textPrimary }}>
        Primary text
      </Text>
      <Text style={{ color: semanticColors.textSecondary }}>
        Secondary text
      </Text>
    </View>
  );
};
```

## Best Practices

### Accessibility
1. **Always use paired colors**: Use `onPrimary` text on `primary` backgrounds
2. **Test contrast ratios**: Ensure minimum 4.5:1 contrast for normal text
3. **Provide high contrast options**: Support users with visual impairments

```tsx
// ✅ Good - proper color pairing
<View style={{ backgroundColor: colors.primary }}>
  <Text style={{ color: colors.onPrimary }}>Readable text</Text>
</View>

// ❌ Bad - poor contrast
<View style={{ backgroundColor: colors.primary }}>
  <Text style={{ color: colors.secondary }}>Hard to read</Text>
</View>
```

### Consistency
1. **Use semantic roles**: Don't use colors arbitrarily
2. **Maintain hierarchy**: Primary for main actions, secondary for supporting
3. **Test both themes**: Ensure designs work in light and dark modes

### Performance
1. **Memoize color calculations**: Prevent unnecessary recalculations
2. **Use selective color hooks**: Only subscribe to needed colors
3. **Cache tonal palettes**: Store generated palettes for reuse

## Color Tools and Utilities

### Color Picker Component
```tsx
const ColorPicker = ({ onColorSelect }: { onColorSelect: (color: string) => void }) => {
  const presets = [
    '#006971', '#FF5722', '#2196F3', '#9C27B0',
    '#4CAF50', '#FF9800', '#E91E63', '#795548'
  ];

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {presets.map(color => (
        <TouchableOpacity
          key={color}
          style={{
            backgroundColor: color,
            width: 50,
            height: 50,
            borderRadius: 25,
            margin: 5,
          }}
          onPress={() => onColorSelect(color)}
        />
      ))}
    </View>
  );
};
```

### Palette Visualizer
```tsx
const PaletteVisualizer = ({ sourceColor }: { sourceColor: string }) => {
  const scheme = getExtendedDynamicScheme(sourceColor);
  
  return (
    <ScrollView>
      {Object.entries(scheme.palettes).map(([paletteName, palette]) => (
        <View key={paletteName}>
          <Text>{paletteName}</Text>
          <View style={{ flexDirection: 'row' }}>
            {Object.entries(palette).map(([tone, color]) => (
              <View
                key={tone}
                style={{
                  backgroundColor: color,
                  width: 30,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{
                  color: parseInt(tone) > 50 ? '#000' : '#FFF',
                  fontSize: 8,
                }}>
                  {tone}
                </Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};
```

Understanding and properly implementing the Material 3 color system ensures your app provides a cohesive, accessible, and beautiful user experience that adapts to user preferences while maintaining your brand identity.