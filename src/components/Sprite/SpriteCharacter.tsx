import React from 'react';
import Svg, { Circle, Path, G } from 'react-native-svg';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../../design-system/colors';

interface SpriteCharacterProps {
  hydrationLevel: 'dehydrated' | 'concerned' | 'okay' | 'happy' | 'thriving';
  size?: number;
}

const SpriteCharacter: React.FC<SpriteCharacterProps> = ({ 
  hydrationLevel, 
  size = 120 
}) => {
  const getSpriteColor = () => {
    switch (hydrationLevel) {
      case 'thriving':
        return Colors.sprite.thriving;
      case 'happy':
        return Colors.sprite.happy;
      case 'okay':
        return Colors.sprite.okay;
      case 'concerned':
        return Colors.sprite.concerned;
      case 'dehydrated':
        return Colors.sprite.dehydrated;
      default:
        return Colors.sprite.okay;
    }
  };

  const getEyeExpression = () => {
    switch (hydrationLevel) {
      case 'thriving':
        return { 
          left: { x: 35, y: 40, width: 12, height: 12, type: 'sparkly' },
          right: { x: 73, y: 40, width: 12, height: 12, type: 'sparkly' }
        };
      case 'happy':
        return { 
          left: { x: 35, y: 40, width: 12, height: 10, type: 'happy' },
          right: { x: 73, y: 40, width: 12, height: 10, type: 'happy' }
        };
      case 'okay':
        return { 
          left: { x: 35, y: 40, width: 12, height: 12, type: 'normal' },
          right: { x: 73, y: 40, width: 12, height: 12, type: 'normal' }
        };
      case 'concerned':
        return { 
          left: { x: 35, y: 42, width: 12, height: 8, type: 'concerned' },
          right: { x: 73, y: 42, width: 12, height: 8, type: 'concerned' }
        };
      case 'dehydrated':
        return { 
          left: { x: 35, y: 44, width: 12, height: 6, type: 'sad' },
          right: { x: 73, y: 44, width: 12, height: 6, type: 'sad' }
        };
      default:
        return { 
          left: { x: 35, y: 40, width: 12, height: 12, type: 'normal' },
          right: { x: 73, y: 40, width: 12, height: 12, type: 'normal' }
        };
    }
  };

  const getMouthExpression = () => {
    switch (hydrationLevel) {
      case 'thriving':
        return 'M 50 65 Q 60 75 70 65'; // Big happy smile
      case 'happy':
        return 'M 50 65 Q 60 70 70 65'; // Happy smile
      case 'okay':
        return 'M 50 65 L 70 65'; // Straight line
      case 'concerned':
        return 'M 50 65 Q 60 60 70 65'; // Slight frown
      case 'dehydrated':
        return 'M 50 65 Q 60 55 70 65'; // Sad frown
      default:
        return 'M 50 65 L 70 65';
    }
  };

  const getSparkles = () => {
    if (hydrationLevel === 'thriving') {
      return (
        <G>
          {/* Sparkle 1 */}
          <Path d="M 25 25 L 27 27 L 29 25 L 27 23 Z" fill={Colors.primary.main} />
          <Path d="M 27 23 L 27 27 L 25 25 L 29 25 Z" fill={Colors.primary.main} />
          {/* Sparkle 2 */}
          <Path d="M 95 30 L 97 32 L 99 30 L 97 28 Z" fill={Colors.secondary.main} />
          <Path d="M 97 28 L 97 32 L 95 30 L 99 30 Z" fill={Colors.secondary.main} />
          {/* Sparkle 3 */}
          <Path d="M 20 80 L 22 82 L 24 80 L 22 78 Z" fill={Colors.primary.light} />
          <Path d="M 22 78 L 22 82 L 20 80 L 24 80 Z" fill={Colors.primary.light} />
        </G>
      );
    }
    return null;
  };

  const eyeExpression = getEyeExpression();
  const mouthExpression = getMouthExpression();
  const spriteColor = getSpriteColor();

  return (
    <View style={styles.container}>
      <Svg width={size} height={size} viewBox="0 0 120 120">
        {/* Main body - water drop shape */}
        <Path
          d="M 60 20 Q 80 20 90 40 Q 100 60 90 80 Q 80 100 60 100 Q 40 100 30 80 Q 20 60 30 40 Q 40 20 60 20 Z"
          fill={spriteColor}
          stroke={Colors.primary.dark}
          strokeWidth="2"
        />
        
        {/* Left Eye */}
        <G>
          {/* Eye white */}
          <Circle
            cx={eyeExpression.left.x + eyeExpression.left.width/2}
            cy={eyeExpression.left.y + eyeExpression.left.height/2}
            r={eyeExpression.left.width/2}
            fill={Colors.background.surface}
            stroke={Colors.text.primary}
            strokeWidth="1.5"
          />
          {/* Eye pupil */}
          <Circle
            cx={eyeExpression.left.x + eyeExpression.left.width/2}
            cy={eyeExpression.left.y + eyeExpression.left.height/2}
            r="3"
            fill={Colors.text.primary}
          />
          {/* Eye shine */}
          <Circle
            cx={eyeExpression.left.x + eyeExpression.left.width/2 - 1}
            cy={eyeExpression.left.y + eyeExpression.left.height/2 - 1}
            r="1"
            fill={Colors.background.surface}
          />
        </G>

        {/* Right Eye */}
        <G>
          {/* Eye white */}
          <Circle
            cx={eyeExpression.right.x + eyeExpression.right.width/2}
            cy={eyeExpression.right.y + eyeExpression.right.height/2}
            r={eyeExpression.right.width/2}
            fill={Colors.background.surface}
            stroke={Colors.text.primary}
            strokeWidth="1.5"
          />
          {/* Eye pupil */}
          <Circle
            cx={eyeExpression.right.x + eyeExpression.right.width/2}
            cy={eyeExpression.right.y + eyeExpression.right.height/2}
            r="3"
            fill={Colors.text.primary}
          />
          {/* Eye shine */}
          <Circle
            cx={eyeExpression.right.x + eyeExpression.right.width/2 - 1}
            cy={eyeExpression.right.y + eyeExpression.right.height/2 - 1}
            r="1"
            fill={Colors.background.surface}
          />
        </G>
        
        {/* Mouth */}
        <Path
          d={mouthExpression}
          stroke={Colors.text.primary}
          strokeWidth="3"
          fill="none"
        />
        
        {/* Sparkles for thriving state */}
        {getSparkles()}
        
        {/* Water droplet details */}
        <Circle cx="60" cy="35" r="3" fill={Colors.primary.light} opacity="0.6" />
        <Circle cx="55" cy="30" r="2" fill={Colors.primary.light} opacity="0.4" />
        <Circle cx="65" cy="32" r="2" fill={Colors.primary.light} opacity="0.4" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SpriteCharacter; 