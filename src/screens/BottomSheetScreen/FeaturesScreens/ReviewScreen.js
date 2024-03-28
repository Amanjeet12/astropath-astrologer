/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BackButton from '../../../components/BackButton';
import HeaderSection from '../../../components/HeaderSection';
import {COLORS, SIZES} from '../../../constant/theme';
import images from '../../../constant/images';
import {customerReview, reportChat} from '../../../constant/data';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAllRating} from '../../../redux/features/RatingSlice';

const ReviewSceen = () => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState('');
  const {islogin} = useSelector(state => state.verifyotp);
  const {isloading} = useSelector(state => state.rating);
  console.log(islogin.jwt_token);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [firstData] = await Promise.all([
      dispatch(fetchAllRating(islogin.jwt_token)),
    ]);
    console.log(firstData.payload.data);
    setRating(firstData.payload.data);
  };

  const fetchDuration = (start, end) => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const durationInSeconds = (endTime - startTime) / 1000;
    const minutes = Math.floor(durationInSeconds / 60);
    if (isNaN(minutes)) {
      return 0;
    }
    return minutes;
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.boxContainer}>
        <View style={[styles.flxBox, {justifyContent: 'space-between'}]}>
          <Text style={styles.title}>{item.customerName}</Text>
          <Text style={styles.title}>
            Duration: {fetchDuration(item.startTime, item.endTime)} min
          </Text>
        </View>
        <View
          style={[
            styles.flxBox,
            {justifyContent: 'space-between', marginTop: 3},
          ]}>
          <Text style={[styles.title, {color: 'grey', fontSize: 12}]}>
            order ID - ORD{item._id.substring(0, 5)}
          </Text>
          <Text style={[styles.title, {fontSize: 12}]}>
            Total Cost - {item.cost}
          </Text>
        </View>
        <View
          style={[
            styles.flxBox,
            {alignItems: 'flex-start', gap: 5, marginTop: 3},
          ]}>
          <Text style={{fontSize: 12}}>Serive- {item.service}</Text>
          <Text style={{width: '60%', fontSize: 10, color: '#000'}}>
            <Text style={{color: 'grey'}}>Review- </Text>
            {item.review}
          </Text>
        </View>
        <View style={[styles.flxBox, styles.starContainer]}>
          <Icon name={'star'} size={12} color={'#fff'} />
          <Text style={[styles.title, {color: '#fff'}]}>{item.rating}</Text>
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
              <BackButton placeholder={'Review'} />
            </View>
            <View>
              <FlatList
                data={rating}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                scrollEnabled={false}
                contentContainerStyle={{marginBottom: 50}}
                ListEmptyComponent={() => (
                  <View
                    style={{
                      height: SIZES.width,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {isloading ? (
                      <ActivityIndicator size="small" color="#000" />
                    ) : null}
                  </View>
                )}
              />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default ReviewSceen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    marginHorizontal: SIZES.width * 0.051,
  },
  flxBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boxContainer: {
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    marginTop: 20,
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingBottom: 40,
  },
  title: {
    color: '#000',
    fontSize: 14,
  },
  starContainer: {
    position: 'absolute',
    right: 10,
    top: 70,
    paddingHorizontal: 15,
    paddingVertical: 3,
    borderRadius: 50,
    gap: 3,
    borderWidth: 0.5,
    backgroundColor: COLORS.borderColor,
  },
});
