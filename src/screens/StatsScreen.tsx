import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import {WaterStorage} from '../services/WaterStorage';
import {format, subDays, startOfWeek, endOfWeek} from 'date-fns';

const {width} = Dimensions.get('window');

interface DayData {
  date: string;
  glasses: number;
  percentage: number;
}

const StatsScreen: React.FC = () => {
  const [weeklyData, setWeeklyData] = useState<DayData[]>([]);
  const [weeklyAverage, setWeeklyAverage] = useState(0);
  const [totalThisWeek, setTotalThisWeek] = useState(0);

  useEffect(() => {
    loadWeeklyStats();
  }, []);

  const loadWeeklyStats = async () => {
    try {
      const today = new Date();
      const weekStart = startOfWeek(today);
      const data: DayData[] = [];
      let total = 0;

      for (let i = 0; i < 7; i++) {
        const date = new Date(weekStart);
        date.setDate(weekStart.getDate() + i);
        
        const glasses = await WaterStorage.getWaterIntakeForDate(date);
        const percentage = Math.min((glasses / 8) * 100, 100);
        
        data.push({
          date: format(date, 'EEE'),
          glasses,
          percentage,
        });
        
        total += glasses;
      }

      setWeeklyData(data);
      setTotalThisWeek(total);
      setWeeklyAverage(Math.round((total / 7) * 10) / 10);
    } catch (error) {
      console.error('Error loading weekly stats:', error);
    }
  };

  const getBarHeight = (percentage: number) => {
    const maxHeight = 120;
    return Math.max((percentage / 100) * maxHeight, 5);
  };

  const getBarColor = (percentage: number) => {
    if (percentage >= 100) return '#4CAF50';
    if (percentage >= 75) return '#8BC34A';
    if (percentage >= 50) return '#FFC107';
    if (percentage >= 25) return '#FF9800';
    return '#F44336';
  };

  const getBestDay = () => {
    const maxGlasses = Math.max(...weeklyData.map(d => d.glasses));
    const bestDay = weeklyData.find(d => d.glasses === maxGlasses);
    return bestDay ? `${bestDay.date} (${bestDay.glasses} glasses)` : 'No data';
  };

  const getStreakDays = () => {
    let streak = 0;
    for (let i = weeklyData.length - 1; i >= 0; i--) {
      if (weeklyData[i].glasses >= 8) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  return (
    <ScrollView style={styles.container}>
      {/* Weekly Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.sectionTitle}>This Week's Progress</Text>
        <View style={styles.chartWrapper}>
          <View style={styles.chart}>
            {weeklyData.map((day, index) => (
              <View key={index} style={styles.barContainer}>
                <Text style={styles.barValue}>
                  {day.glasses > 0 ? day.glasses : ''}
                </Text>
                <View
                  style={[
                    styles.bar,
                    {
                      height: getBarHeight(day.percentage),
                      backgroundColor: getBarColor(day.percentage),
                    },
                  ]}
                />
                <Text style={styles.barLabel}>{day.date}</Text>
              </View>
            ))}
          </View>
          <View style={styles.goalLine} />
          <Text style={styles.goalText}>Goal: 8 glasses</Text>
        </View>
      </View>

      {/* Stats Summary */}
      <View style={styles.summaryContainer}>
        <Text style={styles.sectionTitle}>Weekly Summary</Text>
        
        <View style={styles.statRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{totalThisWeek}</Text>
            <Text style={styles.statLabel}>Total Glasses</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{weeklyAverage}</Text>
            <Text style={styles.statLabel}>Daily Average</Text>
          </View>
        </View>

        <View style={styles.statRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{getStreakDays()}</Text>
            <Text style={styles.statLabel}>Goal Streak</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {Math.round((weeklyAverage / 8) * 100)}%
            </Text>
            <Text style={styles.statLabel}>Goal Achievement</Text>
          </View>
        </View>
      </View>

      {/* Achievements */}
      <View style={styles.achievementsContainer}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        
        <View style={styles.achievementItem}>
          <Text style={styles.achievementEmoji}>🏆</Text>
          <View style={styles.achievementText}>
            <Text style={styles.achievementTitle}>Best Day This Week</Text>
            <Text style={styles.achievementDesc}>{getBestDay()}</Text>
          </View>
        </View>

        <View style={styles.achievementItem}>
          <Text style={styles.achievementEmoji}>🔥</Text>
          <View style={styles.achievementText}>
            <Text style={styles.achievementTitle}>Current Streak</Text>
            <Text style={styles.achievementDesc}>
              {getStreakDays()} day{getStreakDays() !== 1 ? 's' : ''} of reaching your goal
            </Text>
          </View>
        </View>

        <View style={styles.achievementItem}>
          <Text style={styles.achievementEmoji}>💧</Text>
          <View style={styles.achievementText}>
            <Text style={styles.achievementTitle}>Weekly Total</Text>
            <Text style={styles.achievementDesc}>
              {totalThisWeek} glasses ({Math.round(totalThisWeek * 0.25 * 10) / 10}L)
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
  },
  chartContainer: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 15,
    textAlign: 'center',
  },
  chartWrapper: {
    position: 'relative',
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 160,
    paddingHorizontal: 10,
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
  },
  barValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    minHeight: 16,
  },
  bar: {
    width: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  barLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  goalLine: {
    position: 'absolute',
    top: 40,
    left: 10,
    right: 10,
    height: 1,
    backgroundColor: '#FF5722',
    opacity: 0.7,
  },
  goalText: {
    position: 'absolute',
    top: 25,
    right: 10,
    fontSize: 10,
    color: '#FF5722',
    fontWeight: 'bold',
  },
  summaryContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  achievementsContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  achievementEmoji: {
    fontSize: 24,
    marginRight: 15,
  },
  achievementText: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  achievementDesc: {
    fontSize: 14,
    color: '#666',
  },
});

export default StatsScreen; 