/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
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
import HeaderSection from '../../../components/HeaderSection';
import {COLORS, SIZES} from '../../../constant/theme';
import images from '../../../constant/images';
import BackButton from '../../../components/BackButton';
import DetaillSection from '../../../components/DetaillSection';

const CallScreen = () => {
  const data = [
    {
      id: 1,
      title: 'Today',
      hours: '2Hours 25mins',
    },
    {
      id: 2,
      title: 'This Week',
      hours: '2Hours 25mins',
    },
    {
      id: 3,
      title: 'This Month',
      hours: '2Hours 25mins',
    },
  ];

  const data2 = [
    {
      id: 1,
      title: 'Total Request Accepted',
      point: 24,
    },
    {
      id: 2,
      title: 'Total Request Missed',
      point: 12,
    },
    {
      id: 3,
      title: 'Call Price',
      point: '₹ 75',
    },
  ];
  const renderItem = ({item, index}) => {
    return (
      <>
        <View style={{flexDirection: 'row', gap: 20, marginTop: 10}}>
          <Text style={{fontSize: 14, color: '#000'}}>{item.title}</Text>
          {item.hours && (
            <Text style={{fontSize: 14, color: COLORS.borderColor}}>
              -{item.hours}
            </Text>
          )}
          <Text style={{fontSize: 14, color: COLORS.borderColor}}>
            {item.point}
          </Text>
        </View>
      </>
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
              <BackButton placeholder={'Call'} />
            </View>
            <View style={styles.boxContainer}>
              <View style={styles.flexBox}>
                <Text style={styles.title}>Call Stats</Text>
                <Image
                  source={images.stat}
                  style={{width: 50, height: 30, resizeMode: 'contain'}}
                />
              </View>
              <View style={styles.border} />
              <View style={{marginTop: SIZES.width * 0.051}}>
                <Text style={[styles.title, {fontSize: 16}]}>
                  Total call time
                </Text>
                <View style={[styles.flexBox, {marginTop: 10}]}>
                  <Image
                    source={images.status}
                    style={{width: 10, height: 75, resizeMode: 'stretch'}}
                  />
                  <FlatList
                    data={data}
                    scrollEnabled={false}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                  />
                </View>
              </View>
              <View style={{marginTop: 5}}>
                <FlatList
                  data={data2}
                  scrollEnabled={false}
                  renderItem={renderItem}
                  keyExtractor={item => item.id.toString()}
                />
              </View>
              <View style={{alignItems: 'flex-end'}}>
                <TouchableOpacity style={styles.button}>
                  <Text style={{fontSize: 16, color: '#fff'}}>
                    Request Price Change
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginTop: 20}}>
              <Text style={styles.title}>Call History</Text>
              <DetaillSection />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default CallScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    marginHorizontal: SIZES.width * 0.051,
  },
  boxContainer: {
    width: '100%',
    height: 390,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    marginTop: 20,
    borderRadius: 10,
    padding: 16,
    backgroundColor: '#fff',
  },
  flexBox: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
  },
  title: {fontSize: 20, color: '#000', fontWeight: '600'},
  border: {
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    height: 1,
    width: '100%',
    marginTop: SIZES.width * 0.051,
  },
  button: {
    width: 250,
    height: 45,
    backgroundColor: COLORS.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
});
