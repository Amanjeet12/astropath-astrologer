/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import {
  ActivityIndicator,
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
import React, {useEffect, useState} from 'react';
import HeaderSection from '../../../components/HeaderSection';
import {COLORS, SIZES} from '../../../constant/theme';
import images from '../../../constant/images';
import BackButton from '../../../components/BackButton';
import DetaillSection from '../../../components/DetaillSection';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchChatStats,
  fetchVoiceStats,
} from '../../../redux/features/StatsSlice';

const ChatScreen = () => {
  const dispatch = useDispatch();
  const [callstats, setCallStats] = useState('');
  const {islogin} = useSelector(state => state.verifyotp);
  const {isloading} = useSelector(state => state.rating);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [firstData] = await Promise.all([
      dispatch(fetchChatStats(islogin.jwt_token)),
    ]);
    setCallStats(firstData.payload.data);
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
              <BackButton placeholder={'Chat'} />
            </View>
            {callstats ? (
              <>
                <View style={styles.boxContainer}>
                  <View style={styles.flexBox}>
                    <Text style={styles.title}>Chat Stats</Text>
                    <Image
                      source={images.stat}
                      style={{width: 50, height: 30, resizeMode: 'contain'}}
                    />
                  </View>
                  <View style={styles.border} />
                  <View style={{marginTop: SIZES.width * 0.051}}>
                    <Text style={[styles.title, {fontSize: 16}]}>
                      Total Chat time
                    </Text>
                    <View style={{paddingLeft: 20, marginTop: 5}}>
                      <View style={{position: 'absolute', top: 13}}>
                        <Image
                          source={images.status}
                          style={{width: 10, height: 75, resizeMode: 'stretch'}}
                        />
                      </View>
                      <View style={[styles.flexBox, {marginTop: 10}]}>
                        <Text style={styles.headerTitle}>Today :</Text>
                        <Text style={styles.headerTitle}>
                          {callstats.callDurationToday.toFixed(2)} min
                        </Text>
                      </View>
                      <View style={[styles.flexBox, {marginTop: 10}]}>
                        <Text style={styles.headerTitle}>This Month :</Text>
                        <Text style={styles.headerTitle}>
                          {callstats.callDurationMonthly.toFixed(2)} min
                        </Text>
                      </View>
                      <View style={[styles.flexBox, {marginTop: 10}]}>
                        <Text style={styles.headerTitle}>This Year :</Text>
                        <Text style={styles.headerTitle}>
                          {callstats.callDurationYearly.toFixed(2)} min
                        </Text>
                      </View>
                    </View>
                    <View style={[styles.flexBox, {marginTop: 15}]}>
                      <Text style={styles.headerTitle}>
                        Total Request Accepted :
                      </Text>
                      <Text style={styles.headerTitle}>
                        {callstats.acceptedCalls}
                      </Text>
                    </View>
                    <View style={[styles.flexBox, {marginTop: 10}]}>
                      <Text style={styles.headerTitle}>
                        Total Request Missed :
                      </Text>
                      <Text style={styles.headerTitle}>
                        {callstats.rejectedCalls}
                      </Text>
                    </View>
                    <View style={[styles.flexBox, {marginTop: 10}]}>
                      <Text style={styles.headerTitle}>Total Revenue :</Text>
                      <Text style={styles.headerTitle}>
                        {callstats.totalRevenue}
                      </Text>
                    </View>
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
                  <Text style={styles.title}>Chat History</Text>
                  <DetaillSection data={callstats.interactionData} />
                </View>
              </>
            ) : (
              <>
                <View>
                  <ActivityIndicator size={'small'} color={'#000'} />
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default ChatScreen;

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
  headerTitle: {fontSize: 14, color: '#000'},
});
