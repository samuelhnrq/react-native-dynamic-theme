---
sidebar_position: 4
---

# Advanced Usage

Learn advanced patterns and techniques for using React Native Dynamic Theme in complex applications.

## Custom Theme Provider with Context

Create a comprehensive theme system with React Context:

```tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme, Appearance } from 'react-native';
import { 
  getDynamicColorScheme, 
  getExtendedDynamicScheme,
  ColorScheme,
  ExtendedDynamicScheme 
} from 'react-native-dynamic-theme';

interface ThemeContextType {
  // Current colors
  colors: ColorScheme;
  
  // Theme state
  isDark: boolean;
  isSystemTheme: boolean;
  
  // Extended scheme for advanced usage
  extendedScheme: ExtendedDynamicScheme;
  
  // Theme controls
  toggleDarkMode: () => void;
  setSourceColor: (color: string) => void;
  setSystemTheme: (enabled: boolean) => void;
  
  // Current source color
  sourceColor: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  fallbackColor?: string;
}

export const ThemeProvider = ({ 
  children, 
  fallbackColor = '#006971' 
}: ThemeProviderProps) => {
  const systemColorScheme = useColorScheme();
  const [isSystemTheme, setIsSystemTheme] = useState(true);
  const [manualDarkMode, setManualDarkMode] = useState(false);
  const [sourceColor, setSourceColor] = useState(fallbackColor);

  // Determine if dark mode should be active
  const isDark = isSystemTheme ? systemColorScheme === 'dark' : manualDarkMode;

  // Get extended scheme for the current source color
  const extendedScheme = getExtendedDynamicScheme(sourceColor);
  
  // Select appropriate color scheme
  const colors = isDark ? extendedScheme.schemes.dark : extendedScheme.schemes.light;

  // Theme control functions
  const toggleDarkMode = () => {
    if (isSystemTheme) {
      setIsSystemTheme(false);
      setManualDarkMode(!isDark);
    } else {
      setManualDarkMode(!manualDarkMode);
    }
  };

  const setSystemTheme = (enabled: boolean) => {
    setIsSystemTheme(enabled);
    if (enabled) {
      // Reset to system preference
      setManualDarkMode(systemColorScheme === 'dark');
    }
  };

  // Listen for system theme changes
  useEffect(() => {
    if (isSystemTheme) {
      const subscription = Appearance.addChangeListener(({ colorScheme }) => {
        // System theme will automatically update through systemColorScheme
      });
      return () => subscription?.remove();
    }
  }, [isSystemTheme]);

  const value: ThemeContextType = {
    colors,
    isDark,
    isSystemTheme,
    extendedScheme,
    toggleDarkMode,
    setSourceColor,
    setSystemTheme,
    sourceColor,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
```

## High Contrast and Accessibility Support

Implement accessibility-aware theming with high contrast support:

