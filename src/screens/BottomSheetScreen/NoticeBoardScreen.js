/* eslint-disable react-native/no-inline-styles */
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import BackButton from '../../components/BackButton';
import HeaderSection from '../../components/HeaderSection';
import {SIZES} from '../../constant/theme';
import images from '../../constant/images';

const NoticeBoardScreen = () => {
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
              <BackButton placeholder={'Notice Board'} />
            </View>
            <View style={{paddingLeft: 35, paddingTop: 15}}>
              <Text style={{color: 'grey', fontSize: 14}}>
                Released on 06/02/2024
              </Text>
            </View>
            <View
              style={{
                marginTop: 20,
                paddingHorizontal: 20,
                borderWidth: 1,
                paddingVertical: 30,
                marginBottom: 50,
                backgroundColor: '#FFF1CC',
                borderStyle: 'dashed',
                borderRadius: 10,
              }}>
              <Text style={{textAlign: 'center', color: '#000', fontSize: 16}}>
                {' '}
                Notice Title
              </Text>
              <Text style={{marginTop: 20}}>
                Lorem ipsum dolor sit amet consectetur. Massa cras in dictum
                tempus scelerisque elit. Lectus lectus morbi aliquam nam
                faucibus vulputate. Tristique dictumst nunc felis bibendum nunc
                facilisis in ullamcorper vivamus. Sed venenatis sapien mattis
                vulputate tempor. Scelerisque. Lorem ipsum dolor sit amet
                consectetur. Massa cras in dictum tempus scelerisque elit.
                Lectus lectus morbi aliquam nam faucibus vulputate. Tristique
                dictumst nunc felis bibendum nunc facilisis in ullamcorper
                vivamus. Sed venenatis sapien mattis vulputate tempor.
                Scelerisque. Lorem ipsum dolor sit amet consectetur. Massa cras
                in dictum tempus scelerisque elit. Lectus lectus morbi aliquam
                nam faucibus vulputate. Tristique dictumst nunc felis bibendum
                nunc facilisis in ullamcorper vivamus. Sed venenatis sapien
                mattis vulputate tempor. Scelerisque. Lorem ipsum dolor sit amet
                consectetur. Massa cras in dictum tempus scelerisque elit.
                Lectus lectus morbi aliquam nam faucibus vulputate. Tristique
                dictumst nunc felis bibendum nunc facilisis in ullamcorper
                vivamus. Sed venenatis sapien mattis vulputate tempor.
                Scelerisque. Lorem ipsum dolor sit amet consectetur. Massa cras
                in dictum tempus scelerisque elit. Lectus lectus morbi aliquam
                nam faucibus vulputate. Tristique dictumst nunc felis bibendum
                nunc facilisis in ullamcorper vivamus. Sed venenatis sapien
                mattis vulputate tempor. Scelerisque. Lorem ipsum dolor sit amet
                consectetur. Massa cras in dictum tempus scelerisque elit.
                Lectus lectus morbi aliquam nam faucibus vulputate. Tristique
                dictumst nunc felis bibendum nunc facilisis in ullamcorper
                vivamus. Sed venenatis sapien mattis vulputate tempor.
                Scelerisque.
              </Text>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default NoticeBoardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    marginHorizontal: SIZES.width * 0.051,
  },
});
