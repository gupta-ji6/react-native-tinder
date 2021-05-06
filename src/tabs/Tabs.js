import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import LikesScreen from '../screens/LikesScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#FD297B',
        inactiveTintColor: '#E2E8F0',
        showLabel: false,
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons
              name={focused ? 'flame' : 'flame-outline'}
              color={color}
              size={size}
            />
          ),
        }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons
              name={focused ? 'heart' : 'heart-outline'}
              color={color}
              size={size}
            />
          ),
        }}
        name="Likes"
        component={LikesScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons
              name={focused ? 'chatbubbles' : 'chatbubbles-outline'}
              color={color}
              size={size}
            />
          ),
        }}
        name="Chat"
        component={ChatScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              color={color}
              size={size}
            />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
