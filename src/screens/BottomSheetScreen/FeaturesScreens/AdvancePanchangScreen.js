/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
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
import React, {useCallback, useEffect, useRef, useState} from 'react';
import BackButton from '../../../components/BackButton';
import HeaderSection from '../../../components/HeaderSection';
import {SIZES} from '../../../constant/theme';
import images from '../../../constant/images';
import TableComponent from '../../../components/TableComponent';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPanchang} from '../../../redux/features/PanchangSlice';
import KundliSecion from '../../../components/KundliSecion';

const AdvancePanchangScreen = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState('');
  const [loading, setLoading] = useState('');
  const [refreshing, setRefreshing] = useState('');
  const calledOnceRef = useRef(false);
  const {islogin} = useSelector(state => state.verifyotp);
  const {panchangData, isloading} = useSelector(state => state.panchang);

  const getOrdinalSuffix = useCallback(day => {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }, []);

  const getCurrentDateTime = useCallback(() => {
    const date = new Date();
    const day = date.getDate().toString();
    const month = (date.getMonth() + 1).toString();
    const year = date.getFullYear().toString();
    const hour = date.getHours().toString();
    const minute = date.getMinutes().toString();
    const ordinalSuffix = getOrdinalSuffix(date.getDate());
    const formattedDate = `${day}${ordinalSuffix} ${month} ${year}`;

    return {day, month, year, hour, minute, formattedDate};
  }, [getOrdinalSuffix]);

  const callPanchang = async () => {
    let latitude, longitude, token;

    setLoading(true);
    try {
      const {day, month, year, hour, minute} = getCurrentDateTime();

      if (islogin.jwt_token) {
        const params = {
          name: 'user',
          day,
          month,
          year,
          hour,
          min: minute,
          lat: latitude ? latitude : '28.7041',
          lon: longitude ? longitude : '77.1025',
          tzone: '5.5',
        };

        console.log(params);
        dispatch(fetchPanchang({params, token: islogin.jwt_token}));
      } else {
        console.log('Latitude, longitude, or token is null');
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (panchangData === null) {
      callPanchang();
    } else {
      setData(panchangData.data);
    }
  }, [panchangData]);

  const formattedDate = getCurrentDateTime().formattedDate;

  const newArray = [];
  const filteredData = {
    sun_sign: data.sun_sign,
    moon_sign: data.moon_sign,
    vikram_samvat: data.vikram_samvat,
    shaka_samvat: data.shaka_samvat,
    vkram_samvat_name: data.vkram_samvat_name,
    shaka_samvat_name: data.shaka_samvat_name,
    disha_shool: data.disha_shool,
    disha_shool_remedies: data.disha_shool_remedies,
    moon_nivas: data.moon_nivas,
  };

  Object.keys(data).forEach(key => {
    if (
      ['abhijit_muhurta', 'rahukaal', 'guliKaal', 'yamghant_kaal'].includes(key)
    ) {
      newArray.push({
        label: key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        value: `${data[key].start} - ${data[key].end}`,
      });
    }
  });

  const renderItem = ({item, index}) => {
    const rowStyle = index % 2 === 0 ? styles.evenRow : styles.oddRow;
    return (
      <View style={[styles.row, rowStyle]}>
        <Text style={[styles.cell, styles.column2]}>{item.label}</Text>
        <Text style={[styles.cell, styles.column3]}>{item.value}</Text>
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
              <BackButton placeholder={'Panchang'} />
            </View>
            <View>
              {isloading && (
                <View style={{marginTop: 50}}>
                  <ActivityIndicator size={'large'} color={'#000'} />
                </View>
              )}
              {data && (
                <View style={styles.bigContainer}>
                  <View style={{paddingHorizontal: 20, marginTop: 10}}>
                    <View style={{flexDirection: 'row'}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          gap: SIZES.width * 0.026,
                          alignItems: 'flex-end',
                        }}>
                        <Text
                          style={{
                            fontFamily: 'DMSerifDisplay-Regular',
                            fontSize: SIZES.width * 0.0893,
                            color: '#F39200',
                          }}>
                          {data ? data.day : null}
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'KantumruyPro-Regular',
                            fontSize: SIZES.width * 0.036,
                            color: '#000',
                          }}>
                          {formattedDate}
                        </Text>
                      </View>
                    </View>
                    <View>
                      <View style={styles.flexbox}>
                        <View style={{alignItems: 'center'}}>
                          <Image source={images.sunrise} style={styles.icon} />
                          <Text style={styles.text2}>Vedic Sunrise</Text>
                          <Text style={{color: '#000'}}>
                            {data.vedic_sunrise}
                          </Text>
                        </View>

                        <View style={{alignItems: 'center'}}>
                          <Image source={images.sunset} style={styles.icon} />
                          <Text style={styles.text2}>Vedic Sunset</Text>
                          <Text style={{color: '#000'}}>
                            {data.vedic_sunset}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={[
                          styles.flexbox,
                          {
                            marginTop: 20,
                            paddingHorizontal: 20,
                            marginBottom: 20,
                          },
                        ]}>
                        <View style={{alignItems: 'center'}}>
                          <Image source={images.moon} style={styles.icon} />
                          <Text style={styles.text2}>Moonrise</Text>
                          <Text style={{color: '#000'}}>{data.moonrise}</Text>
                        </View>

                        <View style={{alignItems: 'center'}}>
                          <Image source={images.moon} style={styles.icon} />
                          <Text style={styles.text2}>Moonset</Text>
                          <Text style={{color: '#000'}}>{data.moonset}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.border} />
                  <View style={{paddingLeft: 20, marginTop: 20}}>
                    {[
                      {label: 'Ritu:', value: data.ritu},
                      {label: 'Ayana:', value: data.ayana},
                      {label: 'Disha Shool:', value: data.disha_shool},
                      {label: 'Shaka Samvat:', value: data.shaka_samvat},
                      {label: 'Vikram Samvat:', value: data.vikram_samvat},
                    ].map((item, index) => (
                      <View
                        key={index}
                        style={{
                          flexDirection: 'row',
                          marginTop: index > 0 ? 5 : 0,
                        }}>
                        <Text
                          style={{fontSize: 16, color: '#000', width: '40%'}}>
                          {item.label}
                        </Text>
                        <Text style={{color: 'grey'}}>{item.value}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {data && (
                <View style={{marginTop: 10}}>
                  <KundliSecion />
                </View>
              )}

              {data.tithi && (
                <>
                  <View style={[styles.flexBox, {marginTop: 10}]}>
                    <Text style={styles.title}>Tithi Details</Text>
                  </View>
                  <View style={styles.border} />
                  <View style={{marginTop: SIZES.width * 0.051}}>
                    <TableComponent data={data.tithi.details} />
                  </View>
                </>
              )}
              {data.nakshatra && (
                <>
                  <View style={[styles.flexBox, {marginTop: 20}]}>
                    <Text style={styles.title}>Nakshatra Details</Text>
                  </View>
                  <View style={styles.border} />
                  <View style={{marginTop: SIZES.width * 0.051}}>
                    <TableComponent data={data.nakshatra.details} />
                  </View>
                </>
              )}
              {data.yog && (
                <>
                  <View style={[styles.flexBox, {marginTop: 20}]}>
                    <Text style={styles.title}>Yog Details</Text>
                  </View>
                  <View style={styles.border} />
                  <View style={{marginTop: SIZES.width * 0.051}}>
                    <TableComponent data={data.yog.details} />
                  </View>
                </>
              )}
              {data.karan && (
                <>
                  <View style={[styles.flexBox, {marginTop: 20}]}>
                    <Text style={styles.title}>Karan Details</Text>
                  </View>
                  <View style={styles.border} />
                  <View style={{marginTop: SIZES.width * 0.051}}>
                    <TableComponent data={data.karan.details} />
                  </View>
                </>
              )}
              {data.hindu_maah && (
                <>
                  <View style={[styles.flexBox, {marginTop: 20}]}>
                    <Text style={styles.title}>Hindu Maah Details</Text>
                  </View>
                  <View style={styles.border} />
                  <View style={{marginTop: SIZES.width * 0.051}}>
                    <TableComponent data={data.hindu_maah} />
                  </View>
                </>
              )}
              {data && (
                <>
                  <View style={[styles.flexBox, {marginTop: 20}]}>
                    <View>
                      <Text style={styles.title}>Maha Dasha</Text>
                    </View>
                  </View>
                  <View style={styles.border} />
                  <View style={styles.containerBox}>
                    <View style={styles.container}>
                      <View style={styles.header}>
                        <Text style={[styles.headerText, {width: '40%'}]}>
                          Title
                        </Text>
                        <Text style={[styles.headerText, {width: '32%'}]}>
                          Start - End
                        </Text>
                      </View>
                      <FlatList
                        data={newArray}
                        scrollEnabled={false}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                      />
                    </View>
                  </View>
                </>
              )}
              {data.hindu_maah && (
                <>
                  <View style={[styles.flexBox]}>
                    <Text style={styles.title}>Other Details</Text>
                  </View>
                  <View style={styles.border} />
                  <View
                    style={{marginTop: SIZES.width * 0.051, marginBottom: 30}}>
                    <TableComponent data={filteredData} />
                  </View>
                </>
              )}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default AdvancePanchangScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    marginHorizontal: SIZES.width * 0.051,
  },
  title: {
    fontSize: SIZES.width * 0.051,
    color: '#171532',
    fontFamily: 'KantumruyPro-Regular',
  },
  flexBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  border: {
    height: 1,
    borderWidth: 0.5,
    borderColor: '#F39200',
    marginTop: SIZES.width * 0.013,
    marginHorizontal: 20,
  },
  bigContainer: {
    width: SIZES.width - 40,
    height: 450,
    borderWidth: 1,
    marginTop: 30,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderColor: '#F39200',
  },

  //
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#843C14',
    paddingBottom: 10,
    paddingHorizontal: 5,
    paddingTop: 10,
    backgroundColor: '#f2f2f2',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  headerText: {
    fontWeight: '700',
    fontSize: 14,
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#ccc',
    paddingVertical: 5,
    padding: 5,
  },
  cell: {
    width: '40%',
    fontSize: 14,
    color: '#000',
  },
  evenRow: {
    backgroundColor: '#FECF8A',
  },
  oddRow: {
    backgroundColor: '#fff',
  },
  column1: {
    width: '40%',
    borderRightWidth: 1,
    borderColor: '#843C14',
    paddingLeft: 5,
  },
  column2: {
    width: '40%',
    borderRightWidth: 1,
    borderColor: '#843C14',
    paddingLeft: 5,
  },
  column3: {
    flex: 1,
    paddingLeft: 5,
  },
  containerBox: {
    marginVertical: SIZES.width * 0.051,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#F39200',
  },
  icon: {
    width: SIZES.width * 0.115,
    height: SIZES.width * 0.115,
    resizeMode: 'contain',
  },
  flexbox: {
    flexDirection: 'row',
    gap: SIZES.width * 0.026,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SIZES.width * 0.026,
    paddingHorizontal: 10,
  },
});
