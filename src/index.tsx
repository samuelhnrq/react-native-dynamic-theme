import DynamicTheme, { type DynamicColorScheme } from './NativeDynamicTheme';
import { Platform } from 'react-native';
export function getDynamicColorScheme(): DynamicColorScheme | void {
  if (Platform.OS == 'android' && Platform.Version >= 31) {
    return DynamicTheme.getDynamicColorScheme();
  }
}
