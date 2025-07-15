# 🎨 Hydra Sprite Design System Guide

## Overview
This guide documents the complete design system for Hydra Sprite, featuring the beautiful ocean-inspired color palette and typography combining Comfortaa and Inter fonts.

## 🌊 Color Palette

### Primary Colors
- **Mystic Dewdrop** (#6EE3FF) - Primary accent color
- **Coral Glimmer** (#FFB3DA) - Secondary accent color

### Background Colors
- **Lagoon Whisper** (#E0F7FA) - Main background
- **Seafoam Dream** (#B2EBF2) - Secondary background/elements

### Text Colors
- **Abyssal Ink** (#263238) - Primary text color
- **Secondary Text** (#546E7A) - Less prominent text
- **Tertiary Text** (#78909C) - Subtle text and captions

## 📝 Typography Scale

### Comfortaa Font (Headlines)
- **Headline 1**: 34sp, Comfortaa Medium/SemiBold
  - Use for: App name, main titles
  - Purpose: Maximum visual impact

- **Headline 2**: 24sp, Comfortaa Regular/Medium  
  - Use for: Section titles, major features
  - Purpose: Important page titles

### Inter Font (Body Text)
- **Subtitle 1**: 18sp, Inter Medium
  - Use for: Secondary headings, prominent details
  - Purpose: Sub-sections, key phrases

- **Body 1**: 16sp, Inter Regular
  - Use for: Main body text, general information
  - Purpose: Default readable content

- **Body 2**: 14sp, Inter Regular
  - Use for: Lesser important text, list items, input fields
  - Purpose: Space-limited or secondary content

- **Button Text**: 14sp, Inter Medium
  - Use for: All interactive buttons
  - Purpose: Clear, actionable text

- **Caption**: 12sp, Inter Regular
  - Use for: Labels, timestamps, minor notes
  - Purpose: Small, less critical information

## 🎯 Design Principles

### 1. Ocean-Inspired Harmony
- Colors evoke calm, refreshing water themes
- Gradual transitions between sprite health states
- Soft, welcoming visual atmosphere

### 2. Typography Hierarchy
- **Comfortaa** for display and emotional connection
- **Inter** for clarity and readability
- Clear size distinctions for information hierarchy

### 3. Consistent Spacing
- Base unit: 8px spacing system
- Generous whitespace for breathing room
- Consistent padding and margins

### 4. Meaningful Color Usage
- Primary color (#6EE3FF) for water-related actions
- Secondary color (#FFB3DA) for positive feedback
- Semantic colors for different sprite health states

## 🔧 Implementation

### Using Design System Components

```typescript
import { 
  Headline1, 
  Headline2, 
  Body1, 
  PrimaryButton,
  ElevatedCard 
} from './design-system/components';
import { Colors, Theme } from './design-system';

// Typography
<Headline1 color={Colors.text.primary}>App Title</Headline1>
<Body1 color={Colors.text.secondary}>Description text</Body1>

// Buttons
<PrimaryButton onPress={handlePress}>
  Add Water
</PrimaryButton>

// Cards
<ElevatedCard padding="lg">
  <Body1>Card content</Body1>
</ElevatedCard>
```

### Color Usage Guidelines

```typescript
// Primary actions (water logging)
backgroundColor: Colors.primary.main

// Secondary actions (settings, info)
backgroundColor: Colors.secondary.main

// Text hierarchy
color: Colors.text.primary      // Main headings
color: Colors.text.secondary    // Body text
color: Colors.text.tertiary     // Captions

// Backgrounds
backgroundColor: Colors.background.primary    // Main screen
backgroundColor: Colors.background.secondary  // Cards
backgroundColor: Colors.background.surface    // Elevated surfaces
```

## 🧩 Component Library

### Text Components
- `Headline1` - Main app titles (Comfortaa)
- `Headline2` - Section headers (Comfortaa)  
- `Subtitle1` - Sub-headers (Inter Medium)
- `Body1` - Main content (Inter Regular)
- `Body2` - Secondary content (Inter Regular)
- `ButtonText` - Interactive text (Inter Medium)
- `Caption` - Small text (Inter Regular)

### Button Components
- `PrimaryButton` - Main actions (Mystic Dewdrop)
- `SecondaryButton` - Secondary actions (Coral Glimmer)
- `OutlineButton` - Subtle actions
- `GhostButton` - Minimal actions

### Card Components
- `ElevatedCard` - Main content containers
- `OutlinedCard` - Bordered containers
- `FilledCard` - Colored background containers

## 🎨 Sprite Health Color Mapping

```typescript
const spriteColors = {
  thriving: '#4CAF50',    // Green - 8+ glasses
  happy: '#8BC34A',       // Light green - 6-7 glasses  
  okay: '#FFC107',        // Yellow - 4-5 glasses
  concerned: '#FF9800',   // Orange - 2-3 glasses
  dehydrated: '#F44336',  // Red - 0-1 glasses
};
```

## 📱 Responsive Design

### Screen Adaptations
- Font sizes scale with screen width
- Minimum scale: 0.8x (small phones)
- Maximum scale: 1.2x (large tablets)
- Consistent spacing across devices

### Touch Targets
- Minimum 44px touch targets
- Generous button padding
- Accessible tap areas

## 🎯 Usage Rules

### DO
- ✅ Use Comfortaa for headings and emotional content
- ✅ Use Inter for body text and UI elements
- ✅ Maintain color consistency across features
- ✅ Follow the typography scale exactly
- ✅ Use primary color for water-related actions
- ✅ Provide sufficient color contrast

### DON'T
- ❌ Mix fonts within the same text block
- ❌ Use colors outside the defined palette
- ❌ Skip typography hierarchy levels
- ❌ Use text smaller than 12sp
- ❌ Compromise accessibility for aesthetics

## 🚀 Future Enhancements

### Phase 2 Components
- Input fields with design system styling
- Modal dialogs
- Navigation components
- Loading states
- Empty states

### Phase 3 Features
- Dark mode color variants
- Animation constants
- Icon library integration
- Advanced layout components

## 📏 Design Tokens

### Spacing Scale
```typescript
const spacing = {
  xs: 4px,    // Tight spacing
  sm: 8px,    // Small spacing
  md: 16px,   // Medium spacing (base)
  lg: 24px,   // Large spacing
  xl: 32px,   // Extra large spacing
  xxl: 48px,  // XXL spacing
  xxxl: 64px, // XXXL spacing
};
```

### Border Radius
```typescript
const borderRadius = {
  sm: 8px,    // Small radius
  md: 12px,   // Medium radius (buttons)
  lg: 16px,   // Large radius (cards)
  xl: 20px,   // Extra large radius
  circle: 999px, // Circular elements
};
```

### Shadows
```typescript
const shadows = {
  light: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  // ... more shadow variants
};
```

## 🎨 Brand Guidelines

### Visual Identity
- **Personality**: Calm, refreshing, encouraging
- **Tone**: Friendly, supportive, motivational
- **Feel**: Clean, modern, accessible

### Color Psychology
- **Blue tones**: Trust, calm, hydration
- **Pink accents**: Warmth, positivity, achievement
- **Green states**: Health, growth, success

This design system ensures consistency, accessibility, and a delightful user experience while maintaining the refreshing, water-inspired theme of Hydra Sprite! 🌊
