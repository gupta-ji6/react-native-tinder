import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Messages from '../components/Messages';
import NewMatches from '../components/NewMatches';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

const Heading = ({title}) => {
  return <Text style={styles.heading}>{title}</Text>;
};

const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <Heading title="New Matches" />
      <NewMatches />
      <Heading title="Messages" />
      <Messages />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: windowHeight / 10,
  },
  heading: {
    fontSize: 18,
    color: '#FD297B',
    fontWeight: 'bold',
  },
});

export default ChatScreen;
