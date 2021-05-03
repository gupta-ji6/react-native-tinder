import React from 'react';
import {
  Button,
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

const data = [
  {
    id: 1,
    icon: '🔥',
  },
  {
    id: 2,
    icon: '✨',
  },
  {
    id: 3,
    icon: '💌',
  },
  {
    id: 4,
    icon: '🧑🏻',
  },
];

const Footer = () => {
  return (
    <View style={styles.container}>
      {data.map((item, index) => {
        return (
          <Pressable
            key={item.id}
            style={styles.btnContainer}
            android_ripple={{color: '#f4f4f4'}}>
            <Text>{item.icon}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 0.1 * windowHeight,
    width: windowWidth,
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 10,
    borderTopColor: 'rgba(0,0,0,0.1)',
    borderTopWidth: 1,
    ...Platform.select({
      android: {
        elevation: 5,
      },
    }),
  },
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'green',
    flex: 0.2,
    height: '100%',
    fontSize: 24,
  },
});

export default Footer;
