/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import BackButton from '../../../components/BackButton';
import HeaderSection from '../../../components/HeaderSection';
import {COLORS, SIZES} from '../../../constant/theme';
import images from '../../../constant/images';
import {reportChat, waitlist} from '../../../constant/data';
import * as Progress from 'react-native-progress';

const Waitlist = () => {
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.boxContainer}>
        <View style={[styles.flexBox, {gap: 10}]}>
          <View style={styles.headerContainer}>
            <Text style={[styles.title, {color: '#fff'}]}>A</Text>
          </View>
          <View>
            <Text style={styles.title}>{item.name}</Text>
            <Text
              style={[
                styles.title,
                {color: 'grey', fontSize: 12, paddingTop: 3},
              ]}>
              ID - {item.uid}
            </Text>
          </View>
        </View>
        <View style={[styles.flexBox, {marginTop: 10}]}>
          <View
            style={{
              width: '50%',
              borderRightWidth: 1,
              borderColor: '#F39200',
            }}>
            <Text style={styles.title2}>Service - {item.service}</Text>
            <Text style={styles.title2}>Token No - {item.token}</Text>
            <Text style={styles.title2}>Status - {item.status}</Text>
          </View>
          <View
            style={{
              width: '50%',
              marginLeft: 25,
            }}>
            <Text style={styles.title2}>Duration - {item.duration}</Text>
            <Text style={styles.title2}>Date - {item.date}</Text>
            <Text style={styles.title2}>Time - {item.time}</Text>
          </View>
        </View>
        <View style={{alignItems: 'center', marginTop: 20}}>
          <TouchableOpacity style={styles.button}>
            <Text
              style={[
                styles.title,
                {color: '#fff', textTransform: 'uppercase', fontSize: 14},
              ]}>
              start Session
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <>
      <StatusBar backgroundColor={'#f7f1e1'} barStyle={'dark-content'} />
      <ImageBackground
        source={images.mobile}
        style={{width: SIZES.width, height: SIZES.height, flex: 1}}
        imageStyle={{resizeMode: 'stretch'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.mainContainer}>
            <View style={{marginTop: SIZES.width * 0.026}}>
              <HeaderSection />
            </View>
            <View>
              <BackButton placeholder={'Waitlist'} />
            </View>
            <View>
              <FlatList
                data={waitlist}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                scrollEnabled={false}
                contentContainerStyle={{marginBottom: 50}}
              />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default Waitlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    marginHorizontal: SIZES.width * 0.051,
  },
  boxContainer: {
    height: 220,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    marginTop: 20,
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  title: {
    color: '#000',
    fontSize: 16,
  },
  title2: {
    color: '#000',
    fontSize: 14,
    paddingTop: 3,
  },
  flexBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContainer: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.borderColor,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 150,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: COLORS.borderColor,
  },
});
