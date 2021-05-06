import React from 'react';
import {StyleSheet, View} from 'react-native';
import TinderCards from '../components/TinderCards';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <TinderCards />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2E8F0',
  },
});

export default HomeScreen;
