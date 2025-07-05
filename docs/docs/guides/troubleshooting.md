---
sidebar_position: 2
---

# Troubleshooting

Common issues and solutions when using React Native Dynamic Theme.

## Installation Issues

### Module not found error

**Error:**
```
Module "react-native-dynamic-theme" could not be resolved
```

**Solutions:**
1. Ensure the package is properly installed:
   ```bash
   npm install react-native-dynamic-theme
   # or
   yarn add react-native-dynamic-theme
   ```

2. Clear your metro cache:
   ```bash
   npx react-native start --reset-cache
   ```

3. For React Native 0.60+, ensure auto-linking is working:
   ```bash
   npx react-native unlink react-native-dynamic-theme
   npx react-native link
   ```

### Android build issues

**Error:**
```
Task :app:compileDebugJavaWithJavac FAILED
```

**Solutions:**
1. Ensure your Android compile SDK is 31 or higher in `android/app/build.gradle`:
   ```gradle
   android {
       compileSdkVersion 34
       targetSdkVersion 34
   }
   ```

2. Clean and rebuild:
   ```bash
   cd android
   ./gradlew clean
   cd ..
   npx react-native run-android
   ```

## Runtime Issues

### getDynamicColorScheme returns null

**Issue:** `getDynamicColorScheme()` returns `null` on your device.

**Causes and Solutions:**

1. **iOS Device**: Dynamic theming is not supported on iOS. Use a fallback color:
   ```tsx
   const colors = getDynamicColorScheme('#006971'); // Provide fallback
   ```

2. **Android < 12**: Older Android versions don't support Material You:
   ```tsx
   import { Platform } from 'react-native';
   
   if (Platform.OS === 'android' && Platform.Version < 31) {
     // Use fallback color for older Android
     const colors = getDynamicColorScheme('#006971');
   }
   ```

3. **Emulator Issues**: Some emulators don't properly support dynamic colors:
   ```tsx
   // Always provide fallback for development
   const colors = getDynamicColorScheme(__DEV__ ? '#006971' : undefined);
   ```

### Colors don't update when wallpaper changes

**Issue:** App doesn't reflect new wallpaper colors immediately.

**Expected Behavior:** This is normal. Apps need to be restarted to pick up new wallpaper colors.

**Workaround for development:**
```tsx
import { AppState } from 'react-native';

const [appState, setAppState] = useState(AppState.currentState);

useEffect(() => {
  const subscription = AppState.addEventListener('change', nextAppState => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      // App has come to foreground - could refresh colors here
      // Note: This won't actually get new wallpaper colors without restart
    }
    setAppState(nextAppState);
  });

  return () => subscription?.remove();
}, [appState]);
```

### TypeScript errors

**Error:**
```typescript
Property 'primary' does not exist on type 'ColorScheme | null'
```

**Solution:** Always check for null before using:
```tsx
import { getDynamicColorScheme, ColorScheme } from 'react-native-dynamic-theme';

const MyComponent = () => {
  const dynamicColors = getDynamicColorScheme('#006971');
  
  // ✅ Safe approach
  if (!dynamicColors) {
    return <Text>Dynamic theming not supported</Text>;
  }
  
  const colors = systemColorScheme === 'dark' 
    ? dynamicColors.dark 
    : dynamicColors.light;
    
  return (
    <View style={{ backgroundColor: colors.background }}>
      {/* Component content */}
    </View>
  );
};
```

## Performance Issues

### App feels slow when switching themes

**Issue:** Theme switching causes performance problems.

**Solutions:**

1. **Memoize color calculations:**
   ```tsx
   const colors = useMemo(() => {
     const scheme = getDynamicColorScheme('#006971');
     return isDark ? scheme.dark : scheme.light;
   }, [isDark]);
   ```

2. **Use selective color subscriptions:**
   ```tsx
   // Instead of passing entire color scheme
   const MyButton = ({ colors }: { colors: ColorScheme }) => { /* ... */ };
   
   // Pass only needed colors
   const MyButton = ({ 
     primary, 
     onPrimary 
   }: { 
     primary: string; 
     onPrimary: string; 
   }) => { /* ... */ };
   ```

3. **Implement shouldComponentUpdate or React.memo:**
   ```tsx
   const ThemedComponent = React.memo(({ colors }) => {
     return (
       <View style={{ backgroundColor: colors.surface }}>
         {/* Component content */}
       </View>
     );
   }, (prevProps, nextProps) => {
     return prevProps.colors.surface === nextProps.colors.surface;
   });
   ```

