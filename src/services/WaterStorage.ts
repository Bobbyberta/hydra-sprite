import AsyncStorage from '@react-native-async-storage/async-storage';
import {format, parseISO, isToday, startOfDay} from 'date-fns';

interface WaterIntakeEntry {
  date: string;
  amount: number;
  timestamp: number;
}

interface DailyWaterData {
  date: string;
  totalGlasses: number;
  entries: WaterIntakeEntry[];
}

export class WaterStorage {
  private static readonly WATER_DATA_KEY = 'hydra_sprite_water_data';
  private static readonly DAILY_GOAL_KEY = 'hydra_sprite_daily_goal';

  static async getTodaysWaterIntake(): Promise<number> {
    try {
      const today = format(new Date(), 'yyyy-MM-dd');
      const dailyData = await this.getDailyData(today);
      return dailyData ? dailyData.totalGlasses : 0;
    } catch (error) {
      console.error('Error getting today\'s water intake:', error);
      return 0;
    }
  }

  static async getWaterIntakeForDate(date: Date): Promise<number> {
    try {
      const dateStr = format(date, 'yyyy-MM-dd');
      const dailyData = await this.getDailyData(dateStr);
      return dailyData ? dailyData.totalGlasses : 0;
    } catch (error) {
      console.error('Error getting water intake for date:', error);
      return 0;
    }
  }

  static async logWaterIntake(glasses: number): Promise<void> {
    try {
      const today = format(new Date(), 'yyyy-MM-dd');
      const timestamp = Date.now();
      
      let dailyData = await this.getDailyData(today);
      
      if (!dailyData) {
        dailyData = {
          date: today,
          totalGlasses: 0,
          entries: [],
        };
      }

      const newEntry: WaterIntakeEntry = {
        date: today,
        amount: glasses,
        timestamp,
      };

      dailyData.entries.push(newEntry);
      dailyData.totalGlasses += glasses;

      await this.saveDailyData(dailyData);
    } catch (error) {
      console.error('Error logging water intake:', error);
      throw error;
    }
  }

  static async getDailyGoal(): Promise<number> {
    try {
      const goal = await AsyncStorage.getItem(this.DAILY_GOAL_KEY);
      return goal ? parseInt(goal, 10) : 8; // Default to 8 glasses
    } catch (error) {
      console.error('Error getting daily goal:', error);
      return 8;
    }
  }

  static async setDailyGoal(glasses: number): Promise<void> {
    try {
      await AsyncStorage.setItem(this.DAILY_GOAL_KEY, glasses.toString());
    } catch (error) {
      console.error('Error setting daily goal:', error);
      throw error;
    }
  }

  static async getWeeklyData(): Promise<DailyWaterData[]> {
    try {
      const data = await AsyncStorage.getItem(this.WATER_DATA_KEY);
      if (!data) return [];

      const allData: DailyWaterData[] = JSON.parse(data);
      
      // Get last 7 days
      const today = new Date();
      const weeklyData: DailyWaterData[] = [];
      
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dateStr = format(date, 'yyyy-MM-dd');
        
        const dayData = allData.find(d => d.date === dateStr);
        weeklyData.push(dayData || {
          date: dateStr,
          totalGlasses: 0,
          entries: [],
        });
      }
      
      return weeklyData;
    } catch (error) {
      console.error('Error getting weekly data:', error);
      return [];
    }
  }

  static async exportData(): Promise<string> {
    try {
      const data = await AsyncStorage.getItem(this.WATER_DATA_KEY);
      return data || '[]';
    } catch (error) {
      console.error('Error exporting data:', error);
      throw error;
    }
  }

  static async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.WATER_DATA_KEY);
      await AsyncStorage.removeItem(this.DAILY_GOAL_KEY);
    } catch (error) {
      console.error('Error clearing data:', error);
      throw error;
    }
  }

  private static async getDailyData(date: string): Promise<DailyWaterData | null> {
    try {
      const data = await AsyncStorage.getItem(this.WATER_DATA_KEY);
      if (!data) return null;

      const allData: DailyWaterData[] = JSON.parse(data);
      return allData.find(d => d.date === date) || null;
    } catch (error) {
      console.error('Error getting daily data:', error);
      return null;
    }
  }

  private static async saveDailyData(dailyData: DailyWaterData): Promise<void> {
    try {
      const data = await AsyncStorage.getItem(this.WATER_DATA_KEY);
      let allData: DailyWaterData[] = data ? JSON.parse(data) : [];

      const existingIndex = allData.findIndex(d => d.date === dailyData.date);
      if (existingIndex >= 0) {
        allData[existingIndex] = dailyData;
      } else {
        allData.push(dailyData);
      }

      // Keep only last 90 days to prevent storage bloat
      allData = allData.slice(-90);

      await AsyncStorage.setItem(this.WATER_DATA_KEY, JSON.stringify(allData));
    } catch (error) {
      console.error('Error saving daily data:', error);
      throw error;
    }
  }
} 