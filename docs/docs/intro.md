---
sidebar_position: 1
---

# Introduction

Welcome to **React Native Dynamic Theme** - the most comprehensive Material 3 dynamic theming solution for React Native applications.

## What is Dynamic Theming?

Dynamic theming is a design approach that allows your app's color scheme to automatically adapt to user preferences and system settings. With Material 3's "Material You" design system, apps can extract colors from the user's wallpaper and create personalized, harmonious color schemes.

## Why React Native Dynamic Theme?

### 🎨 Complete Material 3 Implementation
- **Full color system**: All 25+ semantic color roles
- **Tonal palettes**: Complete 13-tone palettes for every color group
- **Contrast variants**: Standard, medium, and high contrast support
- **Both themes**: Comprehensive light and dark mode support

### 📱 Platform-Aware
- **Android 12+**: Native Material You integration
- **Older Android**: Fallback theme generation
- **iOS**: Custom theme generation with same API
- **Consistent**: Same interface across all platforms

### ⚡ Developer Experience
- **TypeScript first**: Fully typed for better development
- **Performance optimized**: Efficient hooks and memoization
- **Easy integration**: Works with existing React Native apps
- **Comprehensive docs**: Examples, guides, and best practices

## How It Works

### 1. Color Extraction (Android 12+)
On supported devices, the library automatically extracts colors from the user's wallpaper using Android's Material You system.

### 2. Theme Generation
From any source color (wallpaper or custom), the library generates:
- Complete light and dark color schemes
- Multiple contrast levels for accessibility
- Full tonal palettes with 13 tone values each
- Proper color relationships following Material 3 guidelines

### 3. Automatic Adaptation
Your app automatically adapts to:
- System light/dark mode preferences
- User wallpaper changes (Android 12+)
- Accessibility settings (high contrast)
- Custom color selections

## Key Features

### Material You Support
```tsx
// Automatically uses device wallpaper colors on Android 12+
const colors = getDynamicColorScheme();
```

### Custom Theme Generation
```tsx
// Generate themes from any color
const scheme = getExtendedDynamicSchemeFromSourceColor('#FF5722');
```

### Complete Color System
```tsx
// Access all Material 3 color roles
const {
  primary, onPrimary,
  primaryContainer, onPrimaryContainer,
  secondary, tertiary, error,
  surface, background,
  // ... 25+ semantic colors
} = colors;
```

### Accessibility Support
```tsx
// Multiple contrast levels
const highContrastColors = extendedScheme.schemes.lightHighContrast;
```

### Tonal Palettes
```tsx
// Access complete tonal palettes
const primaryPalette = extendedScheme.palettes.primary;
const darkestPrimary = primaryPalette[10];  // Very dark
const lightestPrimary = primaryPalette[90]; // Very light
```

## Quick Example

Here's a simple example that demonstrates the core functionality:

```tsx
import React from 'react';
import { View, Text, useColorScheme } from 'react-native';
import { getDynamicColorScheme } from 'react-native-dynamic-theme';

const App = () => {
  const systemColorScheme = useColorScheme();
  const dynamicColors = getDynamicColorScheme('#006971');
  
  const colors = systemColorScheme === 'dark' 
    ? dynamicColors.dark 
    : dynamicColors.light;
  
  return (
    <View style={{ 
      backgroundColor: colors.background,
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Text style={{ 
        color: colors.onBackground,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16
      }}>
        Hello Material You! 🎨
      </Text>
      
      <View style={{
        backgroundColor: colors.primaryContainer,
        padding: 16,
        borderRadius: 12,
        marginBottom: 16
      }}>
        <Text style={{ color: colors.onPrimaryContainer }}>
          This adapts to your wallpaper!
        </Text>
      </View>
      
      <View style={{
        backgroundColor: colors.secondaryContainer,
        padding: 16,
        borderRadius: 12,
      }}>
        <Text style={{ color: colors.onSecondaryContainer }}>
          Harmonious colors everywhere
        </Text>
      </View>
    </View>
  );
};
```

## What You'll Learn

This documentation will guide you through:

### [Getting Started](./getting-started)
- Installation and basic setup
- First implementation
- Platform considerations

### [API Reference](./api)
- Complete function documentation
- Type definitions
- Usage patterns

### [Examples](./examples)
- Real-world implementations
- Navigation integration
- Component libraries

### [Advanced Usage](./advanced-usage)
- Theme providers and context
- Performance optimization
- Animation and transitions

### [Color System](./color-system)
- Material 3 principles
- Color roles and usage
- Accessibility guidelines

## Browser Support

React Native Dynamic Theme works on:

- **React Native**: 0.60+
- **Android**: API 21+ (dynamic colors on API 31+)
- **iOS**: 11.0+
- **TypeScript**: 4.0+

## Community and Support

- **GitHub**: [Source code and issues](https://github.com/FouadMagdy01/react-native-dynamic-theme)
- **npm**: [Package repository](https://www.npmjs.com/package/react-native-dynamic-theme)
- **Discussions**: [GitHub Discussions](https://github.com/FouadMagdy01/react-native-dynamic-theme/discussions)

## Contributing

React Native Dynamic Theme is open source and welcomes contributions! Whether you want to:

- Report bugs
- Request features
- Improve documentation
- Submit code changes

Check out our [contribution guidelines](https://github.com/FouadMagdy01/react-native-dynamic-theme/blob/main/CONTRIBUTING.md) to get started.

## Next Steps

Ready to add dynamic theming to your app? Start with our [Getting Started guide](./getting-started) or explore the [examples](./examples) to see what's possible.

---

*Built with ❤️ for the React Native community*