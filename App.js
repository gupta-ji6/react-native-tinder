/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, View} from 'react-native';
import Footer from './src/components/Footer';
import TinderCards from './src/components/TinderCards';

function App() {
  return (
    <View style={styles.container}>
      <TinderCards />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2E8F0',
  },
});

export default App;
