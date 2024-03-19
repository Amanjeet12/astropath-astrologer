/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, SIZES} from '../../constant/theme';
import HeaderSection from '../../components/HeaderSection';
import BackButton from '../../components/BackButton';
import DatePicker from 'react-native-date-picker';
// import {addToCart} from '../../redux/cartSlice';
// import RecentKundali from '../../components/RecentKundali';
import AsyncStorage from '@react-native-async-storage/async-storage';
import images from '../../constant/images';
import DropDownPicker from 'react-native-dropdown-picker';
import {useSelector} from 'react-redux';

const NumerologyFormScreen = ({navigation}) => {
  const [date, setDate] = useState(new Date('1985-01-01T11:05:00.000Z'));
  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [lat, setLat] = useState('28.7041');
  const [lon, setLon] = useState('77.1025');
  const [open, setOpen] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const [Time, setTime] = useState(new Date());
  const [showTime, setShowTime] = useState('');
  const [hour, setHour] = useState('');
  const [min, setMinute] = useState('');
  const [showDay, setShowDay] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [recent, setRecent] = useState('');
  const [openGender, setOpenGender] = useState(false);
  const [value, setValue] = useState('');
  const [items, setItems] = useState([
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
  ]);
  const {islogin} = useSelector(state => state.verifyotp);

  const setToastMsg = msg => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
  };

  useEffect(() => {
    const retrieveItems = async () => {
      try {
        const items = await AsyncStorage.getItem('kundliItems');
        if (items !== null) {
          const parsedItems = JSON.parse(items);
          // Use parsedItems array as needed
          console.log(items);
          setRecent(parsedItems);
        }
      } catch (error) {
        console.error('Error retrieving items from AsyncStorage:', error);
      }
    };

    retrieveItems();
  }, []);

  const handleNavigation = async () => {
    try {
      console.log(name, day, month, year, hour, min, lat, lon, value);
      const token = islogin.jwt_token;

      if (
        name &&
        day &&
        month &&
        year &&
        hour !== null &&
        min !== null &&
        lat &&
        lon &&
        value
      ) {
        navigation.navigate('NumerologyScreen', {
          name,
          day,
          month,
          year,
          hour,
          min,
          lat,
          lon,
          token,
        });
      } else {
        console.log('Some values are missing');
        setToastMsg('All feilds are compalsary');
      }
    } catch (error) {
      console.log('erroring', error);
    }
  };

  const handlePlaceSelect = (placeName, lat, lng) => {
    setPlace(placeName);
    setLat(lat ? lat : '28.7041');
    setLon(lng ? lng : '77.1025');
    console.log(placeName, lat, lng);
  };

  const handleNavigateToSearchPlaceScreen = () => {
    navigation.navigate('SearchPlaceScreen', {
      onPlaceSelect: handlePlaceSelect,
    });
  };

  const setHandleTime = item => {
    const birthTimeUTC = new Date(item);
    const birthTimeLocal = birthTimeUTC.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    setShowTime(birthTimeLocal);
    setHour(birthTimeUTC.getHours());
    setMinute(birthTimeUTC.getMinutes());
    console.log(birthTimeUTC.getHours(), birthTimeUTC.getMinutes());
  };

  const setHandleDate = item => {
    const birthDayUTC = new Date(item);
    const birthDateLocal = birthDayUTC.toLocaleDateString();
    setDay(birthDayUTC.getDate());
    const month = birthDayUTC.getMonth() + 1;
    setMonth(month);
    setYear(birthDayUTC.getFullYear());
    setShowDay(birthDateLocal);
    console.log(
      birthDayUTC.getDate(),
      birthDayUTC.getMonth() + 1,
      birthDayUTC.getFullYear(),
    );
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={'#f7f1e1'} barStyle={'dark-content'} />

      <ImageBackground
        source={images.mobile_bg}
        style={{width: SIZES.width, height: SIZES.height, flex: 1}}
        imageStyle={{resizeMode: 'stretch'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginHorizontal: 20}}>
            <View style={{marginTop: SIZES.width * 0.026}}>
              <HeaderSection />
            </View>
            <View style={{width: SIZES.width * 0.65}}>
              <BackButton placeholder={'NumerologyScreen'} />
            </View>
            <View style={{marginTop: SIZES.width * 0.06}}>
              <View
                style={{
                  paddingBottom: SIZES.width * 0.021,
                  borderBottomWidth: 2,
                  borderColor: '#F39200',
                }}>
                <Text
                  style={{
                    fontSize: SIZES.width * 0.051,
                    fontFamily: 'KantumruyPro-Regular',
                    color: '#000',
                  }}>
                  Create a new numerology
                </Text>
              </View>
              <Text style={[styles.title, {marginTop: SIZES.width * 0.051}]}>
                Full Name
              </Text>
              <View style={styles.mainContainer}>
                <TextInput
                  placeholder={'Enter your Full Name'}
                  style={{
                    paddingLeft: SIZES.width * 0.051,
                    color: COLORS.black,
                    fontSize: SIZES.width * 0.036,
                  }}
                  keyboardType="default"
                  placeholderTextColor={'#000'}
                  onChangeText={text => setName(text)}
                />
              </View>
            </View>

            <View style={{marginTop: SIZES.width * 0.026}}>
              <Text style={styles.title}>Time of Birth</Text>
              <TouchableOpacity
                style={styles.mainContainer2}
                onPress={() => {
                  setOpenTime(true);
                }}>
                <Text
                  style={{
                    paddingLeft: SIZES.width * 0.051,
                    color: '#000',
                  }}>
                  {showTime ? showTime : 'Enter Time Of Birth'}
                </Text>

                <DatePicker
                  modal
                  open={openTime}
                  date={Time}
                  mode="time"
                  is24hourSource="locale"
                  locale="en-GB" // Use a locale that defaults to 24-hour format
                  onConfirm={time => {
                    setOpenTime(false);
                    setTime(time);
                    setHandleTime(time);
                    console.log(time);
                  }}
                  onCancel={() => {
                    setOpenTime(false);
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={{marginTop: SIZES.width * 0.026}}>
              <Text style={styles.title}>Date of Birth</Text>
              <TouchableOpacity
                style={styles.mainContainer2}
                onPress={() => {
                  setOpen(true);
                }}>
                <Text style={{paddingLeft: SIZES.width * 0.051, color: '#000'}}>
                  {showDay ? showDay : 'Enter You Birth Date'}
                </Text>

                <DatePicker
                  modal
                  open={open}
                  date={date}
                  mode="date"
                  onConfirm={date => {
                    setOpen(false);
                    setDate(date);
                    setHandleDate(date);
                    console.log(date);
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={{marginTop: SIZES.width * 0.026}}>
              <Text style={styles.title}>Place of Birth</Text>
              <View>
                <TouchableOpacity
                  style={[styles.mainContainer2]}
                  onPress={() => handleNavigateToSearchPlaceScreen()}>
                  <View
                    style={{
                      paddingLeft: SIZES.width * 0.051,
                      color: COLORS.black,
                      textTransform: 'capitalize',
                    }}>
                    <Text
                      style={{fontSize: SIZES.width * 0.036, color: '#000'}}>
                      {place ? place : 'Delhi'}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginTop: SIZES.width * 0.026}}>
              <Text style={styles.title}>Select Gender</Text>
              <View style={styles.mainContainer}>
                <DropDownPicker
                  open={openGender}
                  value={value}
                  items={items}
                  setOpen={setOpenGender}
                  setValue={setValue}
                  setItems={setItems}
                  placeholder={'Select Gender'}
                  style={{
                    width: '100%',
                    borderRadius: 5,
                    borderColor: 'gray',
                    borderWidth: 0.3,
                    paddingLeft: 20,
                  }}
                  listMode="SCROLLVIEW"
                />
              </View>
            </View>
            <View style={styles.button_position}>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => handleNavigation()}>
                <Text
                  style={[
                    styles.title,
                    {fontWeight: '500', fontSize: SIZES.width * 0.041},
                  ]}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default NumerologyFormScreen;

const styles = StyleSheet.create({
  mainContainer: {
    height: SIZES.width * 0.13,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.width * 0.01,
    marginVertical: SIZES.width * 0.013,
    borderColor: 'gray',
    borderWidth: 0.5,
    justifyContent: 'center',
  },
  title: {
    fontSize: SIZES.width * 0.036,
    color: '#000',
  },
  button_position: {
    position: 'relative',
    marginBottom: SIZES.width * 0.06,
  },
  buttonContainer: {
    height: SIZES.width * 0.13,
    marginTop: SIZES.width * 0.051,
    backgroundColor: '#FFB443',
    borderRadius: SIZES.width * 0.01,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer2: {
    height: SIZES.width * 0.13,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.width * 0.01,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SIZES.width * 0.013,
    borderColor: 'gray',
    borderWidth: 0.5,
  },
  //

  dropdown: {
    height: SIZES.width * 0.13,
    borderColor: 'gray',
    borderWidth: 0.1,
    // borderRadius: 8,
    paddingHorizontal: 8,
  },
});
