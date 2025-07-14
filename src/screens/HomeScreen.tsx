import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {WaterStorage} from '../services/WaterStorage';
import {SpriteEngine} from '../services/SpriteEngine';
import SpriteCharacter from '../components/Sprite/SpriteCharacter';
import WaterLogger from '../components/WaterLogger/WaterLogger';

const {width, height} = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const [waterToday, setWaterToday] = useState(0);
  const [spriteHealth, setSpriteHealth] = useState('happy');
  const [animationValue] = useState(new Animated.Value(1));

  useEffect(() => {
    loadTodaysWater();
  }, []);

  useEffect(() => {
    const health = SpriteEngine.calculateSpriteHealth(waterToday);
    setSpriteHealth(health);
  }, [waterToday]);

  const loadTodaysWater = async () => {
    try {
      const todaysIntake = await WaterStorage.getTodaysWaterIntake();
      setWaterToday(todaysIntake);
    } catch (error) {
      console.error('Error loading water data:', error);
    }
  };

  const handleWaterLogged = async (amount: number) => {
    try {
      await WaterStorage.logWaterIntake(amount);
      const newTotal = await WaterStorage.getTodaysWaterIntake();
      setWaterToday(newTotal);
      
      // Animate sprite reaction
      Animated.sequence([
        Animated.timing(animationValue, {
          toValue: 1.2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(animationValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } catch (error) {
      console.error('Error logging water:', error);
    }
  };

  const getProgressPercentage = () => {
    const dailyGoal = 8; // 8 glasses per day
    return Math.min((waterToday / dailyGoal) * 100, 100);
  };

  const getMotivationalMessage = () => {
    const progress = getProgressPercentage();
    if (progress < 25) {
      return "Your sprite needs water! 💧";
    } else if (progress < 50) {
      return "Good start! Keep going! 🌱";
    } else if (progress < 75) {
      return "Awesome progress! 🌿";
    } else if (progress < 100) {
      return "Almost there! Your sprite is thriving! 🌟";
    } else {
      return "Perfect! Your sprite is super happy! ✨";
    }
  };

  return (
    <View style={styles.container}>
      {/* Sprite Container */}
      <View style={styles.spriteContainer}>
        <Animated.View
          style={[
            styles.spriteWrapper,
            {transform: [{scale: animationValue}]},
          ]}>
          <SpriteCharacter health={spriteHealth} />
        </Animated.View>
        
        <Text style={styles.spriteHealthText}>
          {spriteHealth === 'thriving' && '🌟 Thriving'}
          {spriteHealth === 'happy' && '😊 Happy'}
          {spriteHealth === 'okay' && '😐 Okay'}
          {spriteHealth === 'concerned' && '😟 Concerned'}
          {spriteHealth === 'dehydrated' && '😵 Dehydrated'}
        </Text>
      </View>

      {/* Progress Section */}
      <View style={styles.progressContainer}>
        <Text style={styles.motivationalText}>
          {getMotivationalMessage()}
        </Text>
        
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              {width: `${getProgressPercentage()}%`}
            ]} 
          />
        </View>
        
        <Text style={styles.progressText}>
          {waterToday} / 8 glasses today
        </Text>
      </View>

      {/* Water Logger */}
      <View style={styles.loggerContainer}>
        <WaterLogger onWaterLogged={handleWaterLogged} />
      </View>

      {/* Daily Goal Achievement */}
      {getProgressPercentage() >= 100 && (
        <View style={styles.achievementContainer}>
          <Icon name="emoji-events" size={24} color="#FFD700" />
          <Text style={styles.achievementText}>
            Daily goal achieved! 🎉
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
    padding: 20,
  },
  spriteContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  spriteWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  spriteHealthText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976D2',
    marginTop: 10,
  },
  progressContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  motivationalText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginBottom: 15,
    fontWeight: '500',
  },
  progressBar: {
    height: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2196F3',
    borderRadius: 6,
  },
  progressText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  loggerContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  achievementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF3E0',
    borderRadius: 10,
    padding: 15,
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  achievementText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F57C00',
  },
});

export default HomeScreen; 