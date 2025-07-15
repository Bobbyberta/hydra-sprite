import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Platform,
  View,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Design System
import { Colors, Theme } from './design-system';
import { Headline1, Headline2, Body1, Body2, Caption } from './design-system/components/Text';
import { PrimaryButton, SecondaryButton, OutlineButton } from './design-system/components/Button';
import { ElevatedCard, FilledCard } from './design-system/components/Card';

const { width, height } = Dimensions.get('window');

const App: React.FC = () => {
  const [waterCount, setWaterCount] = React.useState(0);
  const [spriteState, setSpriteState] = React.useState('okay');

  // Load water count from storage
  React.useEffect(() => {
    loadWaterCount();
  }, []);

  const loadWaterCount = async () => {
    try {
      const saved = await AsyncStorage.getItem('waterCount');
      if (saved) {
        const count = parseInt(saved, 10);
        setWaterCount(count);
        updateSpriteState(count);
      }
    } catch (error) {
      console.error('Error loading water count:', error);
    }
  };

  const saveWaterCount = async (count: number) => {
    try {
      await AsyncStorage.setItem('waterCount', count.toString());
    } catch (error) {
      console.error('Error saving water count:', error);
    }
  };

  const updateSpriteState = (count: number) => {
    if (count >= 8) {
      setSpriteState('thriving');
    } else if (count >= 6) {
      setSpriteState('happy');
    } else if (count >= 4) {
      setSpriteState('okay');
    } else if (count >= 2) {
      setSpriteState('concerned');
    } else {
      setSpriteState('dehydrated');
    }
  };

  const addWater = async (amount: number) => {
    const newCount = waterCount + amount;
    setWaterCount(newCount);
    updateSpriteState(newCount);
    await saveWaterCount(newCount);
    
    // Show positive feedback
    Alert.alert('Great!', `Added ${amount} glass${amount > 1 ? 'es' : ''} of water! 💧`);
  };

  const resetWater = async () => {
    setWaterCount(0);
    setSpriteState('dehydrated');
    await saveWaterCount(0);
    Alert.alert('Reset', 'Water count reset to 0');
  };

  const getSpriteEmoji = () => {
    switch (spriteState) {
      case 'thriving':
        return '🌟';
      case 'happy':
        return '😊';
      case 'okay':
        return '😐';
      case 'concerned':
        return '😟';
      case 'dehydrated':
        return '😵';
      default:
        return '😐';
    }
  };

  const getSpriteMessage = () => {
    switch (spriteState) {
      case 'thriving':
        return 'Excellent hydration! Keep it up!';
      case 'happy':
        return 'Great hydration! Feeling good!';
      case 'okay':
        return 'Adequate hydration. Could drink more!';
      case 'concerned':
        return 'Low hydration. Please drink more water!';
      case 'dehydrated':
        return 'Very dehydrated! Drink water now!';
      default:
        return 'How are you feeling?';
    }
  };

  const getProgressPercentage = () => {
    return Math.min((waterCount / 8) * 100, 100);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.background.primary}
      />
      
      {/* Header */}
      <View style={styles.header}>
        <Headline1 color={Colors.text.primary} align="center">
          💧 Hydra Sprite
        </Headline1>
        <Body2 color={Colors.text.secondary} align="center" style={styles.subtitle}>
          Keep your sprite happy and hydrated!
        </Body2>
      </View>

      {/* Sprite Container */}
      <ElevatedCard style={styles.spriteCard}>
        <View style={styles.spriteContainer}>
          <View style={styles.spriteEmoji}>
            <Headline1 style={{ fontSize: 80, textAlign: 'center' }}>
              {getSpriteEmoji()}
            </Headline1>
          </View>
          
          <Headline2 
            color={Colors.text.primary} 
            align="center"
            style={styles.spriteMessage}
          >
            {getSpriteMessage()}
          </Headline2>
        </View>
      </ElevatedCard>

      {/* Progress Section */}
      <FilledCard style={styles.progressCard}>
        <Body2 color={Colors.text.secondary} align="center" style={styles.progressLabel}>
          Daily Progress
        </Body2>
        
        <View style={styles.counterContainer}>
          <Headline1 color={Colors.primary.main} align="center">
            {waterCount}
          </Headline1>
          <Caption color={Colors.text.tertiary} align="center">
            of 8 glasses
          </Caption>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill,
                { width: `${getProgressPercentage()}%` }
              ]} 
            />
          </View>
          <Caption color={Colors.text.tertiary} style={styles.progressText}>
            {Math.round(getProgressPercentage())}% complete
          </Caption>
        </View>
      </FilledCard>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <PrimaryButton
          size="large"
          style={styles.addButton}
          onPress={() => addWater(1)}
        >
          +1 Glass
        </PrimaryButton>

        <SecondaryButton
          size="large"
          style={styles.addButton}
          onPress={() => addWater(2)}
        >
          +2 Glasses
        </SecondaryButton>
      </View>

      {/* Reset Button */}
      <View style={styles.resetContainer}>
        <OutlineButton
          size="medium"
          onPress={resetWater}
        >
          Reset Day
        </OutlineButton>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Caption color={Colors.text.tertiary} align="center">
          Stay hydrated and watch your sprite thrive! 🌟
        </Caption>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  
  header: {
    paddingVertical: Theme.spacing.xl,
    paddingHorizontal: Theme.spacing.lg,
    backgroundColor: Colors.background.primary,
  },
  
  subtitle: {
    marginTop: Theme.spacing.sm,
  },

  spriteCard: {
    marginHorizontal: Theme.spacing.lg,
    marginVertical: Theme.spacing.md,
  },

  spriteContainer: {
    alignItems: 'center',
    paddingVertical: Theme.spacing.xl,
  },

  spriteEmoji: {
    marginBottom: Theme.spacing.lg,
  },

  spriteMessage: {
    textAlign: 'center',
    paddingHorizontal: Theme.spacing.md,
  },

  progressCard: {
    marginHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.lg,
  },

  progressLabel: {
    marginBottom: Theme.spacing.md,
  },

  counterContainer: {
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
  },

  progressBarContainer: {
    alignItems: 'center',
  },

  progressBar: {
    height: 12,
    backgroundColor: Colors.utility.border,
    borderRadius: Theme.borderRadius.sm,
    width: '100%',
    overflow: 'hidden',
    marginBottom: Theme.spacing.sm,
  },

  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary.main,
    borderRadius: Theme.borderRadius.sm,
  },

  progressText: {
    marginTop: Theme.spacing.xs,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.md,
  },

  addButton: {
    flex: 1,
    marginHorizontal: Theme.spacing.xs,
  },

  resetContainer: {
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
  },

  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: Theme.spacing.xl,
    paddingHorizontal: Theme.spacing.lg,
  },
});

export default App;
