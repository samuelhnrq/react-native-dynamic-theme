---
sidebar_position: 3
---

# Examples

Explore practical examples of using React Native Dynamic Theme in real-world scenarios.

## Basic App with Dynamic Theming

A simple app that demonstrates the core functionality:

```tsx
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  StatusBar,
} from 'react-native';
import { getDynamicColorScheme } from 'react-native-dynamic-theme';

const BasicApp = () => {
  const systemColorScheme = useColorScheme();
  const dynamicColors = getDynamicColorScheme('#006971');
  
  const colors = systemColorScheme === 'dark' 
    ? dynamicColors.dark 
    : dynamicColors.light;

  return (
    <>
      <StatusBar
        barStyle={systemColorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.surface}
      />
      <ScrollView style={{ backgroundColor: colors.background }}>
        <View style={{ padding: 20 }}>
          {/* Header */}
          <Text style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: colors.onBackground,
            marginBottom: 20,
          }}>
            Dynamic Theme Demo
          </Text>

          {/* Primary Button */}
          <TouchableOpacity style={{
            backgroundColor: colors.primary,
            padding: 16,
            borderRadius: 12,
            marginBottom: 16,
          }}>
            <Text style={{
              color: colors.onPrimary,
              fontWeight: '600',
              textAlign: 'center',
            }}>
              Primary Button
            </Text>
          </TouchableOpacity>

          {/* Secondary Container */}
          <View style={{
            backgroundColor: colors.secondaryContainer,
            padding: 16,
            borderRadius: 12,
            marginBottom: 16,
          }}>
            <Text style={{
              color: colors.onSecondaryContainer,
              fontSize: 16,
              fontWeight: '500',
            }}>
              Secondary Container
            </Text>
            <Text style={{
              color: colors.onSecondaryContainer,
              opacity: 0.8,
              marginTop: 4,
            }}>
              This container adapts to your device's color scheme
            </Text>
          </View>

          {/* Surface Card */}
          <View style={{
            backgroundColor: colors.surface,
            padding: 20,
            borderRadius: 16,
            elevation: 2,
            shadowColor: colors.shadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          }}>
            <Text style={{
              color: colors.onSurface,
              fontSize: 18,
              fontWeight: '600',
              marginBottom: 8,
            }}>
              Material 3 Card
            </Text>
            <Text style={{ color: colors.onSurfaceVariant }}>
              This card uses Material 3 design principles with dynamic colors
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default BasicApp;
```

## Theme Switcher with Custom Colors

An advanced example showing how to switch between different color schemes:

```tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { getExtendedDynamicSchemeFromSourceColor } from 'react-native-dynamic-theme';

const ThemeSwitcherApp = () => {
  const systemColorScheme = useColorScheme();
  const [selectedColor, setSelectedColor] = useState('#006971');
  
  const colorOptions = [
    { name: 'Teal', value: '#006971' },
    { name: 'Orange', value: '#FF5722' },
    { name: 'Blue', value: '#2196F3' },
    { name: 'Purple', value: '#9C27B0' },
    { name: 'Green', value: '#4CAF50' },
    { name: 'Pink', value: '#E91E63' },
  ];

  const dynamicScheme = getExtendedDynamicSchemeFromSourceColor(selectedColor);
  const colors = systemColorScheme === 'dark' 
    ? dynamicScheme.dark 
    : dynamicScheme.light;

  return (
    <ScrollView style={{ backgroundColor: colors.background, flex: 1 }}>
      <View style={{ padding: 20 }}>
        <Text style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: colors.onBackground,
          marginBottom: 20,
        }}>
          Theme Generator
        </Text>

        <Text style={{
          fontSize: 16,
          color: colors.onSurfaceVariant,
          marginBottom: 16,
        }}>
          Choose a source color to generate a Material 3 theme:
        </Text>

        {/* Color Picker */}
        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginBottom: 24,
        }}>
          {colorOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={{
                backgroundColor: option.value,
                width: 60,
                height: 60,
                borderRadius: 30,
                marginRight: 12,
                marginBottom: 12,
                borderWidth: selectedColor === option.value ? 4 : 0,
                borderColor: colors.outline,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setSelectedColor(option.value)}
            >
              {selectedColor === option.value && (
                <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' }}>
                  ✓
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Generated Colors Preview */}
        <View style={{
          backgroundColor: colors.surface,
          borderRadius: 16,
          padding: 20,
          marginBottom: 20,
        }}>
          <Text style={{
            color: colors.onSurface,
            fontSize: 18,
            fontWeight: '600',
            marginBottom: 16,
          }}>
            Generated Theme Preview
          </Text>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {[
              { name: 'Primary', color: colors.primary },
              { name: 'Secondary', color: colors.secondary },
              { name: 'Tertiary', color: colors.tertiary },
              { name: 'Error', color: colors.error },
            ].map((item) => (
              <View key={item.name} style={{ width: '50%', marginBottom: 12 }}>
                <View style={{
                  backgroundColor: item.color,
                  height: 40,
                  borderRadius: 8,
                  marginBottom: 4,
                }} />
                <Text style={{
                  color: colors.onSurfaceVariant,
                  fontSize: 12,
                  textAlign: 'center',
                }}>
                  {item.name}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Sample Components */}
        <TouchableOpacity style={{
          backgroundColor: colors.primary,
          padding: 16,
          borderRadius: 12,
          marginBottom: 12,
        }}>
          <Text style={{
            color: colors.onPrimary,
            fontWeight: '600',
            textAlign: 'center',
          }}>
            Primary Action
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={{
          backgroundColor: colors.secondaryContainer,
          padding: 16,
          borderRadius: 12,
          marginBottom: 12,
        }}>
          <Text style={{
            color: colors.onSecondaryContainer,
            fontWeight: '600',
            textAlign: 'center',
          }}>
            Secondary Action
          </Text>
        </TouchableOpacity>

        <View style={{
          backgroundColor: colors.errorContainer,
          padding: 16,
          borderRadius: 12,
        }}>
          <Text style={{
            color: colors.onErrorContainer,
            fontWeight: '600',
            textAlign: 'center',
          }}>
            Error State
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};
```

