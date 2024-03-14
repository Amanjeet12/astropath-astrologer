/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import {features} from '../constant/data';
import {SIZES} from '../constant/theme';
import {useNavigation} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const itemWidth = (windowWidth - 40) / 3.2;

const FeaturesSection = () => {
  const navigation = useNavigation();

  const handleScreen = screen => {
    if (screen) {
      navigation.navigate(screen);
    }
  };

  const renderItem = ({item, index}) => {
    const marginLeft = index % 3 === 0 ? 0 : 10;
    return (
      <TouchableOpacity
        onPress={() => handleScreen(item.screen)}
        style={[styles.boxContainer, {marginLeft: marginLeft}]}>
        <Image
          source={item.image}
          style={{width: 75, height: 60, resizeMode: 'contain'}}
        />
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      scrollEnabled={false}
      data={features}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      numColumns={3}
      contentContainerStyle={{
        width: windowWidth - 40,
        height: 400,
      }}
    />
  );
};

export default FeaturesSection;

const styles = StyleSheet.create({
  boxContainer: {
    width: itemWidth,
    height: 110,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#FFCBAE',
  },
  title: {
    fontSize: 12,
    color: '#000',
    marginTop: 8,
  },
});
