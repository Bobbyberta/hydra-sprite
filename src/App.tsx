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
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Design System
import { Colors, Theme } from './design-system';
import { Headline1, Headline2, Body1, Body2, Caption, ButtonText } from './design-system/components/Text';
import { PrimaryButton, SecondaryButton, OutlineButton } from './design-system/components/Button';
import { ElevatedCard, FilledCard } from './design-system/components/Card';

// Components
import SpriteCharacter from './components/Sprite/SpriteCharacter';

const { width, height } = Dimensions.get('window');

const App: React.FC = () => {
  const [waterCount, setWaterCount] = React.useState(0);
  const [spriteState, setSpriteState] = React.useState<'dehydrated' | 'concerned' | 'okay' | 'happy' | 'thriving'>('okay');
  const [showPopup, setShowPopup] = React.useState(false);
  const [popupText, setPopupText] = React.useState('');
  const popupAnimation = React.useRef(new Animated.Value(0)).current;
  const spriteFloatAnimation = React.useRef(new Animated.Value(0)).current;

  // Load water count from storage
  React.useEffect(() => {
    loadWaterCount();
  }, []);

  // Sprite floating animation
  React.useEffect(() => {
    const floatAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(spriteFloatAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(spriteFloatAnimation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );
    
    floatAnimation.start();
    
    return () => floatAnimation.stop();
  }, [spriteFloatAnimation]);

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
    
    // Show popup animation
    showWaterPopup(amount);
  };

  const showWaterPopup = (amount: number) => {
    const text = `+${amount} 🥤`;
    setPopupText(text);
    setShowPopup(true);
    
    // Reset animation
    popupAnimation.setValue(0);
    
    // Animate in
    Animated.sequence([
      Animated.timing(popupAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(800),
      Animated.timing(popupAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowPopup(false);
    });
  };

  const resetWater = async () => {
    setWaterCount(0);
    setSpriteState('dehydrated');
    await saveWaterCount(0);
    Alert.alert('Reset', 'Water count reset to 0');
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
        <Headline1 color={Colors.text.primary} align="center" style={styles.mainTitle}>
          💧 Hydra Sprite
        </Headline1>
        <Body2 color={Colors.text.primary} align="center" style={styles.subtitle}>
          Keep your sprite happy and hydrated!
        </Body2>
      </View>

      {/* Sprite Container */}
      <View style={styles.spriteContainer}>
        <Animated.View 
          style={[
            styles.spriteEmoji,
            {
              transform: [
                {
                  translateY: spriteFloatAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -8],
                  }),
                },
              ],
            },
          ]}
        >
          <SpriteCharacter 
            hydrationLevel={spriteState} 
            size={200}
          />
          
          {/* Water Popup Animation */}
          {showPopup && (
            <Animated.View
              style={[
                styles.waterPopup,
                {
                  opacity: popupAnimation,
                  transform: [
                    {
                      translateY: popupAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -30],
                      }),
                    },
                    {
                      scale: popupAnimation.interpolate({
                        inputRange: [0, 0.5, 1],
                        outputRange: [0.5, 1.2, 1],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Body1 color={Colors.primary.main} style={styles.popupText}>
                {popupText}
              </Body1>
            </Animated.View>
          )}
        </Animated.View>
        

      </View>

      {/* Progress Section */}
      <FilledCard style={styles.progressCard}>
        <View style={styles.counterContainer}>
          <Body1 color={Colors.text.primary} align="center">
            {waterCount} / 8 glasses
          </Body1>
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
        </View>
      </FilledCard>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <PrimaryButton
          size="large"
          style={[styles.addButton, styles.whiteButton]}
          onPress={() => addWater(1)}
        >
          <ButtonText color={Colors.text.primary}>Small Glass</ButtonText>
        </PrimaryButton>

        <PrimaryButton
          size="large"
          style={[styles.addButton, styles.whiteButton]}
          onPress={() => addWater(2)}
        >
          <ButtonText color={Colors.text.primary}>Large Glass</ButtonText>
        </PrimaryButton>

        <PrimaryButton
          size="large"
          style={[styles.addButton, styles.whiteButton]}
          onPress={() => addWater(4)}
        >
          <ButtonText color={Colors.text.primary}>Bottle</ButtonText>
        </PrimaryButton>
      </View>

      {/* Reset Button */}
      <View style={styles.resetContainer}>
        <OutlineButton
          size="medium"
          onPress={resetWater}
          style={styles.resetButton}
        >
          <ButtonText color={Colors.text.primary}>Reset Day</ButtonText>
        </OutlineButton>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Caption color={Colors.text.primary} align="center">
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
    paddingTop: Theme.spacing.sm,
  },
  
  header: {
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.lg,
    backgroundColor: Colors.background.primary,
  },
  
  subtitle: {
    marginTop: Theme.spacing.xs,
  },

  mainTitle: {
    fontFamily: 'Comfortaa-Bold',
    fontWeight: '700',
  },

  spriteContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.spacing.xxl,
    paddingHorizontal: Theme.spacing.lg,
    minHeight: 250,
    marginTop: Theme.spacing.md,
  },

  spriteEmoji: {
    marginBottom: Theme.spacing.sm,
  },



  progressCard: {
    marginHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.md,
  },

  counterContainer: {
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },

  progressBarContainer: {
    alignItems: 'center',
  },

  progressBar: {
    height: 8,
    backgroundColor: Colors.background.surface,
    borderRadius: Theme.borderRadius.sm,
    width: '100%',
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary.main,
    borderRadius: Theme.borderRadius.sm,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.sm,
  },

  addButton: {
    flex: 1,
    marginHorizontal: Theme.spacing.xs,
    minWidth: 80,
    paddingHorizontal: Theme.spacing.xs,
    paddingVertical: Theme.spacing.md,
  },

  resetContainer: {
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },

  resetButton: {
    backgroundColor: Colors.background.surface,
    borderColor: Colors.background.surface,
  },

  whiteButton: {
    backgroundColor: Colors.background.surface,
  },

  waterPopup: {
    position: 'absolute',
    top: -20,
    right: -10,
    backgroundColor: Colors.background.surface,
    borderRadius: Theme.borderRadius.md,
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  popupText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },

  footer: {
    justifyContent: 'flex-end',
    paddingBottom: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.lg,
  },
});

export default App;
