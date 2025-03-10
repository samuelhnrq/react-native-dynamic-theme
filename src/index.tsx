import DynamicTheme from './NativeDynamicTheme';
import type { DynamicColorScheme } from './types/themeTypes';
export { type DynamicColorScheme, type ColorScheme } from './types/themeTypes';
import { Platform } from 'react-native';
export function getDynamicColorScheme(): DynamicColorScheme | void {
  if (Platform.OS == 'android' && Platform.Version >= 31) {
    return DynamicTheme.getDynamicColorScheme();
  }
}
