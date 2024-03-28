/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, SIZES} from '../../constant/theme';
import HeaderSection from '../../components/HeaderSection';
import OrderSection from '../../components/OrderSection';
import images from '../../constant/images';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAllOrder} from '../../redux/features/RatingSlice';

const OrderScreen = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState('');
  const {islogin} = useSelector(state => state.verifyotp);
  const {isloading} = useSelector(state => state.rating);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [firstData] = await Promise.all([
      dispatch(fetchAllOrder(islogin.jwt_token)),
    ]);
    setOrders(firstData.payload.data);
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
              <Text style={styles.tagLine}>Recent orders and chats</Text>
              <View style={{marginBottom: 50}}>
                {isloading ? (
                  <View
                    style={{
                      height: SIZES.width,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <ActivityIndicator size="small" color="#000" />
                  </View>
                ) : (
                  <OrderSection data={orders} />
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default OrderScreen;

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
});