```tsx
import React from 'react';
import { AccessibilityInfo, useColorScheme } from 'react-native';
import { getExtendedDynamicScheme } from 'react-native-dynamic-theme';

export const useAccessibleTheme = (sourceColor: string) => {
  const systemColorScheme = useColorScheme();
  const [isHighContrastEnabled, setIsHighContrastEnabled] = React.useState(false);
  const [isReduceMotionEnabled, setIsReduceMotionEnabled] = React.useState(false);

  React.useEffect(() => {
    // Check for high contrast preference
    AccessibilityInfo.isHighTextContrastEnabled().then(setIsHighContrastEnabled);
    
    // Check for reduced motion preference
    AccessibilityInfo.isReduceMotionEnabled().then(setIsReduceMotionEnabled);

    // Listen for accessibility changes
    const highContrastSubscription = AccessibilityInfo.addEventListener(
      'highTextContrastChanged',
      setIsHighContrastEnabled
    );
    
    const reduceMotionSubscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      setIsReduc
      const reduceMotionSubscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      setIsReduceMotionEnabled
    );

    return () => {
      highContrastSubscription?.remove();
      reduceMotionSubscription?.remove();
    };
  }, []);

  const extendedScheme = getExtendedDynamicScheme(sourceColor);
  const isDark = systemColorScheme === 'dark';

  // Select appropriate contrast level
  const colors = React.useMemo(() => {
    if (isHighContrastEnabled) {
      return isDark 
        ? extendedScheme.schemes.darkHighContrast 
        : extendedScheme.schemes.lightHighContrast;
    }
    return isDark 
      ? extendedScheme.schemes.dark 
      : extendedScheme.schemes.light;
  }, [extendedScheme, isDark, isHighContrastEnabled]);

  return {
    colors,
    isDark,
    isHighContrastEnabled,
    isReduceMotionEnabled,
    extendedScheme,
  };
};

// Usage in component
const AccessibleComponent = () => {
  const { colors, isHighContrastEnabled, isReduceMotionEnabled } = useAccessibleTheme('#006971');

  return (
    <Animated.View
      style={{
        backgroundColor: colors.surface,
        borderWidth: isHighContrastEnabled ? 2 : 1,
        borderColor: colors.outline,
      }}
      // Disable animations if reduced motion is preferred
      pointerEvents={isReduceMotionEnabled ? 'auto' : 'auto'}
    >
      <Text style={{
        color: colors.onSurface,
        fontSize: isHighContrastEnabled ? 18 : 16,
        fontWeight: isHighContrastEnabled ? 'bold' : 'normal',
      }}>
        Accessible content
      </Text>
    </Animated.View>
  );
};
```

## Tonal Palette Utilities

Advanced utilities for working with tonal palettes:

```tsx
import { getExtendedDynamicScheme } from 'react-native-dynamic-theme';

// Utility to get specific tones from palettes
export const useTonalPalette = (sourceColor: string) => {
  const scheme = getExtendedDynamicScheme(sourceColor);
  
  return {
    // Primary tones
    primary: {
      tone0: scheme.palettes.primary[0],     // Black
      tone10: scheme.palettes.primary[10],   // Very dark
      tone20: scheme.palettes.primary[20],   // Dark
      tone30: scheme.palettes.primary[30],   // Medium dark
      tone40: scheme.palettes.primary[40],   // Primary color
      tone50: scheme.palettes.primary[50],   // Medium
      tone60: scheme.palettes.primary[60],   // Medium light
      tone70: scheme.palettes.primary[70],   // Light
      tone80: scheme.palettes.primary[80],   // Very light
      tone90: scheme.palettes.primary[90],   // Container
      tone95: scheme.palettes.primary[95],   // Very light container
      tone99: scheme.palettes.primary[99],   // Near white
      tone100: scheme.palettes.primary[100], // White
    },
    
    // Helper to get any tone
    getTone: (palette: 'primary' | 'secondary' | 'tertiary' | 'neutral' | 'neutralVariant' | 'error', tone: number) => {
      return scheme.palettes[palette][tone as keyof typeof scheme.palettes.primary];
    },
    
    // Generate gradient from palette
    createGradient: (palette: 'primary' | 'secondary' | 'tertiary') => {
      const paletteColors = scheme.palettes[palette];
      return [paletteColors[20], paletteColors[40], paletteColors[60], paletteColors[80]];
    },
    
    // All palettes
    palettes: scheme.palettes,
  };
};

// Example usage
const GradientBackground = ({ sourceColor }: { sourceColor: string }) => {
  const { createGradient, primary } = useTonalPalette(sourceColor);
  const gradientColors = createGradient('primary');

  return (
    <LinearGradient
      colors={gradientColors}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {/* Content */}
    </LinearGradient>
  );
};
```

## Dynamic Theme Persistence

Persist user theme preferences across app sessions:

```tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const THEME_STORAGE_KEY = '@app_theme_preferences';

interface ThemePreferences {
  sourceColor: string;
  isSystemTheme: boolean;
  manualDarkMode: boolean;
}

export const usePersistedTheme = (defaultColor = '#006971') => {
  const [preferences, setPreferences] = useState<ThemePreferences>({
    sourceColor: defaultColor,
    isSystemTheme: true,
    manualDarkMode: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load preferences on mount
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const stored = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setPreferences(parsed);
        }
      } catch (error) {
        console.warn('Failed to load theme preferences:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPreferences();
  }, []);

  // Save preferences when they change
  const updatePreferences = async (newPrefs: Partial<ThemePreferences>) => {
    const updated = { ...preferences, ...newPrefs };
    setPreferences(updated);
    
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.warn('Failed to save theme preferences:', error);
    }
  };

  return {
    preferences,
    updatePreferences,
    isLoading,
    
    // Convenience methods
    setSourceColor: (color: string) => updatePreferences({ sourceColor: color }),
    setSystemTheme: (enabled: boolean) => updatePreferences({ isSystemTheme: enabled }),
    setManualDarkMode: (enabled: boolean) => updatePreferences({ manualDarkMode: enabled }),
  };
};
```

## Color Animation and Transitions

Animate between different color schemes:

```tsx
import React, { useRef, useEffect } from 'react';
import { Animated, useColorScheme } from 'react-native';
import { getDynamicColorScheme } from 'react-native-dynamic-theme';

export const useAnimatedColors = (sourceColor: string, duration = 300) => {
  const systemColorScheme = useColorScheme();
  const colorAnimations = useRef<{ [key: string]: Animated.Value }>({});
  
  const dynamicColors = getDynamicColorScheme(sourceColor);
  const targetColors = systemColorScheme === 'dark' 
    ? dynamicColors.dark 
    : dynamicColors.light;

  // Initialize animations for each color property
  useEffect(() => {
    Object.keys(targetColors).forEach(colorKey => {
      if (!colorAnimations.current[colorKey]) {
        colorAnimations.current[colorKey] = new Animated.Value(0);
      }
    });
  }, []);

  // Animate to new colors when they change
  useEffect(() => {
    const animations = Object.keys(targetColors).map(colorKey => {
      return Animated.timing(colorAnimations.current[colorKey], {
        toValue: 1,
        duration,
        useNativeDriver: false,
      });
    });

    Animated.parallel(animations).start();
  }, [targetColors, duration]);

  // Helper to get animated color
  const getAnimatedColor = (colorKey: keyof typeof targetColors, previousColor: string) => {
    if (!colorAnimations.current[colorKey]) {
      return targetColors[colorKey];
    }

    return colorAnimations.current[colorKey].interpolate({
      inputRange: [0, 1],
      outputRange: [previousColor, targetColors[colorKey]],
    });
  };

  return {
    colors: targetColors,
    getAnimatedColor,
    animatedValues: colorAnimations.current,
  };
};

// Usage in component
const AnimatedThemedView = ({ children }: { children: React.ReactNode }) => {
  const [previousColors, setPreviousColors] = useState(null);
  const { colors, getAnimatedColor } = useAnimatedColors('#006971');

  const animatedBackgroundColor = getAnimatedColor(
    'background', 
    previousColors?.background || colors.background
  );

  useEffect(() => {
    setPreviousColors(colors);
  }, [colors]);

  return (
    <Animated.View style={{
      flex: 1,
      backgroundColor: animatedBackgroundColor,
    }}>
      {children}
    </Animated.View>
  );
};
```

## Performance Optimization

Optimize theme usage for large applications:

