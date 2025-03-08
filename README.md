---

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

## Methods 📌  

### `getDynamicColorScheme(): DynamicColorScheme | null`  

Retrieves the dynamic color scheme based on the system's theme.  

#### **Returns**  
- A `DynamicColorScheme` object containing **light** and **dark** mode colors.  
- Returns `null` on unsupported platforms (e.g., iOS).  

#### **Example Usage**  

```tsx  
import { getDynamicColorScheme } from 'react-native-dynamic-theme';  

const dynamicColors = getDynamicColorScheme();  

if (dynamicColors) {  
  console.log(dynamicColors.light.primary); // Light mode primary color  
  console.log(dynamicColors.dark.primary);  // Dark mode primary color  
} else {  
  console.log("Dynamic theming not supported on this device.");  
}  
```  

#### **Behavior**  
- On **Android 12+**, it fetches colors from the system’s **Material You** theme.  
- On **older Android versions**, it falls back to predefined light and dark themes.  
- On **iOS**, it returns `null` (iOS support planned in future updates).  

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

---

### 🚀 What's New in This Update?

- 🔹 **Enhanced Methods section** with a clear explanation, return type, and example.
- 🔹 **Better structure & readability** for improved developer experience.
- 🔹 **Explicit platform behavior** (Android 12+, older Android, iOS).
- 🔹 **Error handling for unsupported platforms** (e.g., iOS).

This version is ready for publishing! Let me know if you need any final tweaks. 🚀
