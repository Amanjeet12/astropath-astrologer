/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SIZES} from '../constant/theme';
import {useNavigation} from '@react-navigation/native';
import images from '../constant/images';

const KundliSecion = () => {
  const navigation = useNavigation();
  const handleSingleForm = async () => {
    navigation.navigate('SingleKundaliForm');
  };

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.boxContainer}
        onPress={() => handleSingleForm()}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={images.singleIcon} style={styles.images} />
        </View>
        <Text style={styles.text1}> Kundli</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.boxContainer}
        onPress={() => navigation.navigate('MarraigeScreenForm')}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={images.loveIcon} style={styles.images} />
        </View>
        <Text style={styles.text1}>Match</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.boxContainer}
        onPress={() => navigation.navigate('NumerologyFormScreen')}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={images.nuro} style={styles.images} />
        </View>
        <Text style={styles.text1}>Nuro</Text>
      </TouchableOpacity>
    </View>
  );
};

export default KundliSecion;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: SIZES.width * 0.031,
  },
  boxContainer: {
    width: '30%',
    gap: SIZES.width * 0.026,
    height: SIZES.width * 0.21,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fae1d0',
    alignItems: 'center',
  },
  images: {
    width: 38,
    height: 38,
    resizeMode: 'contain',
  },

  text1: {
    fontSize: SIZES.width * 0.03,
    color: '#000',
    fontFamily: 'KantumruyPro-Regular',
  },
});
