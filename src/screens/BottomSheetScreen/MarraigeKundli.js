/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
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
import {COLORS, SIZES} from '../../constant/theme';
import HeaderSection from '../../components/HeaderSection';
import BackButton from '../../components/BackButton';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import NewBackButton from '../../components/NewBackButton';
import images from '../../constant/images';
import {useDispatch} from 'react-redux';
import {
  fetchMangalikReport,
  fetchMarraigePoint,
} from '../../redux/features/MarraigeKundaliSlice';

const MarraigeKundli = ({route}) => {
  const {
    name_m,
    lat_m,
    lon_m,
    day_m,
    month_m,
    year_m,
    hour_m,
    min_m,
    name_f,
    lat_f,
    lon_f,
    day_f,
    month_f,
    year_f,
    hour_f,
    min_f,
    token,
  } = route.params;

  const [loading, setLoading] = useState(true);
  const [birth_detail, setBirth_detail] = useState(null);
  const [mangalik_detail, setMagalik_detail] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const params = {
        name: name_m,
        m_day: day_m,
        m_month: month_m,
        m_year: year_m,
        m_hour: hour_m,
        m_min: min_m,
        m_lat: lat_m,
        m_lon: lon_m,
        m_tzone: '5.5',
        f_day: day_f,
        f_month: month_f,
        f_year: year_f,
        f_hour: hour_f,
        f_min: min_f,
        f_lat: lat_f,
        f_lon: lon_f,
        f_tzone: '5.5',
      };

      const [birthDetailData, mangalikData] = await Promise.all([
        dispatch(fetchMarraigePoint({params, token: token})),
        dispatch(fetchMangalikReport({params, token: token})),
      ]);

      setBirth_detail(birthDetailData.payload.data);
      setMagalik_detail(mangalikData.payload.data);
      console.log(mangalikData);
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const ProgressCircle = ({
    label,
    receivedPoints,
    totalPoints,
    tintColor,
    backgroundColor,
  }) => (
    <View style={{width: '20%', alignItems: 'center'}}>
      <AnimatedCircularProgress
        size={60}
        width={5}
        fill={(receivedPoints / totalPoints) * 100}
        tintColor={tintColor}
        backgroundColor={backgroundColor}
        onAnimationComplete={() => console.log('onAnimationComplete')}>
        {fill => (
          <View>
            <Text style={{fontSize: SIZES.width * 0.051, color: '#000'}}>
              {receivedPoints}{' '}
              <Text style={{fontSize: SIZES.width * 0.036, color: '#000'}}>
                / {totalPoints}
              </Text>
            </Text>
          </View>
        )}
      </AnimatedCircularProgress>
    </View>
  );

  return (
    <>
      <StatusBar backgroundColor={'#f7f1e1'} barStyle={'dark-content'} />
      <ImageBackground
        source={images.mobile_bg}
        style={{width: SIZES.width, height: SIZES.height, flex: 1}}
        imageStyle={{resizeMode: 'stretch'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.mainContainer}>
            <View style={{marginTop: SIZES.width * 0.026}}>
              <HeaderSection />
            </View>
            <View style={{width: SIZES.width * 0.65}}>
              <BackButton placeholder={'Marraige Kundli'} />
            </View>

            {loading ? (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 100,
                }}>
                <ActivityIndicator size="large" />
              </View>
            ) : (
              <>
                <View style={{marginTop: SIZES.width * 0.05}}>
                  <Image
                    source={images.marriage_meter}
                    style={{
                      width: '100%',
                      height: SIZES.width * 0.46,
                      resizeMode: 'contain',
                    }}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      bottom: -20,
                      paddingVertical: 10,
                      paddingHorizontal: 18,
                      backgroundColor: '#ffcf87',
                      borderRadius: 30,
                      left: SIZES.width * 0.3,
                      right: SIZES.width * 0.3,

                      alignItems: 'center',
                    }}>
                    <View>
                      <Text
                        style={{fontSize: SIZES.width * 0.051, color: '#000'}}>
                        {birth_detail.total.received_points}{' '}
                        <Text
                          style={{
                            fontSize: SIZES.width * 0.036,
                            color: '#000',
                          }}>
                          / {birth_detail.total.total_points}
                        </Text>
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.boxContainer}>
                  <ProgressCircle
                    label=" Temperament  ( gan )"
                    receivedPoints={birth_detail.gan.received_points}
                    totalPoints={birth_detail.gan.total_points}
                    tintColor="#f1c21b"
                    backgroundColor="#f9e59e"
                  />
                  <View style={{width: '80%'}}>
                    <Text style={styles.title}>Temperament ( gana )</Text>
                    <Text style={styles.description}>
                      Gana is the indicator of the behaviour, character and
                      temperament of the potential bride and groom towards each
                      other.
                    </Text>
                  </View>
                </View>
                <View style={styles.boxContainer}>
                  <ProgressCircle
                    label="Love ( Bhakut )"
                    receivedPoints={birth_detail.bhakut.received_points}
                    totalPoints={birth_detail.bhakut.total_points}
                    tintColor="#ff6f6f"
                    backgroundColor="#ffb8b8"
                  />
                  <View style={{width: '80%'}}>
                    <Text style={[styles.title, {color: '#FF6F6F'}]}>
                      Love ( Bhakut )
                    </Text>
                    <Text style={styles.description}>
                      Bhakut is related to the couple's joys and sorrows
                      together and assesses the wealth and health after their
                      wedding.
                    </Text>
                  </View>
                </View>
                <View style={styles.boxContainer}>
                  <ProgressCircle
                    label=" Dominance ( Vashya )"
                    receivedPoints={birth_detail.vashya.received_points}
                    totalPoints={birth_detail.vashya.total_points}
                    tintColor="#4D26B9"
                    backgroundColor="#946FFF"
                  />
                  <View style={{width: '80%'}}>
                    <Text style={[styles.title, {color: '#946FFF'}]}>
                      Dominance ( Vashya )
                    </Text>
                    <Text style={styles.description}>
                      Vashya indicates the bride and the groom's tendency to
                      dominate or influence each other in a marriage.
                    </Text>
                  </View>
                </View>
                <View style={styles.boxContainer}>
                  <View style={{width: '20%', alignItems: 'center'}}>
                    <ProgressCircle
                      label=" Health ( nadi' )"
                      receivedPoints={birth_detail.nadi.received_points}
                      totalPoints={birth_detail.nadi.total_points}
                      tintColor="#f1c21b"
                      backgroundColor="#f9e59e"
                    />
                  </View>
                  <View style={{width: '80%'}}>
                    <Text style={[styles.title, {color: '#D88200'}]}>
                      Health ( nadi )
                    </Text>
                    <Text style={styles.description}>
                      Nadi is related to the health compatibility of the couple.
                      Matters of childbirth and progeny are also determined with
                      this Guna.
                    </Text>
                  </View>
                </View>
                <View style={styles.boxContainer}>
                  <View style={{width: '20%', alignItems: 'center'}}>
                    <ProgressCircle
                      label=" Destiny ( Tara )"
                      receivedPoints={birth_detail.tara.received_points}
                      totalPoints={birth_detail.tara.total_points}
                      tintColor="#ff6f6f"
                      backgroundColor="#ffb8b8"
                    />
                  </View>
                  <View style={{width: '80%'}}>
                    <Text style={[styles.title, {color: '#FF6F6F'}]}>
                      Destiny ( Tara )
                    </Text>
                    <Text style={styles.description}>
                      Tara is the indicator of the birth star compatibility of
                      the bride and the groom. It also indicates the fortune of
                      the couple.
                    </Text>
                  </View>
                </View>
                <View style={styles.boxContainer}>
                  <View style={{width: '20%', alignItems: 'center'}}>
                    <ProgressCircle
                      label=" Physical compatibility ( Yoni )"
                      receivedPoints={birth_detail.yoni.received_points}
                      totalPoints={birth_detail.yoni.total_points}
                      tintColor="#4D26B9"
                      backgroundColor="#946FFF"
                    />
                  </View>
                  <View style={{width: '80%'}}>
                    <Text style={[styles.title, {color: '#946FFF'}]}>
                      Physical compatibility ( Yoni )
                    </Text>
                    <Text style={styles.description}>
                      Yoni is the indicator of the sexual or physical
                      compatibility between the bride and the groom in question.
                    </Text>
                  </View>
                </View>
                <View style={styles.boxContainer}>
                  <View style={{width: '20%', alignItems: 'center'}}>
                    <ProgressCircle
                      label=" Destiny ( Tara )"
                      receivedPoints={birth_detail.varna.received_points}
                      totalPoints={birth_detail.varna.total_points}
                      tintColor="#f1c21b"
                      backgroundColor="#f9e59e"
                    />
                  </View>
                  <View style={{width: '80%'}}>
                    <Text style={[styles.title, {color: '#D88200'}]}>
                      Compatibility ( Varna )
                    </Text>
                    <Text style={styles.description}>
                      Varna refers to the mental compatibility of two persons
                      involved. It holds nominal effect in the matters of
                      marriage compatibility
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.boxContainer,
                    {marginBottom: SIZES.width * 0.041},
                  ]}>
                  <View style={{width: '20%', alignItems: 'center'}}>
                    <ProgressCircle
                      label=" Destiny ( Tara )"
                      receivedPoints={birth_detail.maitri.received_points}
                      totalPoints={birth_detail.maitri.total_points}
                      tintColor="#ff6f6f"
                      backgroundColor="#ffb8b8"
                    />
                  </View>
                  <View style={{width: '80%'}}>
                    <Text style={[styles.title, {color: '#FF6F6F'}]}>
                      Mental compatibility ( Maitri )
                    </Text>
                    <Text style={styles.description}>
                      Maitri assesses the mental compatibility and mutual love
                      between the partners to be married.
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    marginVertical: 10,
                    marginBottom: 50,
                    borderWidth: 0.5,
                    borderRadius: 5,
                    borderColor: COLORS.primary,
                    padding: 10,
                    backgroundColor: '#fff',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: SIZES.width * 0.051,
                      color: '#000',
                    }}>
                    Manglik Report
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      marginTop: 20,
                    }}>
                    <View style={{alignItems: 'center'}}>
                      <Image source={images.m_man} style={styles.image} />
                      <Text style={styles.text}>{name_m}</Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: mangalik_detail.male.is_present
                            ? 'red'
                            : 'green',
                        }}>
                        {mangalik_detail.male.is_present
                          ? 'Mangalik'
                          : 'Not Mangalik'}
                      </Text>
                    </View>
                    <View>
                      <View style={{alignItems: 'center'}}>
                        <Image source={images.w_woman} style={styles.image} />
                        <Text style={styles.text}>{name_f}</Text>
                        <Text
                          style={{
                            fontSize: 14,
                            color: mangalik_detail.male.is_present
                              ? 'red'
                              : 'green',
                          }}>
                          {mangalik_detail.female.is_present
                            ? 'Mangalik'
                            : 'Not Mangalik'}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: 'grey',
                        fontSize: 12,
                        paddingTop: 10,
                      }}>
                      {mangalik_detail.conclusion?.report}
                    </Text>
                  </View>
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default MarraigeKundli;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    marginHorizontal: SIZES.width * 0.051,
  },
  boxContainer: {
    flexDirection: 'row',
    width: '100%',
    height: SIZES.width * 0.255,
    backgroundColor: '#fff',
    alignItems: 'center',
    gap: SIZES.width * 0.026,
    paddingHorizontal: SIZES.width * 0.026,
    borderRadius: SIZES.width * 0.01,
    marginTop: SIZES.width * 0.08,
  },
  title: {
    fontFamily: 'KantumruyPro-Bold',
    fontSize: SIZES.width * 0.041,
    color: '#D88200',
  },
  description: {
    fontFamily: 'KantumruyPro-Regular',
    fontSize: SIZES.width * 0.026,
    color: '#525252',
  },
  image: {width: 70, height: 70, resizeMode: 'contain'},
  text: {marginTop: 10, fontSize: 16, color: '#000'},
});
