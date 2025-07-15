/**
 * Styled Button Components using the Design System
 */

import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, StyleSheet, View } from 'react-native';
import { Colors } from '../colors';
import { BorderRadius, Shadows, Spacing } from '../spacing';
import { ButtonText } from './Text';

interface StyledButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'warning' | 'error';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const StyledButton: React.FC<StyledButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  style,
  disabled,
  children,
  ...props
}) => {
  const buttonStyle = [
    styles.base,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  const getTextColor = () => {
    if (disabled) return Colors.text.disabled;
    
    switch (variant) {
      case 'primary':
      case 'success':
      case 'warning':
      case 'error':
        return Colors.text.inverse;
      case 'secondary':
        return Colors.text.primary;
      case 'outline':
        return Colors.primary.main;
      case 'ghost':
        return Colors.primary.main;
      default:
        return Colors.text.inverse;
    }
  };

  return (
    <TouchableOpacity
      style={buttonStyle}
      disabled={disabled}
      activeOpacity={disabled ? 1 : 0.8}
      {...props}
    >
      <ButtonText color={getTextColor()}>
        {children}
      </ButtonText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.button,
    ...Shadows.sm,
  },
  
  // Variants
  primary: {
    backgroundColor: Colors.primary.main,
  },
  
  secondary: {
    backgroundColor: Colors.secondary.main,
  },
  
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.primary.main,
  },
  
  ghost: {
    backgroundColor: 'transparent',
  },
  
  success: {
    backgroundColor: Colors.semantic.success.main,
  },
  
  warning: {
    backgroundColor: Colors.semantic.warning.main,
  },
  
  error: {
    backgroundColor: Colors.semantic.error.main,
  },
  
  // Sizes
  small: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    minHeight: 36,
  },
  
  medium: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    minHeight: 44,
  },
  
  large: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    minHeight: 52,
  },
  
  // Modifiers
  fullWidth: {
    width: '100%',
  },
  
  disabled: {
    opacity: 0.5,
    ...Shadows.none,
  },
});

// Convenience button components
export const PrimaryButton: React.FC<Omit<StyledButtonProps, 'variant'>> = (props) => (
  <StyledButton variant="primary" {...props} />
);

export const SecondaryButton: React.FC<Omit<StyledButtonProps, 'variant'>> = (props) => (
  <StyledButton variant="secondary" {...props} />
);

export const OutlineButton: React.FC<Omit<StyledButtonProps, 'variant'>> = (props) => (
  <StyledButton variant="outline" {...props} />
);

export const GhostButton: React.FC<Omit<StyledButtonProps, 'variant'>> = (props) => (
  <StyledButton variant="ghost" {...props} />
);
