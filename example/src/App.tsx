import { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  StatusBar,
} from 'react-native';
import { getDynamicColorScheme } from 'react-native-dynamic-theme';
import { HouseIcon } from 'lucide-react-native';
export default function MaterialYouShowcase() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');

  // Get the dynamic color palette
  const palette = getDynamicColorScheme();

  // Use either dark or light theme based on state

  // Toggle theme function
  const toggleTheme = () => setIsDarkMode((prev) => !prev);
  if (!palette) {
    return (
      <View>
        <Text>iOS (Not Supported)</Text>
      </View>
    );
  }
  const colors = isDarkMode ? palette.dark : palette.light;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.surfaceContainerHigh}
      />

      {/* App Bar */}
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

      {/* Tab Bar */}
      <View
        style={[styles.tabBar, { backgroundColor: colors.surfaceContainer }]}
      >
        {['Overview', 'Components', 'Typography'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && {
                backgroundColor: colors.secondaryContainer,
                borderRadius: 20,
              },
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    activeTab === tab
                      ? colors.onSecondaryContainer
                      : colors.onSurfaceVariant,
                },
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content}>
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

        {/* Surface Section */}
        <View style={styles.section}>
          <Text
            style={[styles.sectionTitle, { color: colors.onSurfaceVariant }]}
          >
            Surface Variants
          </Text>
          <View style={styles.surfaceGrid}>
            {[
              { name: 'Surface', color: colors.surface },
              { name: 'SurfaceVariant', color: colors.surfaceVariant },
              { name: 'SurfaceContainer', color: colors.surfaceContainer },
              {
                name: 'SurfaceContainerLow',
                color: colors.surfaceContainerLow,
              },
              {
                name: 'SurfaceContainerHigh',
                color: colors.surfaceContainerHigh,
              },
              {
                name: 'SurfaceContainerHighest',
                color: colors.surfaceContainerHighest,
              },
            ].map((item) => (
              <View
                key={item.name}
                style={[
                  styles.surfaceBox,
                  { backgroundColor: item.color, borderColor: colors.outline },
                ]}
              >
                <Text style={[styles.surfaceName, { color: colors.onSurface }]}>
                  {item.name}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Button Examples */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>
            Buttons
          </Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.filledButton, { backgroundColor: colors.primary }]}
            >
              <Text style={[styles.buttonText, { color: colors.onPrimary }]}>
                Filled
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.outlinedButton, { borderColor: colors.outline }]}
            >
              <Text style={[styles.buttonText, { color: colors.primary }]}>
                Outlined
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.textButton}>
              <Text style={[styles.buttonText, { color: colors.primary }]}>
                Text
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Cards */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>
            Cards
          </Text>

          {/* Elevated Card */}
          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.surfaceContainerLow,
                shadowColor: '#000',
              },
            ]}
          >
            <Text style={[styles.cardTitle, { color: colors.onSurface }]}>
              Elevated Card
            </Text>
            <Text style={[styles.cardBody, { color: colors.onSurfaceVariant }]}>
              This card uses elevation to stand out from the background.
            </Text>
            <TouchableOpacity
              style={[
                styles.cardAction,
                { backgroundColor: colors.primaryContainer },
              ]}
            >
              <Text
                style={[
                  styles.cardActionText,
                  { color: colors.onPrimaryContainer },
                ]}
              >
                Action
              </Text>
            </TouchableOpacity>
          </View>

          {/* Filled Card */}
          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.surfaceContainerHigh,
                marginTop: 16,
              },
            ]}
          >
            <Text style={[styles.cardTitle, { color: colors.onSurface }]}>
              Filled Card
            </Text>
            <Text style={[styles.cardBody, { color: colors.onSurfaceVariant }]}>
              This card uses a filled surface color for emphasis.
            </Text>
            <TouchableOpacity
              style={[
                styles.cardAction,
                { backgroundColor: colors.secondaryContainer },
              ]}
            >
              <Text
                style={[
                  styles.cardActionText,
                  { color: colors.onSecondaryContainer },
                ]}
              >
                Action
              </Text>
            </TouchableOpacity>
          </View>

          {/* Outlined Card */}
          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.surface,
                borderColor: colors.outlineVariant,
                borderWidth: 1,
                marginTop: 16,
              },
            ]}
          >
            <Text style={[styles.cardTitle, { color: colors.onSurface }]}>
              Outlined Card
            </Text>
            <Text style={[styles.cardBody, { color: colors.onSurfaceVariant }]}>
              This card uses an outline to define its boundaries.
            </Text>
            <TouchableOpacity
              style={[
                styles.cardAction,
                { backgroundColor: colors.tertiaryContainer },
              ]}
            >
              <Text
                style={[
                  styles.cardActionText,
                  { color: colors.onTertiaryContainer },
                ]}
              >
                Action
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom spacing */}
        <View style={{ height: 32 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View
        style={[styles.bottomNav, { backgroundColor: colors.surfaceContainer }]}
      >
        {['Home', 'Favorites', 'Settings'].map((item) => (
          <TouchableOpacity
            key={item}
            style={styles.navItem}
            onPress={() => {}}
          >
            <HouseIcon
              size={24}
              color={item === 'Home' ? colors.primary : colors.onSurfaceVariant}
            />
            <Text
              style={[
                styles.navText,
                {
                  color:
                    item === 'Home' ? colors.primary : colors.onSurfaceVariant,
                },
              ]}
            >
              {item}
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
  tabBar: {
    flexDirection: 'row',
    height: 48,
    paddingHorizontal: 8,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    marginHorizontal: 4,
  },
  tabText: {
    fontSize: 14,
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
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 12,
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
  surfaceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  surfaceBox: {
    width: '48%',
    height: 64,
    marginBottom: 8,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  surfaceName: {
    fontSize: 12,
    fontWeight: '500',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filledButton: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outlinedButton: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  card: {
    borderRadius: 12,
    padding: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  cardBody: {
    fontSize: 14,
    marginBottom: 16,
  },
  cardAction: {
    alignSelf: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  cardActionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  bottomNav: {
    flexDirection: 'row',
    height: 64,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginBottom: 4,
  },
  navText: {
    fontSize: 12,
  },
});
