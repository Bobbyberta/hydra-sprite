/**
 * Styled Text Components using the Design System
 */

import React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';
import { Typography } from '../typography';
import { Colors } from '../colors';

interface StyledTextProps extends TextProps {
  color?: string;
  align?: 'left' | 'center' | 'right';
}

// Headline Components (using Comfortaa)
export const Headline1: React.FC<StyledTextProps> = ({ 
  style, 
  color = Colors.text.primary, 
  align = 'left',
  ...props 
}) => (
  <RNText 
    style={[
      Typography.headline1,
      { color, textAlign: align },
      style
    ]} 
    {...props} 
  />
);

export const Headline2: React.FC<StyledTextProps> = ({ 
  style, 
  color = Colors.text.primary, 
  align = 'left',
  ...props 
}) => (
  <RNText 
    style={[
      Typography.headline2,
      { color, textAlign: align },
      style
    ]} 
    {...props} 
  />
);

// Subtitle Components (using Inter Medium)
export const Subtitle1: React.FC<StyledTextProps> = ({ 
  style, 
  color = Colors.text.primary, 
  align = 'left',
  ...props 
}) => (
  <RNText 
    style={[
      Typography.subtitle1,
      { color, textAlign: align },
      style
    ]} 
    {...props} 
  />
);

// Body Text Components (using Inter Regular)
export const Body1: React.FC<StyledTextProps> = ({ 
  style, 
  color = Colors.text.primary, 
  align = 'left',
  ...props 
}) => (
  <RNText 
    style={[
      Typography.body1,
      { color, textAlign: align },
      style
    ]} 
    {...props} 
  />
);

export const Body2: React.FC<StyledTextProps> = ({ 
  style, 
  color = Colors.text.secondary, 
  align = 'left',
  ...props 
}) => (
  <RNText 
    style={[
      Typography.body2,
      { color, textAlign: align },
      style
    ]} 
    {...props} 
  />
);

// Button Text Component
export const ButtonText: React.FC<StyledTextProps> = ({ 
  style, 
  color = Colors.text.inverse, 
  align = 'center',
  ...props 
}) => (
  <RNText 
    style={[
      Typography.button,
      { color, textAlign: align },
      style
    ]} 
    {...props} 
  />
);

// Caption/Small Text Component
export const Caption: React.FC<StyledTextProps> = ({ 
  style, 
  color = Colors.text.tertiary, 
  align = 'left',
  ...props 
}) => (
  <RNText 
    style={[
      Typography.caption,
      { color, textAlign: align },
      style
    ]} 
    {...props} 
  />
);

// Generic StyledText component for custom styling
export const StyledText: React.FC<StyledTextProps & { 
  variant?: keyof typeof Typography 
}> = ({ 
  style, 
  color = Colors.text.primary, 
  align = 'left',
  variant = 'body1',
  ...props 
}) => (
  <RNText 
    style={[
      Typography[variant],
      { color, textAlign: align },
      style
    ]} 
    {...props} 
  />
);
