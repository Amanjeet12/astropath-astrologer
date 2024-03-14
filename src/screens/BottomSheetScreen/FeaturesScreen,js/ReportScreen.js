/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import BackButton from '../../../components/BackButton';
import HeaderSection from '../../../components/HeaderSection';
import {COLORS, SIZES} from '../../../constant/theme';
import images from '../../../constant/images';
import {reportChat} from '../../../constant/data';
import * as Progress from 'react-native-progress';

const ReportScreen = () => {
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.boxContainer}>
        <Text style={[styles.title, {fontSize: 18}]}>{item.title}</Text>
        <View style={{marginTop: 10}}>
          <Text style={styles.title}>Your Score</Text>
          <View style={styles.scoreContainer}>
            <View>
              <Image
                source={images.point}
                style={{width: 30, height: 30, resizeMode: 'contain'}}
              />
            </View>
            <View>
              <Text style={styles.title}>
                {item.percent}{' '}
                <Text style={[styles.title, {color: '#D2D2D2', fontSize: 12}]}>
                  conversion...
                </Text>
              </Text>
              <View style={{marginTop: 5}}>
                <Progress.Bar
                  progress={0.5}
                  width={150}
                  height={8}
                  color="green"
                  unfilledColor="#D9D9D9"
                  borderColor="#fff"
                />
              </View>
            </View>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={[styles.title, {fontSize: 14}]}> {item.heading}</Text>
            <Text
              style={[
                styles.title,
                {fontSize: 12, color: 'grey', paddingTop: 5},
              ]}>
              {item.description}
            </Text>
          </View>
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
              <BackButton placeholder={'Report'} />
            </View>
            <View>
              <FlatList
                data={reportChat}
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

export default ReportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    marginHorizontal: SIZES.width * 0.051,
  },
  boxContainer: {
    height: 250,
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
  scoreContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingBottom: 15,
    borderBottomColor: '#F39200',
    borderBottomWidth: 2,
  },
});