```tsx
import React, { memo, useMemo } from 'react';
import { ColorScheme } from 'react-native-dynamic-theme';

// Memoized color selector
export const useSelectiveColors = (
  colors: ColorScheme, 
  requiredColors: (keyof ColorScheme)[]
) => {
  return useMemo(() => {
    const selected: Partial<ColorScheme> = {};
    requiredColors.forEach(key => {
      selected[key] = colors[key];
    });
    return selected;
  }, [colors, requiredColors]);
};

// HOC for theme optimization
export const withOptimizedTheme = <P extends object>(
  Component: React.ComponentType<P & { colors: Partial<ColorScheme> }>,
  requiredColors: (keyof ColorScheme)[]
) => {
  const OptimizedComponent = memo((props: P) => {
    const { colors: fullColors } = useTheme();
    const colors = useSelectiveColors(fullColors, requiredColors);
    
    return <Component {...props} colors={colors} />;
  });

  OptimizedComponent.displayName = `withOptimizedTheme(${Component.displayName || Component.name})`;
  return OptimizedComponent;
};

// Usage
const MyButton = ({ colors, ...props }: { colors: Partial<ColorScheme> } & ButtonProps) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors.primary,
        // Only uses primary and onPrimary colors
      }}
      {...props}
    >
      <Text style={{ color: colors.onPrimary }}>
        Button Text
      </Text>
    </TouchableOpacity>
  );
};

// Optimized version that only re-renders when primary colors change
const OptimizedButton = withOptimizedTheme(MyButton, ['primary', 'onPrimary']);
```

## Theme Testing Utilities

Utilities for testing components with different themes:

```tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from './ThemeProvider';

// Theme testing wrapper
export const renderWithTheme = (
  component: React.ReactElement,
  options: {
    sourceColor?: string;
    isDark?: boolean;
    isHighContrast?: boolean;
  } = {}
) => {
  const {
    sourceColor = '#006971',
    isDark = false,
    isHighContrast = false,
  } = options;

  const TestThemeProvider = ({ children }: { children: React.ReactNode }) => {
    // Mock theme provider with test options
    return (
      <ThemeProvider
        fallbackColor={sourceColor}
        // Additional test-specific props
      >
        {children}
      </ThemeProvider>
    );
  };

  return render(component, { wrapper: TestThemeProvider });
};

// Color contrast testing
export const validateColorContrast = (
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA'
) => {
  // Implementation would use a color contrast library
  // This is a simplified example
  const contrastRatio = calculateContrastRatio(foreground, background);
  const minimumRatio = level === 'AAA' ? 7 : 4.5;
  
  return {
    ratio: contrastRatio,
    passes: contrastRatio >= minimumRatio,
    level,
  };
};

// Test utilities
export const createTestTheme = (overrides: Partial<ColorScheme> = {}) => {
  const baseTheme = getDynamicColorScheme('#006971');
  return {
    ...baseTheme.light,
    ...overrides,
  };
};
```

## Integration with Design Systems

Integrate with existing design system tokens:

```tsx
// Design system integration
export const createDesignSystemTheme = (sourceColor: string) => {
  const dynamicScheme = getExtendedDynamicScheme(sourceColor);
  
  return {
    // Map to design system tokens
    tokens: {
      // Spacing (unchanged)
      space: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
      },
      
      // Typography (unchanged)
      typography: {
        headline: { fontSize: 24, fontWeight: 'bold' },
        body: { fontSize: 16, fontWeight: 'normal' },
        caption: { fontSize: 12, fontWeight: 'normal' },
      },
      
      // Dynamic colors
      colors: {
        primary: dynamicScheme.schemes.light.primary,
        secondary: dynamicScheme.schemes.light.secondary,
        surface: dynamicScheme.schemes.light.surface,
        // ... map all colors
      },
      
      // Semantic color mappings
      semantic: {
        success: dynamicScheme.palettes.tertiary[40],
        warning: dynamicScheme.palettes.error[60],
        info: dynamicScheme.palettes.primary[60],
        error: dynamicScheme.schemes.light.error,
      },
    },
    
    // Component variants
    components: {
      Button: {
        primary: {
          backgroundColor: dynamicScheme.schemes.light.primary,
          color: dynamicScheme.schemes.light.onPrimary,
        },
        secondary: {
          backgroundColor: dynamicScheme.schemes.light.secondaryContainer,
          color: dynamicScheme.schemes.light.onSecondaryContainer,
        },
      },
    },
  };
};
```

These advanced patterns provide powerful ways to leverage React Native Dynamic Theme in complex applications while maintaining performance, accessibility, and code organization.