## Navigation with Dynamic Theme

Example using React Navigation with dynamic theming:

```tsx
import React from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getDynamicColorScheme } from 'react-native-dynamic-theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const NavigationApp = () => {
  const systemColorScheme = useColorScheme();
  const dynamicColors = getDynamicColorScheme('#006971');
  
  const colors = systemColorScheme === 'dark' 
    ? dynamicColors.dark 
    : dynamicColors.light;

  // Create custom navigation theme
  const navigationTheme = {
    ...(systemColorScheme === 'dark' ? DarkTheme : DefaultTheme),
    colors: {
      ...(systemColorScheme === 'dark' ? DarkTheme.colors : DefaultTheme.colors),
      primary: colors.primary,
      background: colors.background,
      card: colors.surface,
      text: colors.onSurface,
      border: colors.outline,
      notification: colors.error,
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.onSurfaceVariant,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.outline,
          },
          headerStyle: {
            backgroundColor: colors.surface,
          },
          headerTintColor: colors.onSurface,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="person" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="settings" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
```

## Material 3 Components Library

Example of creating reusable Material 3 components:

```tsx
import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  useColorScheme,
} from 'react-native';
import { useDynamicColors } from './hooks/useDynamicColors'; // Custom hook

// Material 3 Button Component
export const M3Button = ({ 
  variant = 'filled', 
  onPress, 
  children, 
  disabled = false 
}) => {
  const colors = useDynamicColors();
  
  const getButtonStyle = () => {
    switch (variant) {
      case 'filled':
        return {
          backgroundColor: disabled ? colors.onSurface + '1F' : colors.primary,
          color: disabled ? colors.onSurface + '61' : colors.onPrimary,
        };
      case 'tonal':
        return {
          backgroundColor: disabled ? colors.onSurface + '1F' : colors.secondaryContainer,
          color: disabled ? colors.onSurface + '61' : colors.onSecondaryContainer,
        };
      case 'outlined':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: disabled ? colors.onSurface + '1F' : colors.outline,
          color: disabled ? colors.onSurface + '61' : colors.primary,
        };
      default:
        return {
          backgroundColor: 'transparent',
          color: disabled ? colors.onSurface + '61' : colors.primary,
        };
    }
  };

  const buttonStyle = getButtonStyle();

  return (
    <TouchableOpacity
      style={{
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 20,
        minHeight: 40,
        justifyContent: 'center',
        alignItems: 'center',
        ...buttonStyle,
      }}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={{
        color: buttonStyle.color,
        fontWeight: '500',
        fontSize: 14,
      }}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

// Material 3 Card Component
export const M3Card = ({ children, variant = 'elevated' }) => {
  const colors = useDynamicColors();
  
  const cardStyle = variant === 'elevated' 
    ? {
        backgroundColor: colors.surface,
        elevation: 1,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      }
    : variant === 'filled'
    ? {
        backgroundColor: colors.surfaceContainerHighest,
      }
    : {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.outline,
      };

  return (
    <View style={{
      borderRadius: 12,
      padding: 16,
      ...cardStyle,
    }}>
      {children}
    </View>
  );
};

// Material 3 Text Field Component
export const M3TextField = ({ 
  label, 
  value, 
  onChangeText, 
  variant = 'outlined',
  ...props 
}) => {
  const colors = useDynamicColors();
  
  return (
    <View style={{ marginBottom: 16 }}>
      {label && (
        <Text style={{
          color: colors.onSurfaceVariant,
          fontSize: 12,
          marginBottom: 4,
        }}>
          {label}
        </Text>
      )}
      <TextInput
        style={{
          borderWidth: variant === 'outlined' ? 1 : 0,
          borderColor: colors.outline,
          backgroundColor: variant === 'filled' ? colors.surfaceContainerHighest : 'transparent',
          borderRadius: variant === 'outlined' ? 4 : 4,
          paddingHorizontal: 16,
          paddingVertical: 12,
          fontSize: 16,
          color: colors.onSurface,
        }}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={colors.onSurfaceVariant}
        {...props}
      />
    </View>
  );
};
```

