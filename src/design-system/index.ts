/**
 * Hydra Sprite Design System
 * Main export file for the complete design system
 */

// Colors
export * from './colors';
export { Colors, primary, secondary, background, text, semantic, sprite, utility, interactive } from './colors';

// Typography  
export * from './typography';
export { Typography, FontFamilies, FontSizes, FontWeights, headline1, headline2, subtitle1, body1, body2, button, caption } from './typography';

// Spacing
export * from './spacing';
export { Spacing, BorderRadius, Shadows, xs, sm, md, lg, xl, xxl, xxxl } from './spacing';

// Theme object combining all design tokens
export const Theme = {
  colors: {
    primary: '#6EE3FF',           // Mystic Dewdrop
    secondary: '#FFB3DA',         // Coral Glimmer  
    background: '#E0F7FA',        // Lagoon Whisper
    surface: '#B2EBF2',          // Seafoam Dream
    text: '#263238',              // Abyssal Ink
    textSecondary: '#546E7A',     // Lighter text
    white: '#FFFFFF',
    
    // Semantic colors
    success: '#4CAF50',
    warning: '#FF9800', 
    error: '#F44336',
    info: '#2196F3',
    
    // Sprite health states
    spriteHealthy: '#4CAF50',
    spriteHappy: '#8BC34A',
    spriteOkay: '#FFC107',
    spriteConcerned: '#FF9800',
    spriteDehydrated: '#F44336',
  },
  
  typography: {
    // Font families
    headingFont: 'Comfortaa',
    bodyFont: 'Inter',
    
    // Font sizes (sp)
    fontSize: {
      headline1: 34,    // App name, main titles
      headline2: 24,    // Section titles  
      subtitle1: 18,    // Secondary headings
      body1: 16,        // Main body text
      body2: 14,        // Secondary body text
      button: 14,       // Button text
      caption: 12,      // Small text, labels
    },
    
    // Font weights
    fontWeight: {
      regular: '400',
      medium: '500', 
      semiBold: '600',
      bold: '700',
    },
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
  },
  
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    circle: 999,
  },
  
  shadows: {
    light: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 6,
      elevation: 4,
    },
    heavy: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 10,
      elevation: 8,
    },
  },
} as const;

// Design system version
export const DESIGN_SYSTEM_VERSION = '1.0.0';

// Default export
export default Theme;
