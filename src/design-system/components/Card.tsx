/**
 * Styled Card Component using the Design System
 */

import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { Colors } from '../colors';
import { BorderRadius, Shadows, Spacing } from '../spacing';

interface CardProps extends ViewProps {
  variant?: 'elevated' | 'outlined' | 'filled';
  padding?: keyof typeof Spacing;
  margin?: keyof typeof Spacing;
  shadow?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  variant = 'elevated',
  padding = 'lg',
  margin,
  shadow = 'md',
  style,
  children,
  ...props
}) => {
  const cardStyle = [
    styles.base,
    styles[variant],
    padding && { padding: Spacing[padding] },
    margin && { margin: Spacing[margin] },
    shadow !== 'none' && Shadows[shadow],
    style,
  ];

  return (
    <View style={cardStyle} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: BorderRadius.card,
  },
  
  elevated: {
    backgroundColor: Colors.background.surface,
  },
  
  outlined: {
    backgroundColor: Colors.background.surface,
    borderWidth: 1,
    borderColor: Colors.utility.border,
  },
  
  filled: {
    backgroundColor: Colors.background.secondary,
  },
});

// Convenience card components
export const ElevatedCard: React.FC<Omit<CardProps, 'variant'>> = (props) => (
  <Card variant="elevated" {...props} />
);

export const OutlinedCard: React.FC<Omit<CardProps, 'variant'>> = (props) => (
  <Card variant="outlined" {...props} />
);

export const FilledCard: React.FC<Omit<CardProps, 'variant'>> = (props) => (
  <Card variant="filled" {...props} />
);