## Shopping App Example

A complete shopping app interface using dynamic theming:

```tsx
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  useColorScheme,
} from 'react-native';
import { getDynamicColorScheme } from 'react-native-dynamic-theme';

const ShoppingApp = () => {
  const systemColorScheme = useColorScheme();
  const dynamicColors = getDynamicColorScheme('#E91E63');
  const colors = systemColorScheme === 'dark' 
    ? dynamicColors.dark 
    : dynamicColors.light;

  const products = [
    { id: 1, name: 'Wireless Headphones', price: '$99.99', image: '🎧' },
    { id: 2, name: 'Smart Watch', price: '$299.99', image: '⌚' },
    { id: 3, name: 'Phone Case', price: '$19.99', image: '📱' },
  ];

  return (
    <ScrollView style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <View style={{
        backgroundColor: colors.surface,
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 20,
      }}>
        <Text style={{
          fontSize: 28,
          fontWeight: 'bold',
          color: colors.onSurface,
        }}>
          Shop
        </Text>
      </View>

      {/* Search Bar */}
      <View style={{ padding: 20 }}>
        <View style={{
          backgroundColor: colors.surfaceContainerHighest,
          borderRadius: 28,
          paddingHorizontal: 20,
          paddingVertical: 12,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <Text style={{ color: colors.onSurfaceVariant, marginRight: 10 }}>🔍</Text>
          <Text style={{ color: colors.onSurfaceVariant, flex: 1 }}>
            Search products...
          </Text>
        </View>
      </View>

      {/* Products Grid */}
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={{
          fontSize: 20,
          fontWeight: '600',
          color: colors.onBackground,
          marginBottom: 16,
        }}>
          Featured Products
        </Text>

        {products.map((product) => (
          <TouchableOpacity key={product.id} style={{
            backgroundColor: colors.surface,
            borderRadius: 16,
            padding: 16,
            marginBottom: 16,
            elevation: 2,
            shadowColor: colors.shadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{
                backgroundColor: colors.primaryContainer,
                width: 60,
                height: 60,
                borderRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 16,
              }}>
                <Text style={{ fontSize: 24 }}>{product.image}</Text>
              </View>
              
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: colors.onSurface,
                  marginBottom: 4,
                }}>
                  {product.name}
                </Text>
                <Text style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: colors.primary,
                }}>
                  {product.price}
                </Text>
              </View>

              <TouchableOpacity style={{
                backgroundColor: colors.primary,
                paddingHorizontal: 20,
                paddingVertical: 8,
                borderRadius: 20,
              }}>
                <Text style={{
                  color: colors.onPrimary,
                  fontWeight: '600',
                }}>
                  Add
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bottom CTA */}
      <View style={{ padding: 20 }}>
        <TouchableOpacity style={{
          backgroundColor: colors.primary,
          paddingVertical: 16,
          borderRadius: 12,
          alignItems: 'center',
        }}>
          <Text style={{
            color: colors.onPrimary,
            fontSize: 16,
            fontWeight: '600',
          }}>
            View Cart (3 items)
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
```

These examples demonstrate various ways to integrate React Native Dynamic Theme into your applications, from basic usage to complex, real-world scenarios. Each example showcases different aspects of the Material 3 design system and how to leverage dynamic theming effectively.