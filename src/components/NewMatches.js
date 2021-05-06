import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

const NewMatches = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let unsubscribe = false;

    const fetchNewMatches = async () => {
      setLoading(true);
      try {
        const newMatches = await fetch(
          'https://jsonplaceholder.typicode.com/users',
        );
        const newMatchesJson = await newMatches.json();
        setData(newMatchesJson);
        setLoading(false);
        setError(null);
      } catch (e) {
        setLoading(false);
        setError(e);
      }
    };

    if (!unsubscribe) {
      fetchNewMatches();
    }

    return () => {
      unsubscribe = true;
    };
  }, []);

  if (loading) {
    return (
      <View style={[styles.loaderContainer, styles.horizontal]}>
        <ActivityIndicator size="large" color="#FD297B" />
      </View>
    );
  }

  if (error !== null) {
    return (
      <View style={[styles.loaderContainer, styles.horizontal]}>
        <Text>{error}</Text>
      </View>
    );
  }

  const renderFlatListItem = ({item}) => {
    return (
      <View style={styles.listItemContainer}>
        <Image
          source={{uri: `https://i.pravatar.cc/300?u=${item.name}`}}
          style={styles.picture}
        />
        <Text>{item.username}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        horizontal
        keyExtractor={item => item.id}
        renderItem={renderFlatListItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  container: {
    paddingVertical: 10,
  },
  listItemContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 20,
    paddingRight: 10,
  },
  picture: {
    width: windowWidth / 5,
    height: windowWidth / 5,
    borderRadius: 50,
    marginBottom: 10,
  },
});

export default NewMatches;
