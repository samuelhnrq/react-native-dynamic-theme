# react-native-dynamic-theme

A React Native library for retrieving dynamic themes from Android devices, ensuring seamless theme adaptation for a better user experience.

## Features

- 📱 **System-Aware**: Automatically adapts to the system's light or dark mode.
- 🎨 **Material You Support**: Leverages Android's dynamic theming for a native feel.
- ⚡ **Optimized Performance**: Uses efficient hooks and memoization to minimize re-renders.
- 🚀 **Simple API**: Easy integration with just a few lines of code.

## Installation

Install the package using npm:

```sh
npm install react-native-dynamic-theme
```

## Usage

Import the necessary dependencies and use the library to retrieve the dynamic color scheme based on the system theme:

```tsx
import { useMemo } from 'react';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import {
  getDynamicColorScheme,
  type DynamicColorScheme,
  type ColorScheme,
} from 'react-native-dynamic-theme';

const SampleUsage = () => {
  const dynamicColorScheme = getDynamicColorScheme() as DynamicColorScheme;
  const systemColorScheme = useColorScheme();

  const colors = useMemo<ColorScheme>(() => {
    return systemColorScheme === 'dark'
      ? dynamicColorScheme.dark
      : dynamicColorScheme.light;
  }, [systemColorScheme]);

  if (!dynamicColorScheme) {
    return (
      <View style={styles.container}>
        <Text>iOS Device (not supported)</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.onBackground }]}>
        Welcome to Dynamic Theme
      </Text>
      <Text style={[styles.subtitle, { color: colors.onSurface }]}>
        This app dynamically adapts to your system theme.
      </Text>
      <View style={[styles.button, { backgroundColor: colors.primary }]}>
        <Text style={[styles.buttonText, { color: colors.onPrimary }]}>
          Get Started
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: 16,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 4,
  },
  buttonText: {
    fontWeight: 'bold',
  },
});

export default SampleUsage;
```

## Types

### `ColorScheme`

Represents the color scheme used in both light and dark modes.

```tsx
type ColorScheme = {
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
```

### `DynamicColorScheme`

Defines the dynamic color scheme containing both light and dark mode configurations.

```tsx
type DynamicColorScheme = {
  light: ColorScheme;
  dark: ColorScheme;
};
```

## Roadmap 🛤️

- ✅ Initial Release
- 🚀 Support for iOS (Planned)
- 🌈 Custom Theme Overrides
- 🔌 Expo Compatibility

## Contributing

We welcome contributions! To get started, check out our [contributing guide](CONTRIBUTING.md).

## License

This project is licensed under the MIT License.

---

Built with ❤️ and [create-react-native-library](https://github.com/callstack/react-native-builder-bob).
