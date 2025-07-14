export type SpriteHealth = 'thriving' | 'happy' | 'okay' | 'concerned' | 'dehydrated';

export interface SpriteState {
  health: SpriteHealth;
  mood: number; // 0-100
  hydrationLevel: number; // 0-100
  lastFed: Date;
}

export class SpriteEngine {
  private static readonly DAILY_GOAL = 8; // glasses per day

  static calculateSpriteHealth(glassesToday: number): SpriteHealth {
    const percentage = (glassesToday / this.DAILY_GOAL) * 100;

    if (percentage >= 100) return 'thriving';
    if (percentage >= 75) return 'happy';
    if (percentage >= 50) return 'okay';
    if (percentage >= 25) return 'concerned';
    return 'dehydrated';
  }

  static getSpriteEmoji(health: SpriteHealth): string {
    switch (health) {
      case 'thriving':
        return '🌟';
      case 'happy':
        return '😊';
      case 'okay':
        return '😐';
      case 'concerned':
        return '😟';
      case 'dehydrated':
        return '😵';
      default:
        return '😐';
    }
  }

  static getSpriteColor(health: SpriteHealth): string {
    switch (health) {
      case 'thriving':
        return '#4CAF50'; // Green
      case 'happy':
        return '#8BC34A'; // Light Green
      case 'okay':
        return '#FFC107'; // Yellow
      case 'concerned':
        return '#FF9800'; // Orange
      case 'dehydrated':
        return '#F44336'; // Red
      default:
        return '#9E9E9E'; // Gray
    }
  }

  static getSpriteMessage(health: SpriteHealth): string {
    switch (health) {
      case 'thriving':
        return "I'm feeling amazing! Thanks for keeping me hydrated! ✨";
      case 'happy':
        return "I'm happy and healthy! Keep up the good work! 😊";
      case 'okay':
        return "I'm doing alright, but could use more water! 💧";
      case 'concerned':
        return "I'm getting a bit thirsty... please drink more water! 😟";
      case 'dehydrated':
        return "I need water urgently! Please help me! 😵";
      default:
        return "How are you feeling today?";
    }
  }

  static getMotivationalMessage(health: SpriteHealth, glassesToday: number): string {
    const remaining = Math.max(0, this.DAILY_GOAL - glassesToday);

    if (health === 'thriving') {
      return `Amazing! You've reached your daily goal! Your sprite is thriving! 🌟`;
    }

    if (remaining === 0) {
      return `Perfect! You've hit your daily goal! Your sprite is so happy! 🎉`;
    }

    if (remaining <= 2) {
      return `Almost there! Just ${remaining} more glass${remaining === 1 ? '' : 'es'} to go! 💪`;
    }

    if (remaining <= 4) {
      return `Great progress! ${remaining} more glasses and your sprite will be thriving! 🌿`;
    }

    return `Your sprite needs your help! ${remaining} glasses to reach today's goal! 💧`;
  }

  static calculateMoodScore(glassesToday: number, streak: number): number {
    const hydrationScore = Math.min((glassesToday / this.DAILY_GOAL) * 60, 60);
    const streakBonus = Math.min(streak * 5, 40);
    return Math.min(hydrationScore + streakBonus, 100);
  }

  static shouldShowCelebration(previousHealth: SpriteHealth, currentHealth: SpriteHealth): boolean {
    const healthLevels = ['dehydrated', 'concerned', 'okay', 'happy', 'thriving'];
    const prevIndex = healthLevels.indexOf(previousHealth);
    const currentIndex = healthLevels.indexOf(currentHealth);
    
    // Show celebration when sprite improves health level
    return currentIndex > prevIndex;
  }

  static getAnimationDuration(health: SpriteHealth): number {
    // Healthier sprites have more energetic (faster) animations
    switch (health) {
      case 'thriving':
        return 800;
      case 'happy':
        return 1000;
      case 'okay':
        return 1200;
      case 'concerned':
        return 1500;
      case 'dehydrated':
        return 2000;
      default:
        return 1200;
    }
  }

  static getSpriteSize(health: SpriteHealth): number {
    // Healthier sprites are larger/more vibrant
    switch (health) {
      case 'thriving':
        return 1.2;
      case 'happy':
        return 1.1;
      case 'okay':
        return 1.0;
      case 'concerned':
        return 0.9;
      case 'dehydrated':
        return 0.8;
      default:
        return 1.0;
    }
  }
} 