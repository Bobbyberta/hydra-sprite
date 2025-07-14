import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Platform,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        backgroundColor="#2196F3"
      />
      
      <View style={styles.header}>
        <Text style={styles.title}>💧 Hydra Sprite</Text>
        <Text style={styles.subtitle}>Keep your sprite happy and hydrated!</Text>
      </View>

      <View style={styles.spriteContainer}>
        <Text style={styles.spriteEmoji}>{getSpriteEmoji()}</Text>
        <Text style={styles.spriteMessage}>{getSpriteMessage()}</Text>
      </View>

      <View style={styles.counterContainer}>
        <Text style={styles.counterLabel}>Water Glasses Today</Text>
        <Text style={styles.counterValue}>{waterCount}</Text>
        <Text style={styles.goal}>Goal: 8 glasses</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.addButton]}
          onPress={() => addWater(1)}
        >
          <Text style={styles.buttonText}>+1 Glass</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.addButton]}
          onPress={() => addWater(2)}
        >
          <Text style={styles.buttonText}>+2 Glasses</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={resetWater}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Stay hydrated and watch your sprite thrive! 🌟
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#2196F3',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  spriteContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  spriteEmoji: {
    fontSize: 80,
    marginBottom: 15,
  },
  spriteMessage: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
    fontWeight: '500',
  },
  counterContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  counterLabel: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  counterValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 5,
  },
  goal: {
    fontSize: 14,
    color: '#999',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#4CAF50',
  },
  resetButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 30,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default App; 