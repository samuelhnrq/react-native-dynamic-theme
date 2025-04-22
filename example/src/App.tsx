import { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  StatusBar,
  TextInput,
  Platform,
  Alert,
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
  ChevronRight,
  Settings,
  Bell,
  Search,
  User,
  Heart,
  Mail,
  Phone,
  Calendar,
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
  const [useDeviceScheme, setUseDeviceScheme] = useState(false);
  const [inputColor, setInputColor] = useState('#006971');

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

  const generateNewRandomColor = () => {
    const newColor = generateRandomColor();
    setSourceColor(newColor);
    setInputColor(newColor);
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
            {/* Source Color Display */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>
                Source Color: {sourceColor}
              </Text>
              <View
                style={[
                  styles.sourceColorBox,
                  { backgroundColor: sourceColor },
                ]}
              >
                <Text style={[styles.sourceColorText, { color: '#FFFFFF' }]}>
                  Current Source Color
                </Text>
              </View>
            </View>

            {/* Color Palette Section */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>
                Color Palette
              </Text>
              <View style={styles.colorGrid}>
                {[
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
            ].map((palette) => (
              <View key={palette} style={styles.paletteSection}>
                <Text style={[styles.paletteName, { color: colors.onSurface }]}>
                  {palette.charAt(0).toUpperCase() + palette.slice(1)}
                </Text>
                <View style={styles.tonalGrid}>
                  {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100].map(
                    (tone) => {
                      // Fix TypeScript error by properly accessing the palette
                      const paletteData =
                        palette === 'neutral'
                          ? completeTheme.palettes.neutral
                          : palette === 'neutralVariant'
                            ? completeTheme.palettes.neutralVariant
                            : completeTheme.palettes[
                                palette as
                                  | 'primary'
                                  | 'secondary'
                                  | 'tertiary'
                                  | 'error'
                              ];

                      const backgroundColor =
                        paletteData?.[tone as keyof typeof paletteData] ||
                        '#000';

                      return (
                        <View
                          key={tone}
                          style={[styles.tonalBox, { backgroundColor }]}
                        >
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
                    }
                  )}
                </View>
              </View>
            ))}
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
});
