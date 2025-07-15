/**
 * Hydra Sprite Design System - Spacing, Border Radius, and Shadows
 * Consistent spacing and visual style values
 */

// Spacing values (in pixels)
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

// Border Radius values
export const BorderRadius = {
  none: 0,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  circle: 999,
  // Specific component border radius
  button: 12,
  card: 16,
  input: 8,
} as const;

// Shadow styles for React Native
export const Shadows = {
  none: {},
  
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  
  lg: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  
  xl: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 15,
    elevation: 12,
  },
} as const;

// Export individual spacing values for convenience
export const {
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
  xxxl,
} = Spacing;

// Helper function to get spacing value
export const getSpacing = (key: keyof typeof Spacing): number => Spacing[key];

// Helper function to get border radius value
export const getBorderRadius = (key: keyof typeof BorderRadius): number => BorderRadius[key];

// Helper function to create custom spacing
export const createSpacing = (multiplier: number): number => Spacing.md * multiplier; 