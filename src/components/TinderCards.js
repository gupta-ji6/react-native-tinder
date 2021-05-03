import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  PanResponder,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import clamp from 'clamp';

// decide a threshold after which card will be swiped
const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');
const SWIPE_THRESHOLD = 0.25 * screenWidth;

// import images of cute animals
import Bobo from '../../assets/dog-1.jpg';
import Dolly from '../../assets/dog-2.jpg';
import Giraffe from '../../assets/dog-3.jpg';
import Goat from '../../assets/dog-4.jpg';

const handleLeftDecay = () => {
  console.log('swiped left');
};

const handleRightDecay = () => {
  console.log('swiped right');
};

const TinderCards = () => {
  // initialize deck to render
  const [data, setData] = useState([
    {
      image: Bobo,
      id: 1,
      name: 'Bobo',
      age: '18',
      interests: ['Travel', 'Photography', 'Movies', 'StandUp Comendy', 'Dogs'],
      bio: 'Not here for hookups',
    },
    {
      image: Dolly,
      id: 2,
      name: 'Dolly',
      age: '18',
      interests: ['Travel', 'Photography', 'Movies', 'StandUp Comendy', 'Dogs'],
      bio: 'Not here for hookups',
    },
    {
      image: Giraffe,
      id: 3,
      name: 'Milo',
      age: '18',
      interests: ['Travel', 'Photography', 'Movies', 'StandUp Comendy', 'Dogs'],
      bio: 'Not here for hookups',
    },
    {
      image: Goat,
      id: 4,
      name: 'Ollie',
      age: '18',
      interests: ['Travel', 'Photography', 'Movies', 'StandUp Comendy', 'Dogs'],
      bio: 'Not here for hookups',
    },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    scale.setValue(0.9);
    opacity.setValue(1);
    animation.setValue({x: 0, y: 0});
    position.setValue({x: 0, y: 0});
  }, [animation, data, opacity, scale, position]);

  // initialize animation values for position and opacity of top card
  // and scale of next cards
  const animation = useRef(new Animated.ValueXY()).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(0.9)).current;
  const position = useRef(new Animated.ValueXY()).current;

  const rotate = position.x.interpolate({
    inputRange: [-screenWidth / 2, 0, screenWidth / 2],
    outputRange: ['-30deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });

  const rotateAndTranslate = {
    transform: [
      {
        rotate: rotate,
      },
      ...position.getTranslateTransform(),
    ],
  };

  const likeOpacity = position.x.interpolate({
    inputRange: [-screenWidth / 4, 0, screenWidth / 4],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });

  const nopeOpacity = position.x.interpolate({
    inputRange: [-screenWidth / 4, 0, screenWidth / 4],
    outputRange: [1, 0, 0],
    extrapolate: 'clamp',
  });

  const transitionNext = function () {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // setCurrentIndex(currentIndex)
      setData(oldData => {
        return oldData.slice(1);
      });
    });
  };

  const _panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        animation.setValue({x: gesture.dx, y: gesture.dy});
        position.setValue({x: gesture.dx, y: gesture.dy});
      },
      onPanResponderRelease: (e, {dx, dy, vx, vy}) => {
        // console.log(currentIndex);
        let velocity;
        if (vx >= 0) {
          velocity = clamp(vx, 4, 5);
        } else if (vx < 0) {
          velocity = clamp(Math.abs(vx), 4, 5) * -1;
        }
        if (Math.abs(dx) > SWIPE_THRESHOLD) {
          Animated.parallel([
            Animated.decay(animation, {
              velocity: {x: velocity, y: vy},
              deceleration: 0.99,
              useNativeDriver: true,
            }),
            Animated.spring(scale, {
              toValue: 1,
              friction: 4,
              useNativeDriver: true,
            }),
          ]).start(transitionNext);
          if (velocity > 0) {
            handleRightDecay();
          } else {
            handleLeftDecay();
          }
          setCurrentIndex(oldIndex => oldIndex + 1);
        } else {
          Animated.spring(animation, {
            toValue: {x: 0, y: 0},
            friction: 4,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      {data
        .slice(0, 2)
        .reverse()
        .map((item, index, items) => {
          console.log(index);
          // check if it's top card
          const isLastItem = index === items.length - 1;
          // apply panHandlers if it's top card
          const panHandlers = isLastItem ? {..._panResponder.panHandlers} : {};
          // check if it's next card
          const isSecondToLast = index === items.length - 2;
          // rotate from -30 degree to +30 degree for swipe distance of -200 to +200
          const rotateCard = animation.x.interpolate({
            inputRange: [-200, 0, 200],
            outputRange: ['-30deg', '0deg', '30deg'],
            extrapolate: 'clamp', // make sure the rotation doesn't go beyong 30 degrees.
          });

          // prepare card styles
          const animatedCardStyles = {
            transform: [
              {rotate: rotateCard},
              ...animation.getTranslateTransform(),
              // ...position.getTranslateTransform(),
            ],
            opacity,
          };
          const cardStyle = isLastItem ? animatedCardStyles : undefined;
          const nextStyle = isSecondToLast
            ? {transform: [{scale}], borderRadius: 5}
            : undefined;

          return (
            <Animated.View
              {...panHandlers}
              style={[styles.card, rotateAndTranslate, cardStyle, nextStyle]} // apply styles
              key={item.id}>
              {index === 1 && (
                <>
                  <Animated.View
                    style={[styles.likeContainer, {opacity: likeOpacity}]}>
                    <LinearGradient
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      colors={['#78CDA2', '#3AD27C']}
                      style={{borderRadius: 5}}>
                      <Text style={[styles.likeText]}>LIKE</Text>
                    </LinearGradient>
                  </Animated.View>
                  <Animated.View
                    style={[styles.nopeContainer, {opacity: nopeOpacity}]}>
                    <LinearGradient
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      colors={['#F4506D', '#EA5675']}
                      style={{borderRadius: 5}}>
                      <Text style={[styles.nopeText]}>NOPE</Text>
                    </LinearGradient>
                  </Animated.View>
                </>
              )}

              <View style={styles.imageContainer}>
                <Image
                  resizeMode="cover"
                  source={item.image}
                  style={styles.image}
                />
              </View>

              <LinearGradient
                colors={['#00000000', '#1A202C']}
                style={styles.textContainer}>
                <View style={styles.nameContainer}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.age}>{item.age}</Text>
                </View>
                <View style={styles.interestContainer}>
                  {item.interests.map((interest, index) => (
                    <LinearGradient
                      key={index}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      colors={['#FD297B', '#FF5864']}
                      style={styles.interest}>
                      <Text key={index} style={styles.interestName}>
                        {interest}
                      </Text>
                    </LinearGradient>
                  ))}
                </View>
                <Text style={styles.bio}>{item.bio}</Text>
              </LinearGradient>
            </Animated.View>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  // add container styles and place the cards to center
  container: {
    flex: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#E2E8F0',
  },
  card: {
    width: screenWidth - 10,
    height: 0.86 * screenHeight,
    backgroundColor: '#f4f4f4',
    position: 'absolute',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    ...Platform.select({
      android: {
        elevation: 5,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,
      },
      web: {
        boxShadow: '0 3px 5px rgba(0,0,0,0.10), 1px 2px 5px rgba(0,0,0,0.10)',
      },
    }),
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  likeNopeContainer: {
    height: screenHeight - 120,
    width: screenWidth,
    padding: 10,
    position: 'absolute',
  },
  likeContainer: {
    transform: [{rotate: '-30deg'}],
    position: 'absolute',
    top: 50,
    left: 40,
    zIndex: 1000,
  },
  nopeContainer: {
    transform: [{rotate: '30deg'}],
    position: 'absolute',
    top: 50,
    right: 40,
    zIndex: 1000,
  },
  likeText: {
    color: '#F7FAFC',
    fontSize: 32,
    fontWeight: '800',
    padding: 10,
  },
  nopeText: {
    borderRadius: 5,
    color: '#F7FAFC',
    fontSize: 32,
    fontWeight: '800',
    padding: 10,
  },
  textContainer: {
    maxHeight: 0.4 * screenHeight,
    paddingTop: 0.15 * screenHeight,
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'flex-start',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'flex-start',
    paddingBottom: 4,
  },
  name: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    textAlignVertical: 'bottom',
  },
  age: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  interestContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 4,
  },
  interest: {
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 10,
    marginBottom: 10,
  },
  interestName: {
    color: '#F7FAFC',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bio: {
    fontSize: 16,
    color: '#f4f4f4',
    paddingTop: 5,
  },
});

export default TinderCards;
