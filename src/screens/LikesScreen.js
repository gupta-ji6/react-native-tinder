import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const LikesScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Chat!</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LikesScreen;
