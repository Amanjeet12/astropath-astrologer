/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Astropath_logo} from '../screens/SvgComponent/BottomSvgComponent';
import {images} from '../constant';
import {SIZES} from '../constant/theme';
import Icon from 'react-native-vector-icons/Octicons';

const HeaderSection = () => {
  return (
    <View style={styles.mainContainer}>
      <View>
        <Astropath_logo />
      </View>
      <TouchableOpacity style={styles.walletContainer}>
        <Icon name={'bell-fill'} size={SIZES.horizontal} color={'#000'} />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderSection;

const styles = StyleSheet.create({
  mainContainer: {
    height: SIZES.width * 0.153,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
