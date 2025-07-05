---
sidebar_position: 1
---

# Getting Started

Welcome to React Native Dynamic Theme! This guide will help you integrate Material 3 dynamic theming into your React Native app in just a few minutes.

## Installation

Install the package using your preferred package manager:

```bash
npm install react-native-dynamic-theme
```

or

```bash
yarn add react-native-dynamic-theme
```

## Platform Setup

### Android

No additional setup required! The library automatically detects Android 12+ devices and uses the system's dynamic color scheme.

### iOS

While iOS doesn't support Material You dynamic theming natively, the library provides fallback functionality by generating themes from custom source colors.

## Basic Usage

Here's a simple example to get you started:

```tsx
import React from 'react';
import { View, Text, useColorScheme } from 'react-native';
import { getDynamicColorScheme } from 'react-native-dynamic-theme';

const App = () => {
  const systemColorScheme = useColorScheme();
  const dynamicColors = getDynamicColorScheme();
  
  if (!dynamicColors) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Dynamic theming not supported on this device</Text>
      </View>
    );
  }
  
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
          This container uses dynamic colors!
        </Text>
      </View>
      <View style={{
        backgroundColor: colors.secondaryContainer,
        padding: 16,
        borderRadius: 12,
      }}>
        <Text style={{ color: colors.onSecondaryContainer }}>
          So does this one!
        </Text>
      </View>
    </View>
  );
};

export default App;
```

## Using with Custom Source Colors

You can also generate dynamic themes from any source color:

```tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, useColorScheme } from 'react-native';
import { getExtendedDynamicSchemeFromSourceColor } from 'react-native-dynamic-theme';

const CustomThemeApp = () => {
  const systemColorScheme = useColorScheme();
  const [sourceColor, setSourceColor] = useState('#FF5722');
  
  const dynamicScheme = getExtendedDynamicSchemeFromSourceColor(sourceColor);
  const colors = systemColorScheme === 'dark' 
    ? dynamicScheme.dark 
    : dynamicScheme.light;
  
  const colorOptions = ['#FF5722', '#2196F3', '#4CAF50', '#9C27B0', '#FF9800'];
  
  return (
    <View style={{ backgroundColor: colors.background, flex: 1, padding: 20 }}>
      <Text style={{ 
        color: colors.onBackground,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
      }}>
        Custom Theme Generator
      </Text>
      
      <Text style={{ 
        color: colors.onSurfaceVariant,
        marginBottom: 16
      }}>
        Choose a source color:
      </Text>
      
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 }}>
        {colorOptions.map((color) => (
          <TouchableOpacity
            key={color}
            style={{
              backgroundColor: color,
              width: 50,
              height: 50,
              borderRadius: 25,
              marginRight: 10,
              marginBottom: 10,
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
        marginBottom: 16
      }}>
        <Text style={{ color: colors.onPrimaryContainer, fontWeight: 'bold' }}>
          Primary Container
        </Text>
        <Text style={{ color: colors.onPrimaryContainer }}>
          Generated from: {sourceColor}
        </Text>
      </View>
    </View>
  );
};
```

## Next Steps

- [Explore the complete API reference](./api)
- [Check out more examples](./examples)
- [Learn about advanced usage patterns](./advanced-usage)
- [Understand the color system](./color-system)

## Troubleshooting

### The colors don't change on my Android device

Make sure you're running Android 12 (API level 31) or higher. On older versions, the library will fall back to generating themes from a default source color.

### I'm getting TypeScript errors

Ensure you have the latest version of the library and that your TypeScript configuration includes the node_modules types:

```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "esModuleInterop": true
  }
}
```

### The app crashes on iOS

The library is compatible with iOS, but some features require proper error handling. Always check if `getDynamicColorScheme()` returns a valid result before using it.

Need more help? Check out our [GitHub Issues](https://github.com/FouadMagdy01/react-native-dynamic-theme/issues) or start a [Discussion](https://github.com/FouadMagdy01/react-native-dynamic-theme/discussions).