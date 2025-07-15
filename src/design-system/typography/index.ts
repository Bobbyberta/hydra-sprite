/**
 * Hydra Sprite Design System - Typography
 * Comfortaa and Inter font combinations for beautiful, readable text
 */

import { Platform } from 'react-native';

// Font Families
export const FontFamilies = {
  // Comfortaa for headings (display font)
  comfortaa: {
    regular: Platform.select({
      ios: 'Comfortaa-Regular',
      android: 'Comfortaa-Regular',
      default: 'Comfortaa',
    }),
    medium: Platform.select({
      ios: 'Comfortaa-Medium',
      android: 'Comfortaa-Medium',
      default: 'Comfortaa',
    }),
    semiBold: Platform.select({
      ios: 'Comfortaa-SemiBold',
      android: 'Comfortaa-SemiBold',
      default: 'Comfortaa',
    }),
    bold: Platform.select({
      ios: 'Comfortaa-Bold',
      android: 'Comfortaa-Bold',
      default: 'Comfortaa',
    }),
  },
  
  // Inter for body text (reading font)
  inter: {
    regular: Platform.select({
      ios: 'Inter-Regular',
      android: 'Inter-Regular',
      default: 'Inter',
    }),
    medium: Platform.select({
      ios: 'Inter-Medium',
      android: 'Inter-Medium',
      default: 'Inter',
    }),
    semiBold: Platform.select({
      ios: 'Inter-SemiBold',
      android: 'Inter-SemiBold',
      default: 'Inter',
    }),
    bold: Platform.select({
      ios: 'Inter-Bold',
      android: 'Inter-Bold',
      default: 'Inter',
    }),
  },
  
  // System fallbacks
  system: {
    regular: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'System',
    }),
    medium: Platform.select({
      ios: 'System',
      android: 'Roboto-Medium',
      default: 'System',
    }),
    bold: Platform.select({
      ios: 'System',
      android: 'Roboto-Bold',
      default: 'System',
    }),
  },
} as const;

// Font Weights
export const FontWeights = {
  regular: '400' as const,
  medium: '500' as const,
  semiBold: '600' as const,
  bold: '700' as const,
} as const;

// Font Sizes (in sp - Scale-independent Pixels)
export const FontSizes = {
  // Headlines
  headline1: 34,    // Largest, for main titles/app name (Comfortaa Medium/SemiBold)
  headline2: 24,    // Section titles, major features (Comfortaa Regular/Medium)
  
  // Subtitles
  subtitle1: 18,    // Secondary headings, prominent details (Inter Medium)
  
  // Body Text
  body1: 16,        // Main body text, general information (Inter Regular)
  body2: 14,        // Lesser important body text, list items, input fields (Inter Regular)
  
  // Interactive Elements
  button: 14,       // Button text (Inter Medium)
  
  // Small Text
  caption: 12,      // Labels, timestamps, minor notes (Inter Regular)
  
  // Additional sizes for flexibility
  small: 10,        // Very small text
  large: 20,        // Large body text
  xlarge: 28,       // Extra large text
} as const;

// Line Heights (calculated for optimal readability)
export const LineHeights = {
  tight: 1.2,       // For headlines
  normal: 1.4,      // For body text
  relaxed: 1.6,     // For comfortable reading
  loose: 1.8,       // For very relaxed reading
} as const;

// Letter Spacing (for fine-tuning readability)
export const LetterSpacing = {
  tight: -0.5,      // For large headlines
  normal: 0,        // Default
  wide: 0.5,        // For small text
  wider: 1,         // For very small text or labels
} as const;

