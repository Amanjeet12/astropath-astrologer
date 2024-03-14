/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import images from '../constant/images';
import {COLORS} from '../constant/theme';
import Icon from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';

const UserIdSection = () => {
  const [show, setShow] = useState(true);
  const navigation = useNavigation();
  return (
    <View>
      <Text style={styles.title}>HI, Amanjeet(ID - 2321)</Text>
      {show && (
        <>
          <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate('NoticeBoardScreen')}>
            <Image
              source={images.dangericon}
              style={{width: 45, height: 45, resizeMode: 'contain'}}
            />
            <Text
              style={{
                fontSize: 12,
                color: '#000',
                marginLeft: 5,
                width: '78%',
              }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. and typesetting industry.{' '}
              <Text style={{color: COLORS.borderColor, fontWeight: '700'}}>
                Know More{' '}
              </Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => setShow(!show)}>
            <Icon name={'cross'} size={20} color={'#000'} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default UserIdSection;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: '#000',
    fontWeight: '700',
  },
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    padding: 5,
    borderColor: COLORS.borderColor,
    backgroundColor: '#FFE9C9',
    marginTop: 10,
    borderRadius: 10,
    paddingVertical: 10,
  },
  buttonContainer: {
    position: 'absolute',
    right: 10,
    top: 40,
    width: 20,
    height: 20,
    borderRadius: 50,
  },
});
