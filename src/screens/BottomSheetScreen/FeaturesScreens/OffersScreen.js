/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import BackButton from '../../../components/BackButton';
import HeaderSection from '../../../components/HeaderSection';
import {COLORS, SIZES} from '../../../constant/theme';
import images from '../../../constant/images';
import {offers} from '../../../constant/data';

const OffersScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          width: '100%',
          height: 150,
          borderWidth: 1,
          borderColor: COLORS.borderColor,
          marginTop: 20,
          padding: 16,
          borderRadius: 10,
          backgroundColor: '#fff',
        }}>
        <View
          style={[
            styles.flexBox,
            {
              paddingBottom: 10,
              borderBottomColor: '#F39200',
              borderBottomWidth: 1,
            },
          ]}>
          <View>
            <Text style={styles.title}>
              Offer Name -
              <Text style={{color: 'grey', fontSize: 12}}> {item.offers}</Text>
            </Text>
            <Text style={[styles.title, {marginTop: 5}]}>
              Displa Name -{' '}
              <Text style={{color: 'grey', fontSize: 12}}>{item.name}</Text>
            </Text>
          </View>
          <View>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={item => setIsEnabled(item)}
              value={isEnabled}
            />
          </View>
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.title}>
            User Type -
            <Text style={{color: 'grey', fontSize: 12}}> {item.usertype}</Text>
          </Text>
          <View
            style={[
              styles.flexBox,
              {justifyContent: 'flex-start', marginTop: 5},
            ]}>
            <Text style={styles.title}>India- </Text>
            <Text
              style={{paddingRight: 10, borderRightWidth: 1, color: 'grey'}}>
              My Share: ₹2
            </Text>
            <Text
              style={{
                paddingRight: 10,
                paddingHorizontal: 5,
                borderRightWidth: 1,
                color: 'grey',
              }}>
              At Share: ₹2
            </Text>
            <Text style={{paddingHorizontal: 5, color: 'grey'}}>
              on Share: ₹2
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
              <BackButton placeholder={'Waitlist'} />
            </View>
            <View>
              <FlatList
                data={offers}
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

export default OffersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    marginHorizontal: SIZES.width * 0.051,
  },
  title: {
    color: '#000',
    fontSize: 14,
  },
  title2: {
    color: '#D2D2D2',
    fontSize: 14,
  },
  flexBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
