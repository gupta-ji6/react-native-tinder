/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TinderCards from './src/components/TinderCards';

const Tab = createBottomTabNavigator();

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}

function HomeScreen() {
  return (
    <View style={styles.container}>
      <TinderCards />
    </View>
  );
}

function ChatScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Chat!</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Profile!</Text>
    </View>
  );
}

function App() {
  return (
    <NavigationContainer>
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
          name="Settings"
          component={SettingsScreen}
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
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2E8F0',
  },
});

export default App;
