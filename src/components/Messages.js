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

const Separator = () => {
  return <View style={styles.separator} />;
};

const Messages = () => {
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
          source={{uri: `https://i.pravatar.cc/300?u=${item.username}`}}
          style={styles.picture}
        />
        <View style={styles.messageInfoContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.message}>{item.company.catchPhrase}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderFlatListItem}
        ItemSeparatorComponent={Separator}
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
    marginTop: 10,
    marginBottom: windowHeight / 8,
  },
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // alignItems: 'center',
    paddingVertical: 10,
    paddingRight: 10,
  },
  picture: {
    width: windowWidth / 5,
    height: windowWidth / 5,
    borderRadius: 50,
    // marginBottom: 10,
  },
  messageInfoContainer: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: 'space-around',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  message: {
    color: 'lightgrey',
  },
  separator: {
    height: 0.5,
    backgroundColor: 'darkgrey',
    marginLeft: windowWidth / 4.5,
  },
});

export default Messages;
