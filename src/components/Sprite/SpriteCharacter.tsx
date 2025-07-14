import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated, Easing} from 'react-native';
import {SpriteEngine, SpriteHealth} from '../../services/SpriteEngine';

interface SpriteCharacterProps {
  health: SpriteHealth;
  size?: number;
}

const SpriteCharacter: React.FC<SpriteCharacterProps> = ({
  health,
  size = 120,
}) => {
  const floatAnimation = useRef(new Animated.Value(0)).current;
  const pulseAnimation = useRef(new Animated.Value(1)).current;
  const rotateAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Floating animation
    const floatingLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnimation, {
          toValue: 1,
          duration: SpriteEngine.getAnimationDuration(health),
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnimation, {
          toValue: 0,
          duration: SpriteEngine.getAnimationDuration(health),
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    );

    // Pulse animation for thriving sprite
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    floatingLoop.start();
    
    if (health === 'thriving') {
      pulseLoop.start();
    }

    return () => {
      floatingLoop.stop();
      pulseLoop.stop();
    };
  }, [health, floatAnimation, pulseAnimation]);

  const translateY = floatAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  const spriteScale = SpriteEngine.getSpriteSize(health);
  const spriteColor = SpriteEngine.getSpriteColor(health);

  return (
    <View style={[styles.container, {width: size, height: size}]}>
      <Animated.View
        style={[
          styles.sprite,
          {
            transform: [
              {translateY},
              {scale: pulseAnimation},
              {scale: spriteScale},
            ],
          },
        ]}>
        {/* Main sprite body */}
        <View
          style={[
            styles.spriteBody,
            {
              backgroundColor: spriteColor,
              width: size * 0.8,
              height: size * 0.8,
            },
          ]}>
          {/* Eyes */}
          <View style={styles.eyesContainer}>
            <View style={[styles.eye, getEyeStyle(health)]} />
            <View style={[styles.eye, getEyeStyle(health)]} />
          </View>

          {/* Mouth */}
          <View style={[styles.mouth, getMouthStyle(health)]} />

          {/* Health indicator dots */}
          {health === 'thriving' && (
            <View style={styles.sparkles}>
              <View style={[styles.sparkle, styles.sparkle1]} />
              <View style={[styles.sparkle, styles.sparkle2]} />
              <View style={[styles.sparkle, styles.sparkle3]} />
            </View>
          )}

          {/* Dehydration indicators */}
          {health === 'dehydrated' && (
            <View style={styles.dehydrationLines}>
              <View style={styles.dehydrationLine} />
              <View style={styles.dehydrationLine} />
            </View>
          )}
        </View>

        {/* Water drops for happy states */}
        {(health === 'happy' || health === 'thriving') && (
          <View style={styles.waterDrops}>
            <View style={[styles.waterDrop, styles.drop1]} />
            <View style={[styles.waterDrop, styles.drop2]} />
          </View>
        )}
      </Animated.View>
    </View>
  );
};

const getEyeStyle = (health: SpriteHealth) => {
  switch (health) {
    case 'thriving':
    case 'happy':
      return {backgroundColor: '#333'};
    case 'okay':
      return {backgroundColor: '#666'};
    case 'concerned':
      return {backgroundColor: '#888', transform: [{scaleY: 0.8}]};
    case 'dehydrated':
      return {backgroundColor: '#aaa', transform: [{scaleY: 0.6}]};
    default:
      return {backgroundColor: '#333'};
  }
};

const getMouthStyle = (health: SpriteHealth) => {
  switch (health) {
    case 'thriving':
      return {
        borderBottomColor: '#333',
        borderBottomWidth: 3,
        borderRadius: 20,
        width: 20,
        height: 10,
        transform: [{rotate: '0deg'}],
      };
    case 'happy':
      return {
        borderBottomColor: '#333',
        borderBottomWidth: 2,
        borderRadius: 15,
        width: 16,
        height: 8,
      };
    case 'okay':
      return {
        backgroundColor: '#333',
        width: 12,
        height: 2,
        borderRadius: 1,
      };
    case 'concerned':
      return {
        borderTopColor: '#333',
        borderTopWidth: 2,
        borderRadius: 10,
        width: 12,
        height: 6,
      };
    case 'dehydrated':
      return {
        borderTopColor: '#333',
        borderTopWidth: 2,
        borderRadius: 8,
        width: 8,
        height: 4,
      };
    default:
      return {
        backgroundColor: '#333',
        width: 10,
        height: 2,
        borderRadius: 1,
      };
  }
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sprite: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  spriteBody: {
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  eyesContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: '35%',
    gap: 12,
  },
  eye: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  mouth: {
    position: 'absolute',
    bottom: '35%',
  },
  sparkles: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  sparkle: {
    position: 'absolute',
    width: 4,
    height: 4,
    backgroundColor: '#FFD700',
    borderRadius: 2,
  },
  sparkle1: {
    top: '20%',
    right: '10%',
  },
  sparkle2: {
    top: '60%',
    left: '15%',
  },
  sparkle3: {
    top: '40%',
    right: '20%',
  },
  dehydrationLines: {
    position: 'absolute',
    right: '15%',
    top: '30%',
  },
  dehydrationLine: {
    width: 2,
    height: 8,
    backgroundColor: '#333',
    marginBottom: 2,
    opacity: 0.6,
  },
  waterDrops: {
    position: 'absolute',
    width: '120%',
    height: '120%',
  },
  waterDrop: {
    position: 'absolute',
    width: 6,
    height: 8,
    backgroundColor: '#2196F3',
    borderRadius: 3,
    opacity: 0.7,
  },
  drop1: {
    top: '10%',
    left: '20%',
  },
  drop2: {
    bottom: '15%',
    right: '25%',
  },
});

export default SpriteCharacter; 