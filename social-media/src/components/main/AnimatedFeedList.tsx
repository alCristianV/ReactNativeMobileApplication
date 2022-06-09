import * as React from 'react';
import { Animated, Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { Surface } from 'react-native-paper';

import { FeedPost } from '../../types/FeedPost';
import { ErrorHandler } from '../error/ErrorHandler';

const { height } = Dimensions.get("screen");

export default function List({ data }: { data: FeedPost[] }) {
  React.useEffect(() => {
    console.log(data);
  }, [data]);

  const scrollY = React.useRef(new Animated.Value(0)).current;
  return (
    <ErrorHandler>
      <View style={styles.container}>
        <Animated.FlatList
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          data={data}
          renderItem={({ item, index }) => {
            //Normal Animation
            const inputRange = [
              -1,
              0,
              (height * 0.5 + 15) * index,
              (height * 0.5 + 15) * (index + 3),
            ];
            const scale = 1;
            const opacity = scrollY.interpolate({
              inputRange,
              outputRange: [1, 1, 1, 0],
            });
            const Offset = scrollY.interpolate({
              inputRange,
              outputRange: [0, 0, 0, 500],
            });

            return (
              <Animated.View
                style={{
                  transform: [{ scale: scale }, { translateX: Offset }],
                  opacity: opacity,
                }}
              >
                <Surface style={styles.surface}>
                  <View>
                    <Text style={styles.container}>{item.userInfo.name}</Text>
                    <Text style={styles.container}>{item.post.caption}</Text>
                    <Image
                      style={styles.image}
                      source={{ uri: item.post.downloadUrl }}
                    />
                  </View>
                </Surface>
              </Animated.View>
            );
          }}
        />
      </View>
    </ErrorHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  surface: {
    marginTop: 15,
    padding: 8,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  containerInfo: {
    margin: 20,
  },
  containerGallery: {
    flex: 1,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
});
