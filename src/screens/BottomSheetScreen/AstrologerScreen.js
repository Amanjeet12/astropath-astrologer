/* eslint-disable react/self-closing-comp */
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
import {COLORS, SIZES} from '../../constant/theme';
import HeaderSection from '../../components/HeaderSection';
import OrderSection from '../../components/OrderSection';
import {Order} from '../../constant/data';
import images from '../../constant/images';
const AstrologerScreen = () => {
  const data = [
    {
      id: 1,
      name: 'Tanmay Singh',
      ruppes: 149.85,
      date: '24/15/2014',
      mode: 'Video Call',
    },
    {
      id: 2,
      name: 'Tanmay Singh',
      ruppes: 149.85,
      date: '24/15/2014',
      mode: 'Video Call',
    },
    {
      id: 3,
      name: 'Tanmay Singh',
      ruppes: 149.85,
      date: '24/15/2014',
      mode: 'Video Call',
    },
  ];
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.flexBoxContainer}>
        <View style={styles.circleContainer}>
          <Text style={styles.title}>T</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '80%',
          }}>
          <View>
            <Text style={[styles.title, {fontSize: 16}]}>{item.name}</Text>
            <Text style={styles.title}>{item.date}</Text>
          </View>
          <View>
            <Text style={[styles.title, {fontWeight: '600'}]}>
              ₹ {item.ruppes}
            </Text>
            <Text style={styles.title}>{item.mode}</Text>
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
              <Text style={styles.tagLine}>Wallet Transaction</Text>
            </View>
            <View style={{width: SIZES.width - 40, height: 120, marginTop: 20}}>
              <Image
                source={images.walletbanner}
                style={{width: '100%', height: '100%', resizeMode: 'stretch'}}
              />
              <View style={{position: 'absolute', top: 20, left: 50}}>
                <Text style={{fontSize: 20, color: '#000'}}>
                  Current Balance
                </Text>
                <Text style={{fontSize: 20, color: '#000', fontWeight: '600'}}>
                  ₹ 400
                </Text>
              </View>
            </View>
            <View style={[styles.flexBox, {marginTop: 20}]}>
              <TouchableOpacity style={styles.button}>
                <Text style={{color: '#fff'}}>Withdraw Fund</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={{color: '#fff'}}>Download Report</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.flexBox, {marginTop: 20}]}>
              <Text style={{fontSize: 16, color: '#000'}}>Transactions</Text>
              <Text style={{fontSize: 16, color: COLORS.borderColor}}>
                See All
              </Text>
            </View>
            <View style={styles.border} />
            <View>
              <FlatList
                data={data}
                scrollEnabled={false}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
              />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default AstrologerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    marginHorizontal: SIZES.width * 0.051,
  },
  tagLine: {
    fontSize: SIZES.width * 0.051,
    fontFamily: 'DMSerifDisplay-Regular',
    color: COLORS.black,
    textTransform: 'capitalize',
  },
  button: {
    backgroundColor: COLORS.borderColor,
    width: '45%',
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  border: {
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    marginTop: 10,
  },
  title: {
    fontSize: 14,
    color: '#000',
  },
  circleContainer: {
    width: 40,
    height: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5B300',
  },
  flexBoxContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginTop: 20,
  },
});
