# React Native Dynamic Theme 🎨

**Bring Material 3 Dynamic Theming to Your React Native Apps**

A powerful React Native library that enables seamless Material 3 dynamic theming, automatically adapting to your users' system preferences and wallpaper colors on Android 12+.

[![npm version](https://badge.fury.io/js/react-native-dynamic-theme.svg)](https://badge.fury.io/js/react-native-dynamic-theme)
[![npm downloads](https://img.shields.io/npm/dm/react-native-dynamic-theme.svg)](https://www.npmjs.com/package/react-native-dynamic-theme)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 📱 **System-Aware**: Automatically adapts to light/dark mode
- 🎨 **Material You Support**: Leverages Android's dynamic theming for native feel
- 🎯 **Complete Color Palettes**: Access to full tonal palettes with all contrast levels
- ⚡ **Performance Optimized**: Efficient hooks and memoization
- 🔧 **Custom Color Generation**: Create themes from any source color
- 📦 **TypeScript Support**: Fully typed for better development experience
- 🌈 **Extended Schemes**: Medium and high contrast variants included

## 🚀 Quick Start

### Installation

```bash
npm install react-native-dynamic-theme
```

or

```bash
yarn add react-native-dynamic-theme
```

### Basic Usage

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
    <View style={{ backgroundColor: colors.background, flex: 1 }}>
      <Text style={{ color: colors.onBackground }}>
        Hello Material You! 🎨
      </Text>
    </View>
  );
};

export default App;
```

## 📖 Documentation

**📚 [Complete Documentation](https://react-native-dynamic-theme.vercel.app)**

- [Getting Started](https://react-native-dynamic-theme.vercel.app/docs/getting-started)
- [API Reference](https://react-native-dynamic-theme.vercel.app/docs/api)
- [Examples](https://react-native-dynamic-theme.vercel.app/docs/examples)
- [Advanced Usage](https://react-native-dynamic-theme.vercel.app/docs/advanced-usage)
- [Color System Guide](https://react-native-dynamic-theme.vercel.app/docs/color-system)

## 🎯 Key Functions

### `getDynamicColorScheme(fallbackColor?: string)`

Retrieves the dynamic color scheme from the device or generates one from a fallback color.

```tsx
// Uses device wallpaper colors on Android 12+, fallback on older versions
const colors = getDynamicColorScheme('#006971');

// Returns null if no fallback provided and device doesn't support dynamic theming  
const colors = getDynamicColorScheme();
```

### `getExtendedDynamicScheme(fallbackColor?: string)`

Gets extended scheme with contrast variants and tonal palettes.

```tsx
const extendedScheme = getExtendedDynamicScheme('#006971');

// Access different contrast levels
const standardColors = extendedScheme.schemes.light;
const highContrastColors = extendedScheme.schemes.lightHighContrast;

// Access tonal palettes
const primaryPalette = extendedScheme.palettes.primary;
```

### `getExtendedDynamicSchemeFromSourceColor(sourceColor: string)`

Generate complete theme from any source color.

```tsx
const customScheme = getExtendedDynamicSchemeFromSourceColor('#FF5722');
```

## 🎨 Example: Theme Switcher

```tsx
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, useColorScheme } from 'react-native';
import { getExtendedDynamicSchemeFromSourceColor } from 'react-native-dynamic-theme';

const ThemeSwitcher = () => {
  const systemColorScheme = useColorScheme();
  const [sourceColor, setSourceColor] = useState('#006971');
  
  const colorOptions = ['#006971', '#FF5722', '#2196F3', '#9C27B0'];
  const dynamicScheme = getExtendedDynamicSchemeFromSourceColor(sourceColor);
  const colors = systemColorScheme === 'dark' 
    ? dynamicScheme.dark 
    : dynamicScheme.light;

  return (
    <View style={{ backgroundColor: colors.background, flex: 1, padding: 20 }}>
      <Text style={{ color: colors.onBackground, fontSize: 24, marginBottom: 20 }}>
        Pick a Color Theme
      </Text>
      
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        {colorOptions.map((color) => (
          <TouchableOpacity
            key={color}
            style={{
              backgroundColor: color,
              width: 50,
              height: 50,
              borderRadius: 25,
              marginRight: 10,
              borderWidth: sourceColor === color ? 3 : 0,
              borderColor: colors.outline,
            }}
            onPress={() => setSourceColor(color)}
          />
        ))}
      </View>
      
      <View style={{
        backgroundColor: colors.primaryContainer,
        padding: 16,
        borderRadius: 12,
      }}>
        <Text style={{ color: colors.onPrimaryContainer }}>
          This container adapts to your selected color!
        </Text>
      </View>
    </View>
  );
};
```

## 🔧 Platform Support

- **React Native**: 0.60+
- **Android**: API 21+ (dynamic colors on API 31+)
- **iOS**: 11.0+ (custom color generation)
- **TypeScript**: 4.0+

### Platform Behavior

- **Android 12+**: Uses actual device wallpaper colors via Material You
- **Android < 12**: Generates theme from fallback color
- **iOS**: Generates theme from fallback color (Material You not available)

## 🎨 Material 3 Color System

The library provides access to the complete Material 3 color system:

### Semantic Color Roles
- Primary, Secondary, Tertiary colors and their containers
- Error colors and containers  
- Background and surface colors
- Surface containers at different elevation levels
- Outline colors for borders and dividers

### Example Color Usage
```tsx
const { colors } = useTheme();

// Main actions
backgroundColor: colors.primary
color: colors.onPrimary

// Supporting actions  
backgroundColor: colors.secondaryContainer
color: colors.onSecondaryContainer

// Error states
backgroundColor: colors.errorContainer
color: colors.onErrorContainer

// Surfaces
backgroundColor: colors.surface
color: colors.onSurface
```

## 🛠 Advanced Usage

### Theme Provider Pattern

```tsx
import React, { createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';
import { getDynamicColorScheme } from 'react-native-dynamic-theme';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const dynamicColors = getDynamicColorScheme('#006971');
  
  const colors = systemColorScheme === 'dark' 
    ? dynamicColors.dark 
    : dynamicColors.light;
  
  return (
    <ThemeContext.Provider value={{ colors, isDark: systemColorScheme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
```

### Performance Optimization

```tsx
import { useMemo } from 'react';

const MyComponent = ({ sourceColor }) => {
  // Memoize expensive color calculations
  const colors = useMemo(() => {
    return getDynamicColorScheme(sourceColor);
  }, [sourceColor]);
  
  return <View style={{ backgroundColor: colors.light.background }} />;
};
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Material Color Utilities](https://github.com/material-foundation/material-color-utilities)
- Inspired by Android's Material You design system
- Thanks to the React Native community

## 📞 Support

- **Documentation**: [https://react-native-dynamic-theme.vercel.app](https://react-native-dynamic-theme.vercel.app)
- **Issues**: [GitHub Issues](https://github.com/FouadMagdy01/react-native-dynamic-theme/issues)
- **Discussions**: [GitHub Discussions](https://github.com/FouadMagdy01/react-native-dynamic-theme/discussions)

---

**Made with ❤️ by [Fouad Magdy](https://github.com/FouadMagdy01)**