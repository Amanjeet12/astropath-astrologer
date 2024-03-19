/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SIZES} from '../constant/theme';
import {useNavigation} from '@react-navigation/native';

const CustomeIconButton = ({placeholder, screen}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.mainContainer}
      onPress={() => navigation.navigate(screen)}>
      <View style={styles.boxContainer}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.title}>{placeholder}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CustomeIconButton;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: SIZES.width * 0.13,
    borderWidth: 2,
    borderRadius: SIZES.width * 0.039,
  },
  boxContainer: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  image: {
    width: SIZES.width * 0.077,
    height: SIZES.width * 0.077,
    resizeMode: 'contain',
  },
  title: {
    fontFamily: 'KantumruyPro-Regular',
    color: '#000',
    fontSize: SIZES.width * 0.036,
    textAlign: 'center',
  },
});
