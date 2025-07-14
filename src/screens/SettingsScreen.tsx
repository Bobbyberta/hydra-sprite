import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {WaterStorage} from '../services/WaterStorage';

const SettingsScreen: React.FC = () => {
  const [dailyGoal, setDailyGoal] = useState(8);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      // Load settings from storage
      // For now, using default values
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const handleResetData = () => {
    Alert.alert(
      'Reset Data',
      'Are you sure you want to reset all your water tracking data? This action cannot be undone.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            try {
              await WaterStorage.clearAllData();
              Alert.alert('Success', 'All data has been reset.');
            } catch (error) {
              Alert.alert('Error', 'Failed to reset data.');
            }
          },
        },
      ]
    );
  };

  const handleExportData = async () => {
    try {
      const data = await WaterStorage.exportData();
      // In a real app, you would implement data export functionality
      Alert.alert('Export Data', 'Data export feature coming soon!');
    } catch (error) {
      Alert.alert('Error', 'Failed to export data.');
    }
  };

  const openGitHub = () => {
    Linking.openURL('https://github.com/yourusername/hydra-sprite');
  };

  const SettingRow = ({
    icon,
    title,
    subtitle,
    onPress,
    rightComponent,
  }: {
    icon: string;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    rightComponent?: React.ReactNode;
  }) => (
    <TouchableOpacity style={styles.settingRow} onPress={onPress}>
      <View style={styles.settingLeft}>
        <Icon name={icon} size={24} color="#2196F3" style={styles.settingIcon} />
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {rightComponent || (
        <Icon name="chevron-right" size={24} color="#ccc" />
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* App Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Settings</Text>
        
        <SettingRow
          icon="local-drink"
          title="Daily Goal"
          subtitle={`${dailyGoal} glasses per day`}
          onPress={() => {
            Alert.alert('Daily Goal', 'Goal customization coming soon!');
          }}
        />

        <SettingRow
          icon="notifications"
          title="Reminders"
          subtitle="Get reminded to drink water"
          rightComponent={
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{false: '#ccc', true: '#2196F3'}}
            />
          }
        />

        <SettingRow
          icon="dark-mode"
          title="Dark Mode"
          subtitle="Switch to dark theme"
          rightComponent={
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{false: '#ccc', true: '#2196F3'}}
            />
          }
        />
      </View>

      {/* Data Management */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data Management</Text>
        
        <SettingRow
          icon="file-download"
          title="Export Data"
          subtitle="Download your water tracking data"
          onPress={handleExportData}
        />

        <SettingRow
          icon="delete-forever"
          title="Reset Data"
          subtitle="Clear all water tracking data"
          onPress={handleResetData}
        />
      </View>

      {/* About */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        
        <SettingRow
          icon="info"
          title="Version"
          subtitle="1.0.0"
        />

        <SettingRow
          icon="code"
          title="Source Code"
          subtitle="View on GitHub"
          onPress={openGitHub}
        />

        <SettingRow
          icon="favorite"
          title="Made with"
          subtitle="💧 and ❤️ for better hydration"
        />
      </View>

      {/* Sprite Care Tips */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sprite Care Tips</Text>
        <View style={styles.tipsContainer}>
          <Text style={styles.tipText}>
            💧 Keep your sprite happy by drinking 8 glasses of water daily
          </Text>
          <Text style={styles.tipText}>
            🌟 Your sprite's health reflects your hydration level
          </Text>
          <Text style={styles.tipText}>
            📱 Add the widget to your home screen for quick logging
          </Text>
          <Text style={styles.tipText}>
            🏆 Build streaks to unlock achievements
          </Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Hydra Sprite - Your hydration companion
        </Text>
        <Text style={styles.footerSubtext}>
          Open source and privacy-focused
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
  },
  section: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976D2',
    padding: 20,
    paddingBottom: 10,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    marginRight: 15,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  tipsContainer: {
    padding: 20,
    paddingTop: 10,
  },
  tipText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  footer: {
    alignItems: 'center',
    padding: 30,
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
    textAlign: 'center',
  },
  footerSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default SettingsScreen; 