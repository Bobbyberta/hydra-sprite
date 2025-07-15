/**
 * Hydra Sprite Design System - Colors
 * Beautiful ocean-inspired color palette for the new design
 */

export const Colors = {
  // Primary Colors
  primary: {
    // Mystic Dewdrop - Primary accent
    main: '#6EE3FF',
    // Lighter and darker variants for different use cases
    light: '#A8EFFF',
    dark: '#2DCFEF',
    // With opacity variants
    10: '#6EE3FF1A',  // 10% opacity
    20: '#6EE3FF33',  // 20% opacity
    30: '#6EE3FF4D',  // 30% opacity
    50: '#6EE3FF80',  // 50% opacity
  },

  // Secondary Colors
  secondary: {
    // Coral Glimmer - Secondary accent
    main: '#FFB3DA',
    // Lighter and darker variants
    light: '#FFD1E8',
    dark: '#FF8CC7',
    // With opacity variants
    10: '#FFB3DA1A',  // 10% opacity
    20: '#FFB3DA33',  // 20% opacity
    30: '#FFB3DA4D',  // 30% opacity
    50: '#FFB3DA80',  // 50% opacity
  },

  // Background Colors
  background: {
    // Lagoon Whisper - Main background
    primary: '#E0F7FA',
    // Seafoam Dream - Secondary background/elements
    secondary: '#B2EBF2',
    // Pure white for cards and elevated surfaces
    surface: '#FFFFFF',
    // Slightly off-white for subtle contrast
    subtle: '#FAFAFA',
  },

  // Text Colors
  text: {
    // Abyssal Ink - Main text color
    primary: '#263238',
    // Lighter version for secondary text
    secondary: '#546E7A',
    // Even lighter for subtle text
    tertiary: '#78909C',
    // Light text for dark backgrounds
    inverse: '#FFFFFF',
    // Text with opacity variants
    primaryLight: '#26323880',  // 50% opacity
    disabled: '#26323860',      // 38% opacity
  },

  // Semantic Colors (for feedback, status, etc.)
  semantic: {
    // Success states
    success: {
      main: '#4CAF50',
      light: '#81C784',
      dark: '#388E3C',
    },
    // Warning states
    warning: {
      main: '#FF9800',
      light: '#FFB74D',
      dark: '#F57C00',
    },
    // Error states
    error: {
      main: '#F44336',
      light: '#E57373',
      dark: '#D32F2F',
    },
    // Info states
    info: {
      main: '#2196F3',
      light: '#64B5F6',
      dark: '#1976D2',
    },
  },

  // Sprite Health Colors (for different sprite states)
  sprite: {
    thriving: '#4CAF50',    // Green for healthy/thriving
    happy: '#8BC34A',       // Light green for happy
    okay: '#FFC107',        // Yellow for okay/neutral
    concerned: '#FF9800',   // Orange for concerned
    dehydrated: '#F44336',  // Red for dehydrated/critical
  },

  // Additional Utility Colors
  utility: {
    // Shadows
    shadow: '#00000015',    // 8% black for shadows
    shadowDark: '#00000025', // 15% black for deeper shadows
    
    // Borders
    border: '#E0E0E0',
    borderLight: '#F5F5F5',
    borderDark: '#BDBDBD',
    
    // Overlays
    overlay: '#00000050',   // 30% black for modal overlays
    overlayLight: '#00000020', // 12% black for light overlays
  },

  // Interactive States
  interactive: {
    // Hover states
    hover: {
      primary: '#5DD6F0',   // Darker version of primary
      secondary: '#FF9FCC', // Darker version of secondary
      surface: '#F5F5F5',   // Light gray for surface hover
    },
    
    // Pressed/Active states
    pressed: {
      primary: '#4DC9E6',   // Even darker version of primary
      secondary: '#FF7FB8', // Even darker version of secondary
      surface: '#EEEEEE',   // Darker gray for surface press
    },
    
    // Focus states
    focus: {
      ring: '#6EE3FF80',    // 50% opacity primary for focus rings
      outline: '#6EE3FF',   // Full opacity primary for outlines
    },
  },
} as const;

// Color helper functions
export const getColorWithOpacity = (color: string, opacity: number): string => {
  // Convert hex to rgba with opacity
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const getSpriteColorForHealth = (health: string): string => {
  switch (health) {
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

// Export individual color palettes for convenience
export const {
  primary,
  secondary,
  background,
  text,
  semantic,
  sprite,
  utility,
  interactive,
} = Colors;
