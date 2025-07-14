import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StatusBar, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from './screens/HomeScreen';
import StatsScreen from './screens/StatsScreen';
import SettingsScreen from './screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        backgroundColor="#2196F3"
      />
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerStyle: {
            backgroundColor: '#2196F3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarIcon: ({focused, color, size}) => {
            let iconName: string;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Stats') {
              iconName = 'bar-chart';
            } else if (route.name === 'Settings') {
              iconName = 'settings';
            } else {
              iconName = 'help';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#2196F3',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{title: '💧 Hydra Sprite'}}
        />
        <Tab.Screen 
          name="Stats" 
          component={StatsScreen}
          options={{title: '📊 Statistics'}}
        />
        <Tab.Screen 
          name="Settings" 
          component={SettingsScreen}
          options={{title: '⚙️ Settings'}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App; 