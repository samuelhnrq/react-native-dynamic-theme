import { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  StatusBar,
  TextInput,
  Alert,
  Animated,
  Easing,
} from 'react-native';
import {
  getDynamicColorScheme,
  getExtendedDynamicScheme,
  getExtendedDynamicSchemeFromSourceColor,
} from 'react-native-dynamic-theme';
import {
  LayoutGrid,
  Component,
  Palette,
  Sparkles,
  Settings,
  Bell,
  Search,
  User,
  Heart,
  Mail,
  Calendar,
  Check,
  X,
  AlertTriangle,
  Info,
  Star,
  Menu,
  Download,
  Plus,
  Minus,
  RefreshCcw,
  Loader,
} from 'lucide-react-native';

// Random color generator
const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Some preset beautiful colors
const PRESET_COLORS = [
  '#006971', // Default teal
  '#FF5733', // Vibrant orange
  '#3498DB', // Sky blue
  '#9B59B6', // Purple
  '#27AE60', // Emerald green
  '#E74C3C', // Red
  '#F39C12', // Orange
  '#1ABC9C', // Turquoise
];

type TabName = 'Overview' | 'Components' | 'Palettes' | 'Generator';
export default function MaterialYouShowcase() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState<TabName>('Overview');
  const [sourceColor, setSourceColor] = useState('#006971');
  const [useDeviceScheme, setUseDeviceScheme] = useState(true);
  const [inputColor, setInputColor] = useState('#006971');
  const [spinValue] = useState(new Animated.Value(0));
  const [sliderValue] = useState(50);
  const [switchValues, setSwitchValues] = useState([false, true, false]);
  const [counter, setCounter] = useState(3);

  // Start spinner animation for progress indicators
  useEffect(() => {
    const startRotation = () => {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    };
    startRotation();
  }, [spinValue]);

  // Create animated rotation transform for spinner
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const devicePalette = getDynamicColorScheme();
  const completeTheme =
    useDeviceScheme && devicePalette
      ? getExtendedDynamicScheme()
      : getExtendedDynamicSchemeFromSourceColor(sourceColor);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  if (!devicePalette) {
    return (
      <View style={styles.container}>
        <Text>iOS (Not Supported)</Text>
      </View>
    );
  }

  const colors = isDarkMode
    ? completeTheme.schemes.dark
    : completeTheme.schemes.light;

  const toggleSwitch = (index: number) => {
    const newValues = [...switchValues];
    newValues[index] = !newValues[index];
    setSwitchValues(newValues);
  };
  // Helper to render tonal palette
  const renderTonalPalette = (paletteName: string) => {
    const palette =
      paletteName === 'neutral'
        ? completeTheme.palettes.neutral
        : paletteName === 'neutralVariant'
          ? completeTheme.palettes.neutralVariant
          : completeTheme.palettes[
              paletteName as 'primary' | 'secondary' | 'tertiary' | 'error'
            ];

    return (
      <View key={paletteName} style={styles.paletteSection}>
        <Text style={[styles.paletteName, { color: colors.onSurface }]}>
          {paletteName.charAt(0).toUpperCase() + paletteName.slice(1)}
        </Text>
        <View style={styles.tonalGrid}>
          {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100].map((tone) => {
            const backgroundColor =
              palette?.[tone as keyof typeof palette] || '#000';

            return (
              <View key={tone} style={[styles.tonalBox, { backgroundColor }]}>
                <Text
                  style={[
                    styles.tonalText,
                    { color: tone > 50 ? '#000' : '#fff' },
                  ]}
                >
                  {tone}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  };
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.surfaceContainerHigh}
      />

      <View
        style={[
          styles.appBar,
          { backgroundColor: colors.surfaceContainerHigh },
        ]}
      >
        <Text style={[styles.appBarTitle, { color: colors.onSurface }]}>
          Material You Demo
        </Text>
        <View style={styles.themeToggle}>
          <Text style={[styles.themeLabel, { color: colors.onSurfaceVariant }]}>
            {isDarkMode ? 'Dark' : 'Light'}
          </Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            trackColor={{
              false: colors.surfaceVariant,
              true: colors.primaryContainer,
            }}
            thumbColor={isDarkMode ? colors.primary : colors.outline}
          />
        </View>
      </View>
      <ScrollView style={styles.content}>
        {activeTab === 'Overview' && (
          <>
            {/* Complete Color Scheme Section */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>
                Complete Color Scheme
              </Text>
              <View style={styles.colorGrid}>
                {[
                  // Main color scheme
                  {
                    name: 'Primary',
                    color: colors.primary,
                    text: colors.onPrimary,
                  },
                  {
                    name: 'PrimaryContainer',
                    color: colors.primaryContainer,
                    text: colors.onPrimaryContainer,
                  },
                  {
                    name: 'Secondary',
                    color: colors.secondary,
                    text: colors.onSecondary,
                  },
                  {
                    name: 'SecondaryContainer',
                    color: colors.secondaryContainer,
                    text: colors.onSecondaryContainer,
                  },
                  {
                    name: 'Tertiary',
                    color: colors.tertiary,
                    text: colors.onTertiary,
                  },
                  {
                    name: 'TertiaryContainer',
                    color: colors.tertiaryContainer,
                    text: colors.onTertiaryContainer,
                  },
                  {
                    name: 'Error',
                    color: colors.error,
                    text: colors.onError,
                  },
                  {
                    name: 'ErrorContainer',
                    color: colors.errorContainer,
                    text: colors.onErrorContainer,
                  },
                  // Background and surface colors
                  {
                    name: 'Background',
                    color: colors.background,
                    text: colors.onBackground,
                  },
                  {
                    name: 'Surface',
                    color: colors.surface,
                    text: colors.onSurface,
                  },
                  {
                    name: 'SurfaceVariant',
                    color: colors.surfaceVariant,
                    text: colors.onSurfaceVariant,
                  },
                  {
                    name: 'SurfaceDim',
                    color: colors.surfaceDim,
                    text: colors.onSurface,
                  },
                  {
                    name: 'SurfaceBright',
                    color: colors.surfaceBright,
                    text: colors.onSurface,
                  },
                  {
                    name: 'SurfaceContainerLowest',
                    color: colors.surfaceContainerLowest,
                    text: colors.onSurface,
                  },
                  {
                    name: 'SurfaceContainerLow',
                    color: colors.surfaceContainerLow,
                    text: colors.onSurface,
                  },
                  {
                    name: 'SurfaceContainer',
                    color: colors.surfaceContainer,
                    text: colors.onSurface,
                  },
                  {
                    name: 'SurfaceContainerHigh',
                    color: colors.surfaceContainerHigh,
                    text: colors.onSurface,
                  },
                  {
                    name: 'SurfaceContainerHighest',
                    color: colors.surfaceContainerHighest,
                    text: colors.onSurface,
                  },
                  // Extra colors
                  {
                    name: 'Outline',
                    color: colors.outline,
                    text: colors.background,
                  },
                  {
                    name: 'OutlineVariant',
                    color: colors.outlineVariant,
                    text: colors.onBackground,
                  },

                  {
                    name: 'Scrim',
                    color: colors.scrim,
                    text: '#FFFFFF',
                  },
                  {
                    name: 'InverseSurface',
                    color: colors.inverseSurface,
                    text: colors.inverseOnSurface,
                  },
                  {
                    name: 'InverseOnSurface',
                    color: colors.inverseOnSurface,
                    text: colors.inverseSurface,
                  },
                  {
                    name: 'InversePrimary',
                    color: colors.inversePrimary,
                    text: colors.primaryContainer,
                  },
                ].map((item) => (
                  <View
                    key={item.name}
                    style={[styles.colorBox, { backgroundColor: item.color }]}
                  >
                    <Text style={[styles.colorName, { color: item.text }]}>
                      {item.name}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Tonal Palettes from the Palettes tab */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>
                Complete Tonal Palettes
              </Text>
              {[
                'primary',
                'secondary',
                'tertiary',
                'error',
                'neutral',
                'neutralVariant',
              ].map((palette) => renderTonalPalette(palette))}
            </View>
          </>
        )}
        {activeTab === 'Components' && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>
              Material Design Components
            </Text>

            {/* Buttons Section */}
            <Text
              style={[
                styles.componentSectionTitle,
                { color: colors.onSurface },
              ]}
            >
              Buttons
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.filledButton,
                  { backgroundColor: colors.primary },
                ]}
              >
                <Text style={[styles.buttonText, { color: colors.onPrimary }]}>
                  Filled Button
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.elevatedButton,
                  {
                    backgroundColor: colors.surface,
                    shadowColor: '#000',
                  },
                ]}
              >
                <Text style={[styles.buttonText, { color: colors.primary }]}>
                  Elevated Button
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tonalButton,
                  { backgroundColor: colors.secondaryContainer },
                ]}
              >
                <Text
                  style={[
                    styles.buttonText,
                    { color: colors.onSecondaryContainer },
                  ]}
                >
                  Tonal Button
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.outlinedButton, { borderColor: colors.outline }]}
              >
                <Text style={[styles.buttonText, { color: colors.primary }]}>
                  Outlined Button
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.textButton}>
                <Text style={[styles.buttonText, { color: colors.primary }]}>
                  Text Button
                </Text>
              </TouchableOpacity>
            </View>

            {/* NEW: Progress Indicators Section */}
            <Text
              style={[
                styles.componentSectionTitle,
                { color: colors.onSurface },
              ]}
            >
              Progress Indicators
            </Text>
            <View style={styles.progressSection}>
              {/* Circular Progress */}
              <View style={styles.progressRow}>
                <View style={styles.progressItem}>
                  <Animated.View
                    style={[
                      styles.circularProgress,
                      {
                        borderColor: colors.primary,
                        transform: [{ rotate: spin }],
                      },
                    ]}
                  />
                  <Text
                    style={[
                      styles.progressLabel,
                      { color: colors.onSurfaceVariant },
                    ]}
                  >
                    Circular Progress
                  </Text>
                </View>

                <View style={styles.progressItem}>
                  <View style={styles.determineProgressContainer}>
                    <View
                      style={[
                        styles.determinateProgress,
                        {
                          backgroundColor: colors.primary,
                          width: `${sliderValue}%`,
                        },
                      ]}
                    />
                  </View>
                  <Text
                    style={[
                      styles.progressLabel,
                      { color: colors.onSurfaceVariant },
                    ]}
                  >
                    Linear Progress: {sliderValue}%
                  </Text>
                </View>
              </View>

              {/* Multi-color progress */}
              <View style={styles.progressRow}>
                <View style={styles.progressItem}>
                  <View style={styles.multiColorContainer}>
                    <View
                      style={[
                        styles.multiColorSection,
                        { flex: 0.2, backgroundColor: colors.primary },
                      ]}
                    />
                    <View
                      style={[
                        styles.multiColorSection,
                        { flex: 0.5, backgroundColor: colors.secondary },
                      ]}
                    />
                    <View
                      style={[
                        styles.multiColorSection,
                        { flex: 0.3, backgroundColor: colors.tertiary },
                      ]}
                    />
                  </View>
                  <Text
                    style={[
                      styles.progressLabel,
                      { color: colors.onSurfaceVariant },
                    ]}
                  >
                    Multi-color Progress
                  </Text>
                </View>

                <View style={styles.progressItem}>
                  <View
                    style={[
                      styles.progressCircle,
                      { borderColor: colors.outline },
                    ]}
                  >
                    <View
                      style={[
                        styles.progressFill,
                        {
                          backgroundColor: colors.primary,
                          height: `${sliderValue}%`,
                        },
                      ]}
                    />
                  </View>
                  <Text
                    style={[
                      styles.progressLabel,
                      { color: colors.onSurfaceVariant },
                    ]}
                  >
                    Vertical Progress
                  </Text>
                </View>
              </View>
            </View>
            {/* NEW: Counter Component */}
            <Text
              style={[
                styles.componentSectionTitle,
                { color: colors.onSurface },
              ]}
            >
              Counter
            </Text>
            <View style={styles.counterContainer}>
              <TouchableOpacity
                style={[
                  styles.counterButton,
                  { backgroundColor: colors.primary },
                ]}
                onPress={() => setCounter((prev) => Math.max(0, prev - 1))}
              >
                <Minus size={20} color={colors.onPrimary} />
              </TouchableOpacity>

              <View
                style={[styles.counterValue, { borderColor: colors.outline }]}
              >
                <Text style={[styles.counterText, { color: colors.onSurface }]}>
                  {counter}
                </Text>
              </View>

              <TouchableOpacity
                style={[
                  styles.counterButton,
                  { backgroundColor: colors.primary },
                ]}
                onPress={() => setCounter((prev) => prev + 1)}
              >
                <Plus size={20} color={colors.onPrimary} />
              </TouchableOpacity>
            </View>

            {/* NEW: Spinner Variants */}
            <Text
              style={[
                styles.componentSectionTitle,
                { color: colors.onSurface },
              ]}
            >
              Spinner Variants
            </Text>
            <View style={styles.spinnerContainer}>
              <View style={styles.spinnerRow}>
                {/* Simple spinner */}
                <View style={styles.spinnerItem}>
                  <Animated.View
                    style={[
                      styles.spinnerSmall,
                      {
                        borderColor: colors.primary,
                        borderLeftColor: 'transparent',
                        transform: [{ rotate: spin }],
                      },
                    ]}
                  />
                  <Text
                    style={[
                      styles.spinnerLabel,
                      { color: colors.onSurfaceVariant },
                    ]}
                  >
                    Small
                  </Text>
                </View>

                {/* Medium spinner */}
                <View style={styles.spinnerItem}>
                  <Animated.View
                    style={[
                      styles.spinnerMedium,
                      {
                        borderColor: colors.secondary,
                        borderLeftColor: 'transparent',
                        transform: [{ rotate: spin }],
                      },
                    ]}
                  />
                  <Text
                    style={[
                      styles.spinnerLabel,
                      { color: colors.onSurfaceVariant },
                    ]}
                  >
                    Medium
                  </Text>
                </View>

                {/* Large spinner */}
                <View style={styles.spinnerItem}>
                  <Animated.View
                    style={[
                      styles.spinnerLarge,
                      {
                        borderColor: colors.tertiary,
                        borderLeftColor: 'transparent',
                        transform: [{ rotate: spin }],
                      },
                    ]}
                  />
                  <Text
                    style={[
                      styles.spinnerLabel,
                      { color: colors.onSurfaceVariant },
                    ]}
                  >
                    Large
                  </Text>
                </View>
              </View>

              <View style={styles.spinnerRow}>
                {/* Icon spinners */}
                <View style={styles.spinnerItem}>
                  <Animated.View style={{ transform: [{ rotate: spin }] }}>
                    <RefreshCcw size={24} color={colors.primary} />
                  </Animated.View>
                  <Text
                    style={[
                      styles.spinnerLabel,
                      { color: colors.onSurfaceVariant },
                    ]}
                  >
                    Icon 1
                  </Text>
                </View>

                <View style={styles.spinnerItem}>
                  <Animated.View style={{ transform: [{ rotate: spin }] }}>
                    <Loader size={24} color={colors.secondary} />
                  </Animated.View>
                  <Text
                    style={[
                      styles.spinnerLabel,
                      { color: colors.onSurfaceVariant },
                    ]}
                  >
                    Icon 2
                  </Text>
                </View>

                {/* Pulsing spinner */}
                <View style={styles.spinnerItem}>
                  <View
                    style={[
                      styles.pulsingContainer,
                      { borderColor: colors.tertiary },
                    ]}
                  >
                    <View
                      style={[
                        styles.pulsingInner,
                        { backgroundColor: colors.tertiary },
                      ]}
                    />
                  </View>
                  <Text
                    style={[
                      styles.spinnerLabel,
                      { color: colors.onSurfaceVariant },
                    ]}
                  >
                    Pulsing
                  </Text>
                </View>
              </View>
            </View>
            {/* NEW: Notification badges */}
            <Text
              style={[
                styles.componentSectionTitle,
                { color: colors.onSurface },
              ]}
            >
              Badges
            </Text>
            <View style={styles.badgesContainer}>
              <View style={styles.badgeItem}>
                <View
                  style={[
                    styles.badgeIcon,
                    { backgroundColor: colors.surfaceContainerHigh },
                  ]}
                >
                  <Mail size={24} color={colors.onSurface} />
                  <View
                    style={[styles.badge, { backgroundColor: colors.error }]}
                  >
                    <Text style={[styles.badgeText, { color: colors.onError }]}>
                      3
                    </Text>
                  </View>
                </View>
                <Text
                  style={[
                    styles.badgeLabel,
                    { color: colors.onSurfaceVariant },
                  ]}
                >
                  Number Badge
                </Text>
              </View>

              <View style={styles.badgeItem}>
                <View
                  style={[
                    styles.badgeIcon,
                    { backgroundColor: colors.surfaceContainerHigh },
                  ]}
                >
                  <Bell size={24} color={colors.onSurface} />
                  <View
                    style={[styles.dotBadge, { backgroundColor: colors.error }]}
                  />
                </View>
                <Text
                  style={[
                    styles.badgeLabel,
                    { color: colors.onSurfaceVariant },
                  ]}
                >
                  Dot Badge
                </Text>
              </View>

              <View style={styles.badgeItem}>
                <View
                  style={[
                    styles.badgeIcon,
                    { backgroundColor: colors.surfaceContainerHigh },
                  ]}
                >
                  <Settings size={24} color={colors.onSurface} />
                  <View
                    style={[
                      styles.largeBadge,
                      { backgroundColor: colors.tertiary },
                    ]}
                  >
                    <Text
                      style={[styles.badgeText, { color: colors.onTertiary }]}
                    >
                      NEW
                    </Text>
                  </View>
                </View>
                <Text
                  style={[
                    styles.badgeLabel,
                    { color: colors.onSurfaceVariant },
                  ]}
                >
                  Text Badge
                </Text>
              </View>
            </View>

            {/* NEW: Status Indicators */}
            <Text
              style={[
                styles.componentSectionTitle,
                { color: colors.onSurface },
              ]}
            >
              Status Indicators
            </Text>
            <View style={styles.statusContainer}>
              <View
                style={[
                  styles.statusItem,
                  { backgroundColor: colors.surfaceContainerLow },
                ]}
              >
                <View
                  style={[
                    styles.statusIconContainer,
                    { backgroundColor: colors.primaryContainer },
                  ]}
                >
                  <Check size={18} color={colors.onPrimaryContainer} />
                </View>
                <Text style={[styles.statusText, { color: colors.onSurface }]}>
                  Success Status
                </Text>
              </View>

              <View
                style={[
                  styles.statusItem,
                  { backgroundColor: colors.surfaceContainerLow },
                ]}
              >
                <View
                  style={[
                    styles.statusIconContainer,
                    { backgroundColor: colors.errorContainer },
                  ]}
                >
                  <X size={18} color={colors.onErrorContainer} />
                </View>
                <Text style={[styles.statusText, { color: colors.onSurface }]}>
                  Error Status
                </Text>
              </View>

              <View
                style={[
                  styles.statusItem,
                  { backgroundColor: colors.surfaceContainerLow },
                ]}
              >
                <View
                  style={[
                    styles.statusIconContainer,
                    { backgroundColor: colors.tertiaryContainer },
                  ]}
                >
                  <AlertTriangle size={18} color={colors.onTertiaryContainer} />
                </View>
                <Text style={[styles.statusText, { color: colors.onSurface }]}>
                  Warning Status
                </Text>
              </View>

              <View
                style={[
                  styles.statusItem,
                  { backgroundColor: colors.surfaceContainerLow },
                ]}
              >
                <View
                  style={[
                    styles.statusIconContainer,
                    { backgroundColor: colors.secondaryContainer },
                  ]}
                >
                  <Info size={18} color={colors.onSecondaryContainer} />
                </View>
                <Text style={[styles.statusText, { color: colors.onSurface }]}>
                  Info Status
                </Text>
              </View>
            </View>

            {/* NEW: Toggles/Switches Section */}
            <Text
              style={[
                styles.componentSectionTitle,
                { color: colors.onSurface },
              ]}
            >
              Toggle Components
            </Text>
            <View style={styles.togglesContainer}>
              {switchValues.map((value, index) => (
                <View key={index} style={styles.toggleItem}>
                  <Switch
                    value={value}
                    onValueChange={() => toggleSwitch(index)}
                    trackColor={{
                      false: colors.surfaceVariant,
                      true: colors.primaryContainer,
                    }}
                    thumbColor={value ? colors.primary : colors.outline}
                  />
                  <Text
                    style={[
                      styles.toggleLabel,
                      { color: colors.onSurfaceVariant },
                    ]}
                  >
                    Toggle {index + 1} {value ? 'ON' : 'OFF'}
                  </Text>
                </View>
              ))}
            </View>
            {/* FABs Section */}
            <Text
              style={[
                styles.componentSectionTitle,
                { color: colors.onSurface },
              ]}
            >
              Floating Action Buttons
            </Text>
            <View style={styles.fabSection}>
              <View style={styles.fabRow}>
                <View style={styles.fabItem}>
                  <TouchableOpacity
                    style={[
                      styles.fabSmall,
                      { backgroundColor: colors.primaryContainer },
                    ]}
                  >
                    <Bell size={20} color={colors.onPrimaryContainer} />
                  </TouchableOpacity>
                  <Text
                    style={[
                      styles.fabLabel,
                      { color: colors.onSurfaceVariant },
                    ]}
                  >
                    Small
                  </Text>
                </View>
                <View style={styles.fabItem}>
                  <TouchableOpacity
                    style={[
                      styles.fab,
                      { backgroundColor: colors.secondaryContainer },
                    ]}
                  >
                    <Settings size={24} color={colors.onSecondaryContainer} />
                  </TouchableOpacity>
                  <Text
                    style={[
                      styles.fabLabel,
                      { color: colors.onSurfaceVariant },
                    ]}
                  >
                    Regular
                  </Text>
                </View>
                <View style={styles.fabItem}>
                  <TouchableOpacity
                    style={[
                      styles.fabLarge,
                      { backgroundColor: colors.tertiaryContainer },
                    ]}
                  >
                    <Mail size={32} color={colors.onTertiaryContainer} />
                  </TouchableOpacity>
                  <Text
                    style={[
                      styles.fabLabel,
                      { color: colors.onSurfaceVariant },
                    ]}
                  >
                    Large
                  </Text>
                </View>
              </View>
              <View style={styles.extendedFabContainer}>
                <TouchableOpacity
                  style={[
                    styles.extendedFab,
                    { backgroundColor: colors.primaryContainer },
                  ]}
                >
                  <Mail size={24} color={colors.onPrimaryContainer} />
                  <Text
                    style={[
                      styles.extendedFabText,
                      { color: colors.onPrimaryContainer },
                    ]}
                  >
                    Extended FAB
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* NEW: Rating component */}
            <Text
              style={[
                styles.componentSectionTitle,
                { color: colors.onSurface },
              ]}
            >
              Rating
            </Text>
            <View style={styles.ratingContainer}>
              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Star
                    key={rating}
                    size={24}
                    fill={rating <= 3 ? colors.tertiary : 'transparent'}
                    color={rating <= 3 ? colors.tertiary : colors.outline}
                  />
                ))}
              </View>
              <Text
                style={[styles.ratingText, { color: colors.onSurfaceVariant }]}
              >
                3.0 / 5.0
              </Text>
            </View>

            {/* NEW: Menu component */}
            <Text
              style={[
                styles.componentSectionTitle,
                { color: colors.onSurface },
              ]}
            >
              Menu Component
            </Text>
            <View
              style={[
                styles.menuCard,
                { backgroundColor: colors.surfaceContainer },
              ]}
            >
              <View style={styles.menuHeader}>
                <Text style={[styles.menuTitle, { color: colors.onSurface }]}>
                  Menu Items
                </Text>
                <Menu size={22} color={colors.onSurfaceVariant} />
              </View>
              <View
                style={[
                  styles.menuDivider,
                  { backgroundColor: colors.outlineVariant },
                ]}
              />
              {[
                'Profile Settings',
                'Notifications',
                'Privacy',
                'Help & Support',
              ].map((item, index) => (
                <TouchableOpacity key={index} style={styles.menuItem}>
                  <Text
                    style={[styles.menuItemText, { color: colors.onSurface }]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Cards Section */}
            <Text
              style={[
                styles.componentSectionTitle,
                { color: colors.onSurface },
              ]}
            >
              Cards
            </Text>
            <View style={styles.cardsContainer}>
              <View
                style={[
                  styles.card,
                  { backgroundColor: colors.surfaceContainer },
                ]}
              >
                <Text style={[styles.cardTitle, { color: colors.onSurface }]}>
                  Filled Card
                </Text>
                <Text
                  style={[
                    styles.cardContent,
                    { color: colors.onSurfaceVariant },
                  ]}
                >
                  This is a filled card component using surface container color.
                </Text>
              </View>

              <View
                style={[
                  styles.elevatedCard,
                  {
                    backgroundColor: colors.surface,
                    shadowColor: '#000',
                  },
                ]}
              >
                <Text style={[styles.cardTitle, { color: colors.onSurface }]}>
                  Elevated Card
                </Text>
                <Text
                  style={[
                    styles.cardContent,
                    { color: colors.onSurfaceVariant },
                  ]}
                >
                  This is an elevated card with shadow effect.
                </Text>
              </View>

              <View
                style={[
                  styles.outlinedCard,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.outline,
                  },
                ]}
              >
                <Text style={[styles.cardTitle, { color: colors.onSurface }]}>
                  Outlined Card
                </Text>
                <Text
                  style={[
                    styles.cardContent,
                    { color: colors.onSurfaceVariant },
                  ]}
                >
                  This is an outlined card with border styling.
                </Text>
              </View>

              {/* NEW: Action Card */}
              <View
                style={[
                  styles.actionCard,
                  { backgroundColor: colors.surfaceContainer },
                ]}
              >
                <View style={styles.actionCardHeader}>
                  <Text style={[styles.cardTitle, { color: colors.onSurface }]}>
                    Action Card
                  </Text>
                  <View
                    style={[
                      styles.cardAvatarBadge,
                      { backgroundColor: colors.tertiaryContainer },
                    ]}
                  >
                    <User size={20} color={colors.onTertiaryContainer} />
                  </View>
                </View>
                <Text
                  style={[
                    styles.cardContent,
                    { color: colors.onSurfaceVariant },
                  ]}
                >
                  This card has action buttons in the footer area.
                </Text>
                <View
                  style={[
                    styles.cardDivider,
                    { backgroundColor: colors.outlineVariant },
                  ]}
                />
                <View style={styles.actionCardFooter}>
                  <TouchableOpacity
                    style={[
                      styles.actionButton,
                      { borderColor: colors.outline },
                    ]}
                  >
                    <Text
                      style={[
                        styles.actionButtonText,
                        { color: colors.primary },
                      ]}
                    >
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.actionButton,
                      { backgroundColor: colors.primary },
                    ]}
                  >
                    <Text
                      style={[
                        styles.actionButtonText,
                        { color: colors.onPrimary },
                      ]}
                    >
                      Confirm
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Chips Section */}
            <Text
              style={[
                styles.componentSectionTitle,
                { color: colors.onSurface },
              ]}
            >
              Chips
            </Text>
            <View style={styles.chipContainer}>
              <View
                style={[
                  styles.chip,
                  { backgroundColor: colors.secondaryContainer },
                ]}
              >
                <User size={16} color={colors.onSecondaryContainer} />
                <Text
                  style={[
                    styles.chipText,
                    { color: colors.onSecondaryContainer },
                  ]}
                >
                  Assist Chip
                </Text>
              </View>
              <View
                style={[
                  styles.chip,
                  { backgroundColor: colors.tertiaryContainer },
                ]}
              >
                <Heart size={16} color={colors.onTertiaryContainer} />
                <Text
                  style={[
                    styles.chipText,
                    { color: colors.onTertiaryContainer },
                  ]}
                >
                  Filter Chip
                </Text>
              </View>
              <View
                style={[
                  styles.chip,
                  { backgroundColor: colors.primaryContainer },
                ]}
              >
                <Calendar size={16} color={colors.onPrimaryContainer} />
                <Text
                  style={[
                    styles.chipText,
                    { color: colors.onPrimaryContainer },
                  ]}
                >
                  Suggestion
                </Text>
              </View>

              {/* NEW: More Chip Types */}
              <View
                style={[styles.outlineChip, { borderColor: colors.outline }]}
              >
                <Text style={[styles.chipText, { color: colors.onSurface }]}>
                  Outlined
                </Text>
              </View>

              <View
                style={[
                  styles.elevatedChip,
                  {
                    backgroundColor: colors.surface,
                    shadowColor: '#000',
                  },
                ]}
              >
                <Text style={[styles.chipText, { color: colors.onSurface }]}>
                  Elevated
                </Text>
              </View>

              <View style={[styles.chip, { backgroundColor: colors.primary }]}>
                <Download size={16} color={colors.onPrimary} />
                <Text style={[styles.chipText, { color: colors.onPrimary }]}>
                  Action
                </Text>
              </View>
            </View>
            {/* Input Fields Section */}
            <Text
              style={[
                styles.componentSectionTitle,
                { color: colors.onSurface },
              ]}
            >
              Input Fields
            </Text>
            <View style={styles.inputContainer}>
              <View
                style={[
                  styles.textFieldOutlined,
                  {
                    borderColor: colors.outline,
                  },
                ]}
              >
                <Text
                  style={[styles.textFieldLabel, { color: colors.primary }]}
                >
                  Label
                </Text>
                <TextInput
                  style={[
                    styles.textFieldInput,
                    {
                      color: colors.onSurface,
                    },
                  ]}
                  placeholder="Enter text"
                  placeholderTextColor={colors.onSurfaceVariant}
                />
              </View>

              <View
                style={[
                  styles.textFieldFilled,
                  {
                    backgroundColor: colors.surfaceContainerHighest,
                  },
                ]}
              >
                <Text
                  style={[styles.textFieldLabel, { color: colors.primary }]}
                >
                  Label
                </Text>
                <TextInput
                  style={[
                    styles.textFieldInput,
                    {
                      color: colors.onSurface,
                    },
                  ]}
                  placeholder="Enter text"
                  placeholderTextColor={colors.onSurfaceVariant}
                />
              </View>

              {/* NEW: TextArea component */}
              <View
                style={[
                  styles.textArea,
                  {
                    backgroundColor: colors.surfaceContainerHighest,
                  },
                ]}
              >
                <Text
                  style={[styles.textFieldLabel, { color: colors.primary }]}
                >
                  Description
                </Text>
                <TextInput
                  style={[
                    styles.textAreaInput,
                    {
                      color: colors.onSurface,
                    },
                  ]}
                  placeholder="Enter longer text here..."
                  placeholderTextColor={colors.onSurfaceVariant}
                  multiline={true}
                  numberOfLines={4}
                />
              </View>
            </View>

            {/* Search Bar Section */}
            <Text
              style={[
                styles.componentSectionTitle,
                { color: colors.onSurface },
              ]}
            >
              Search Bar
            </Text>
            <View
              style={[
                styles.searchBar,
                {
                  backgroundColor: colors.surfaceContainerHighest,
                },
              ]}
            >
              <Search size={20} color={colors.onSurfaceVariant} />
              <TextInput
                style={[
                  styles.searchInput,
                  {
                    color: colors.onSurface,
                  },
                ]}
                placeholder="Search..."
                placeholderTextColor={colors.onSurfaceVariant}
              />
            </View>
          </View>
        )}
        {activeTab === 'Palettes' && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>
              Complete Tonal Palettes
            </Text>
            {[
              'primary',
              'secondary',
              'tertiary',
              'error',
              'neutral',
              'neutralVariant',
            ].map((palette) => renderTonalPalette(palette))}
          </View>
        )}

        {activeTab === 'Generator' && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>
              Color Scheme Generator
            </Text>

            {/* Device Scheme Switch */}
            <View
              style={[
                styles.deviceSchemeContainer,
                { backgroundColor: colors.surfaceContainerLow },
              ]}
            >
              <View style={styles.deviceSchemeContent}>
                <Text
                  style={[
                    styles.deviceSchemeTitle,
                    { color: colors.onSurface },
                  ]}
                >
                  Use Device Color Scheme
                </Text>
                <Text
                  style={[
                    styles.deviceSchemeSubtitle,
                    { color: colors.onSurfaceVariant },
                  ]}
                >
                  Use the dynamic color from your device
                </Text>
              </View>
              <Switch
                value={useDeviceScheme}
                onValueChange={(value) => {
                  setUseDeviceScheme(value);
                  if (value && devicePalette) {
                    // If using device scheme, update sourceColor to device's primary color
                    setSourceColor(devicePalette.light.primary);
                  } else {
                    // If switching back to manual, use the current input color
                    setSourceColor(inputColor);
                  }
                }}
                trackColor={{
                  false: colors.surfaceVariant,
                  true: colors.primaryContainer,
                }}
                thumbColor={useDeviceScheme ? colors.primary : colors.outline}
              />
            </View>

            {!useDeviceScheme && (
              <>
                <TouchableOpacity
                  style={[
                    styles.randomButton,
                    { backgroundColor: colors.primary },
                  ]}
                  onPress={() => {
                    const newColor = generateRandomColor();
                    setSourceColor(newColor);
                    setInputColor(newColor);
                  }}
                >
                  <Text
                    style={[styles.buttonText, { color: colors.onPrimary }]}
                  >
                    Generate Random Color
                  </Text>
                </TouchableOpacity>

                <Text style={[styles.subTitle, { color: colors.onSurface }]}>
                  Or choose a preset:
                </Text>

                <View style={styles.presetGrid}>
                  {PRESET_COLORS.map((color) => (
                    <TouchableOpacity
                      key={color}
                      style={[
                        styles.presetColorBox,
                        { backgroundColor: color },
                        sourceColor === color && styles.selectedPreset,
                      ]}
                      onPress={() => {
                        setSourceColor(color);
                        setInputColor(color);
                      }}
                    >
                      <Text style={styles.presetColorText}>{color}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <View style={styles.manualInputContainer}>
                  <Text
                    style={[styles.inputLabel, { color: colors.onSurface }]}
                  >
                    Custom Color Input
                  </Text>
                  <View style={styles.inputRow}>
                    <TextInput
                      style={[
                        styles.colorInput,
                        {
                          backgroundColor: colors.surfaceContainerLow,
                          color: colors.onSurface,
                          borderColor: colors.outline,
                        },
                      ]}
                      value={inputColor}
                      onChangeText={(text) => {
                        setInputColor(text);
                      }}
                      placeholder="#RRGGBB"
                      placeholderTextColor={colors.onSurfaceVariant}
                    />
                    <TouchableOpacity
                      style={[
                        styles.setButton,
                        { backgroundColor: colors.secondary },
                      ]}
                      onPress={() => {
                        if (/^#[0-9A-F]{6}$/i.test(inputColor)) {
                          setSourceColor(inputColor);
                        } else {
                          Alert.alert(
                            'Invalid Color',
                            'Please enter a valid hex color (e.g., #FF5733)'
                          );
                        }
                      }}
                    >
                      <Text
                        style={[
                          styles.setButtonText,
                          { color: colors.onSecondary },
                        ]}
                      >
                        Set
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}

            <View style={styles.currentColorContainer}>
              <Text
                style={[styles.currentColorTitle, { color: colors.onSurface }]}
              >
                Current Source Color
              </Text>
              <View
                style={[
                  styles.currentColorBox,
                  { backgroundColor: sourceColor },
                ]}
              >
                <Text style={[styles.currentColorText, { color: '#FFFFFF' }]}>
                  {sourceColor}
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
      {/* Material 3 Bottom Navigation */}
      <View
        style={[styles.bottomNav, { backgroundColor: colors.surfaceContainer }]}
      >
        {[
          { name: 'Overview', icon: LayoutGrid },
          { name: 'Components', icon: Component },
          { name: 'Palettes', icon: Palette },
          { name: 'Generator', icon: Sparkles },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.name}
            style={[
              styles.bottomNavItem,
              activeTab === tab.name && styles.activeBottomNavItem,
            ]}
            onPress={() => setActiveTab(tab.name as TabName)}
          >
            <View
              style={[
                styles.navIconContainer,
                activeTab === tab.name && {
                  backgroundColor: colors.secondaryContainer,
                  borderRadius: 16,
                },
              ]}
            >
              <tab.icon
                size={24}
                color={
                  activeTab === tab.name
                    ? colors.onSecondaryContainer
                    : colors.onSurfaceVariant
                }
              />
            </View>
            <Text
              style={[
                styles.navLabel,
                {
                  color:
                    activeTab === tab.name
                      ? colors.onSurface
                      : colors.onSurfaceVariant,
                },
              ]}
            >
              {tab.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appBar: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    elevation: 4,
  },
  appBarTitle: {
    fontSize: 20,
    fontWeight: '500',
  },
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeLabel: {
    marginRight: 8,
    fontSize: 14,
  },
  bottomNav: {
    flexDirection: 'row',
    height: 80,
    elevation: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  bottomNavItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeBottomNavItem: {
    opacity: 1,
  },
  navIconContainer: {
    width: 64,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  navIcon: {
    fontSize: 20,
  },
  navLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  colorBox: {
    width: '48%',
    height: 64,
    marginBottom: 8,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorName: {
    fontSize: 12,
    fontWeight: '500',
  },
  componentSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 12,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  componentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  filledButton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 12,
  },
  elevatedButton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  tonalButton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 12,
  },
  outlinedButton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 12,
  },
  textButton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  fabSection: {
    marginBottom: 24,
  },
  fabRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  fabItem: {
    alignItems: 'center',
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  fabSmall: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  fabLarge: {
    width: 96,
    height: 96,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
  fabLabel: {
    marginTop: 8,
    fontSize: 12,
  },
  extendedFabContainer: {
    alignItems: 'center',
  },
  extendedFab: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 4,
  },
  extendedFabText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  cardsContainer: {
    marginBottom: 16,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  elevatedCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  outlinedCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  cardContent: {
    fontSize: 14,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  outlineChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
  },
  elevatedChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  chipText: {
    fontSize: 14,
    marginLeft: 8,
  },
  inputContainer: {
    marginBottom: 16,
  },
  textFieldOutlined: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  textFieldFilled: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  textFieldLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  textFieldInput: {
    fontSize: 16,
    padding: 0,
  },
  textArea: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  textAreaInput: {
    fontSize: 16,
    padding: 0,
    height: 80,
    textAlignVertical: 'top',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: 28,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  sourceColorBox: {
    height: 100,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  sourceColorText: {
    fontSize: 16,
    fontWeight: '500',
  },
  randomButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  subTitle: {
    fontSize: 16,
    marginBottom: 12,
  },
  presetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  presetColorBox: {
    width: '23%',
    aspectRatio: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  presetColorText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  selectedPreset: {
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  manualInputContainer: {
    marginTop: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorInput: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  setButton: {
    marginLeft: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  setButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  deviceSchemeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  deviceSchemeContent: {
    flex: 1,
  },
  deviceSchemeTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  deviceSchemeSubtitle: {
    fontSize: 14,
  },
  currentColorContainer: {
    marginTop: 24,
  },
  currentColorTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  currentColorBox: {
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentColorText: {
    fontSize: 16,
    fontWeight: '500',
  },
  paletteSection: {
    marginBottom: 16,
  },
  paletteName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  tonalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tonalBox: {
    width: '7.69%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tonalText: {
    fontSize: 8,
    fontWeight: '500',
  },
  // NEW STYLES for progress indicators
  progressSection: {
    marginBottom: 24,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  progressItem: {
    alignItems: 'center',
    width: '48%',
  },
  circularProgress: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 4,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
  },
  progressLabel: {
    marginTop: 8,
    fontSize: 12,
  },
  determineProgressContainer: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  determinateProgress: {
    height: '100%',
  },
  multiColorContainer: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  multiColorSection: {
    height: '100%',
  },
  progressCircle: {
    width: 48,
    height: 100,
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  progressFill: {
    width: '100%',
  },

  // NEW STYLES for badges
  badgesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  badgeItem: {
    alignItems: 'center',
  },
  badgeIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    position: 'absolute',
    top: -5,
    right: -5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  dotBadge: {
    width: 10,
    height: 10,
    borderRadius: 5,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  largeBadge: {
    minWidth: 32,
    height: 20,
    borderRadius: 10,
    position: 'absolute',
    top: -10,
    right: -10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  badgeLabel: {
    marginTop: 8,
    fontSize: 12,
  },

  // NEW STYLES for status indicators
  statusContainer: {
    marginBottom: 24,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  statusIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },

  // NEW STYLES for rating
  ratingContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  starsRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 14,
  },

  // NEW STYLES for toggles
  togglesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  toggleItem: {
    alignItems: 'center',
  },
  toggleLabel: {
    marginTop: 8,
    fontSize: 12,
  },

  // NEW STYLES for menu
  menuCard: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  menuDivider: {
    height: 1,
    width: '100%',
  },
  menuItem: {
    padding: 16,
  },
  menuItemText: {
    fontSize: 14,
  },
  // NEW STYLES for action card
  actionCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  actionCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardAvatarBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardDivider: {
    height: 1,
    marginVertical: 12,
  },
  actionCardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 8,
    borderWidth: 1,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },

  // NEW STYLES for counter
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  counterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterValue: {
    width: 60,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  counterText: {
    fontSize: 18,
    fontWeight: '500',
  },

  // NEW STYLES for spinners
  spinnerContainer: {
    marginBottom: 24,
  },
  spinnerRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  spinnerItem: {
    alignItems: 'center',
  },
  spinnerSmall: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
  },
  spinnerMedium: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 3,
  },
  spinnerLarge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 4,
  },
  spinnerLabel: {
    marginTop: 8,
    fontSize: 12,
  },
  pulsingContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulsingInner: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
});