// Complete Typography Scale
export const Typography = {
  // Headlines (using Comfortaa)
  headline1: {
    fontFamily: FontFamilies.comfortaa.semiBold,
    fontSize: FontSizes.headline1,
    lineHeight: FontSizes.headline1 * LineHeights.tight,
    letterSpacing: LetterSpacing.tight,
    fontWeight: FontWeights.semiBold,
  },
  
  headline2: {
    fontFamily: FontFamilies.comfortaa.medium,
    fontSize: FontSizes.headline2,
    lineHeight: FontSizes.headline2 * LineHeights.tight,
    letterSpacing: LetterSpacing.normal,
    fontWeight: FontWeights.medium,
  },
  
  // Subtitles (using Inter)
  subtitle1: {
    fontFamily: FontFamilies.inter.medium,
    fontSize: FontSizes.subtitle1,
    lineHeight: FontSizes.subtitle1 * LineHeights.normal,
    letterSpacing: LetterSpacing.normal,
    fontWeight: FontWeights.medium,
  },
  
  // Body Text (using Inter)
  body1: {
    fontFamily: FontFamilies.inter.regular,
    fontSize: FontSizes.body1,
    lineHeight: FontSizes.body1 * LineHeights.normal,
    letterSpacing: LetterSpacing.normal,
    fontWeight: FontWeights.regular,
  },
  
  body2: {
    fontFamily: FontFamilies.inter.regular,
    fontSize: FontSizes.body2,
    lineHeight: FontSizes.body2 * LineHeights.normal,
    letterSpacing: LetterSpacing.normal,
    fontWeight: FontWeights.regular,
  },
  
  // Interactive Elements
  button: {
    fontFamily: FontFamilies.inter.medium,
    fontSize: FontSizes.button,
    lineHeight: FontSizes.button * LineHeights.normal,
    letterSpacing: LetterSpacing.normal,
    fontWeight: FontWeights.medium,
  },
  
  // Small Text
  caption: {
    fontFamily: FontFamilies.inter.regular,
    fontSize: FontSizes.caption,
    lineHeight: FontSizes.caption * LineHeights.normal,
    letterSpacing: LetterSpacing.wide,
    fontWeight: FontWeights.regular,
  },
  
  // Additional Utility Styles
  largeBody: {
    fontFamily: FontFamilies.inter.regular,
    fontSize: FontSizes.large,
    lineHeight: FontSizes.large * LineHeights.normal,
    letterSpacing: LetterSpacing.normal,
    fontWeight: FontWeights.regular,
  },
  
  smallCaption: {
    fontFamily: FontFamilies.inter.regular,
    fontSize: FontSizes.small,
    lineHeight: FontSizes.small * LineHeights.normal,
    letterSpacing: LetterSpacing.wider,
    fontWeight: FontWeights.regular,
  },
  
  // Special variants
  buttonLarge: {
    fontFamily: FontFamilies.inter.medium,
    fontSize: FontSizes.body1,
    lineHeight: FontSizes.body1 * LineHeights.normal,
    letterSpacing: LetterSpacing.normal,
    fontWeight: FontWeights.medium,
  },
  
  headlineSmall: {
    fontFamily: FontFamilies.comfortaa.regular,
    fontSize: FontSizes.large,
    lineHeight: FontSizes.large * LineHeights.tight,
    letterSpacing: LetterSpacing.normal,
    fontWeight: FontWeights.regular,
  },
} as const;

// Helper function to create text styles with color
export const createTextStyle = (
  typographyKey: keyof typeof Typography,
  color: string,
  additionalStyles?: object
) => ({
  ...Typography[typographyKey],
  color,
  ...additionalStyles,
});

// Helper function for responsive text sizes
export const getResponsiveFontSize = (baseSize: number, screenWidth: number): number => {
  // Scale factor based on screen width (375 is base iPhone width)
  const scaleFactor = screenWidth / 375;
  const minScale = 0.8;   // Minimum scale factor
  const maxScale = 1.2;   // Maximum scale factor
  
  const adjustedScale = Math.max(minScale, Math.min(maxScale, scaleFactor));
  return Math.round(baseSize * adjustedScale);
};

// Export individual elements for convenience
export const {
  headline1,
  headline2,
  subtitle1,
  body1,
  body2,
  button,
  caption,
} = Typography;