### Memory leaks with theme context

**Issue:** Theme context causing memory leaks.

**Solution:** Ensure proper cleanup in theme provider:
```tsx
const ThemeProvider = ({ children }) => {
  const [colors, setColors] = useState(null);
  
  useEffect(() => {
    const loadColors = () => {
      const scheme = getDynamicColorScheme('#006971');
      setColors(scheme);
    };
    
    loadColors();
    
    // Cleanup function
    return () => {
      setColors(null);
    };
  }, []);
  
  return (
    <ThemeContext.Provider value={colors}>
      {children}
    </ThemeContext.Provider>
  );
};
```

## Development Issues

### Hot reload breaks themes

**Issue:** Theme colors don't update properly during development with hot reload.

**Solution:** Use a development flag to force refresh:
```tsx
const useDynamicTheme = (sourceColor: string) => {
  const [refreshKey, setRefreshKey] = useState(0);
  
  useEffect(() => {
    if (__DEV__) {
      // Force refresh in development
      const interval = setInterval(() => {
        setRefreshKey(prev => prev + 1);
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, []);
  
  return useMemo(() => {
    return getDynamicColorScheme(sourceColor);
  }, [sourceColor, refreshKey]);
};
```

### Debugging color values

**Issue:** Hard to debug what colors are being generated.

**Solution:** Create a debug component:
```tsx
const ColorDebugger = ({ colors }: { colors: ColorScheme }) => {
  if (!__DEV__) return null;
  
  return (
    <ScrollView style={{ position: 'absolute', top: 100, right: 0, width: 200, backgroundColor: 'white', zIndex: 1000 }}>
      {Object.entries(colors).map(([key, value]) => (
        <View key={key} style={{ flexDirection: 'row', padding: 4 }}>
          <View style={{ width: 20, height: 20, backgroundColor: value, marginRight: 8 }} />
          <Text style={{ fontSize: 10 }}>{key}: {value}</Text>
        </View>
      ))}
    </ScrollView>
  );
};
```

## Platform-Specific Issues

### Android

**Issue:** Theme doesn't work on custom Android ROMs.

**Solution:** Some custom ROMs may not implement Material You properly. Always provide fallbacks:
```tsx
const getReliableColors = (fallback: string) => {
  try {
    const colors = getDynamicColorScheme();
    
    // Verify the colors are valid
    if (colors && colors.light.primary && colors.light.primary !== '#000000') {
      return colors;
    }
  } catch (error) {
    console.warn('Dynamic colors failed, using fallback:', error);
  }
  
  // Use fallback
  return getExtendedDynamicSchemeFromSourceColor(fallback);
};
```

### iOS

**Issue:** Want dynamic theming on iOS similar to Android.

**Solution:** iOS doesn't have wallpaper-based theming, but you can:

1. **Use system accent color (iOS 14+):**
   ```tsx
   import { PlatformColor } from 'react-native';
   
   // This only works for some system colors
   const iosAccent = PlatformColor('systemBlue');
   ```

2. **Create your own color picker:**
   ```tsx
   const IOSColorPicker = ({ onColorSelect }) => {
     const iosColors = [
       '#007AFF', // System Blue
       '#34C759', // System Green  
       '#FF9500', // System Orange
       '#FF3B30', // System Red
       '#5856D6', // System Purple
     ];
     
     return (
       <View style={{ flexDirection: 'row' }}>
         {iosColors.map(color => (
           <TouchableOpacity
             key={color}
             style={{ backgroundColor: color, width: 44, height: 44, borderRadius: 22, margin: 4 }}
             onPress={() => onColorSelect(color)}
           />
         ))}
       </View>
     );
   };
   ```

## Getting Help

If you're still experiencing issues:

1. **Check the GitHub issues**: [Issues page](https://github.com/FouadMagdy01/react-native-dynamic-theme/issues)

2. **Create a minimal reproduction**: Use [React Native playground](https://snack.expo.dev/) to create a minimal example

3. **Provide environment details:**
   ```bash
   npx react-native info
   ```

4. **Include relevant code**: Share the specific code that's causing issues

5. **Check logs**: Include any relevant error messages or console logs

Remember to search existing issues before creating a new one, as your problem might already have a solution!