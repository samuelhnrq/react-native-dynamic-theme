import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import type { DynamicColorScheme } from './types/themeTypes';

export interface Spec extends TurboModule {
  getDynamicColorScheme(): DynamicColorScheme;
}

export default TurboModuleRegistry.getEnforcing<Spec>('DynamicTheme');
