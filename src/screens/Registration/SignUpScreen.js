/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import BackButton from '../../components/BackButton';
import HeaderSection from '../../components/HeaderSection';
import {COLORS, SIZES} from '../../constant/theme';
import images from '../../constant/images';
import {TextInput} from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker';
import DropDownPicker from 'react-native-dropdown-picker';

const SignUpScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(new Date('1985-01-01T11:05:00.000Z'));
  const [open, setOpen] = useState(false);
  const [openGenderOption, setOpenGenderOption] = useState(false);
  const [showDay, setShowDay] = useState('');
  const [value, setValue] = useState('');
  const [items, setItems] = useState([
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'Female'},
  ]);
  const [openp, setOpenp] = useState(false);
  const [openPlatfromOption, setOpenPlatfromOption] = useState(false);
  const [valuep, setValuep] = useState('');
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([
    {label: 'Yes', value: 'yes'},
    {label: 'No', value: 'no'},
  ]);
  const [mobile, setMobile] = useState(null);
  const [location, setLocation] = useState('');
  const [platfromName, setPlatfromName] = useState('');
  const [answer, setAnswer] = useState('');
  const [incomeSource, setIncomeSource] = useState('');

  const setHandleDate = item => {
    const birthDayUTC = new Date(item);
    const birthDateLocal = birthDayUTC.toLocaleDateString();
    setShowDay(birthDateLocal);
  };
  const handleInputChange = (text, setter) => {
    setter(text);
  };
  const setToastMsg = msg => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
  };
  const handleName = text => handleInputChange(text, setName);
  const handleEmail = text => handleInputChange(text, setEmail);

  const isEmailValid = text => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
  };
  const handleMobile = text => handleInputChange(text, setMobile);
  const handleLocation = text => handleInputChange(text, setLocation);
  const handlePlatfromName = text => handleInputChange(text, setPlatfromName);
  const handleAnswer = text => handleInputChange(text, setAnswer);
  const handleIncomeSource = text => handleInputChange(text, setIncomeSource);

  const handleNavigation = () => {
    navigation.navigate('SuccessfullResgistration');
    console.log(
      name,
      email,
      mobile,
      location,
      platfromName,
      answer,
      incomeSource,
      value,
      valuep,
      showDay,
    );
    if (
      !name ||
      !email ||
      !mobile ||
      !location ||
      !platfromName ||
      !answer ||
      !incomeSource ||
      !showDay ||
      !valuep ||
      !value
    ) {
      setToastMsg('Please fill in all fields');
    } else if (!isEmailValid(email)) {
      setToastMsg('Please enter a valid email address');
    } else {
      // setLoading(true);
    }
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
              <HeaderSection hide={true} />
            </View>
            <View>
              <BackButton placeholder={'Sign Up'} />
            </View>
            <View style={{marginTop: SIZES.width * 0.051}}>
              <Text style={styles.title2}>Enter Name</Text>
              <View style={styles.mainContainer2}>
                <TextInput
                  placeholder={'Enter Your name'}
                  style={{
                    paddingLeft: SIZES.width * 0.051,
                    color: COLORS.black,
                    textTransform: 'capitalize',
                    width: '100%',
                  }}
                  keyboardType="default"
                  placeholderTextColor={COLORS.black}
                  onChangeText={handleName}
                />
              </View>
            </View>
            <View style={{marginTop: SIZES.width * 0.025}}>
              <Text style={styles.title2}>Enter Email</Text>
              <View style={styles.mainContainer2}>
                <TextInput
                  placeholder={'Enter Your Email'}
                  style={{
                    paddingLeft: SIZES.width * 0.051,
                    color: COLORS.black,
                    textTransform: 'capitalize',
                    width: '100%',
                  }}
                  keyboardType="email-address"
                  placeholderTextColor={COLORS.black}
                  onChangeText={handleEmail}
                />
              </View>
            </View>
            <View style={{marginTop: SIZES.width * 0.025}}>
              <Text style={styles.title2}>Select Gender </Text>
              <DropDownPicker
                open={openGenderOption}
                value={value}
                items={items}
                setOpen={setOpenGenderOption}
                setValue={setValue}
                setItems={setItems}
                placeholder={'Select Your Gender'}
                style={{
                  width: '100%',
                  borderRadius: 5,
                  marginTop: 5,
                  borderWidth: 0.3,
                }}
                listMode="SCROLLVIEW"
              />
            </View>
            <View style={{marginTop: SIZES.width * 0.025}}>
              <Text style={styles.title2}>Enter Mobile No </Text>
              <View style={styles.mainContainer2}>
                <TextInput
                  placeholder={'Enter Your Mobile'}
                  style={{
                    paddingLeft: SIZES.width * 0.051,
                    color: COLORS.black,
                    textTransform: 'capitalize',
                    width: '100%',
                  }}
                  keyboardType="number-pad"
                  maxLength={10}
                  placeholderTextColor={COLORS.black}
                  onChangeText={handleMobile}
                />
              </View>
            </View>
            <View style={{marginTop: SIZES.width * 0.025}}>
              <Text style={styles.title2}>Enter Location </Text>
              <View style={styles.mainContainer2}>
                <TextInput
                  placeholder={'Enter Your Location'}
                  style={{
                    paddingLeft: SIZES.width * 0.051,
                    color: COLORS.black,
                    textTransform: 'capitalize',
                    width: '100%',
                  }}
                  keyboardType="default"
                  placeholderTextColor={COLORS.black}
                  onChangeText={handleLocation}
                />
              </View>
            </View>
            <View style={{marginTop: SIZES.width * 0.026}}>
              <Text style={styles.title2}>Date of Birth</Text>
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
            <View style={{marginTop: SIZES.width * 0.025}}>
              <Text style={styles.title2}>
                Are your working on another platform?{' '}
              </Text>
              <DropDownPicker
                open={openPlatfromOption}
                value={valuep}
                items={options}
                setOpen={setOpenPlatfromOption}
                setValue={setValuep}
                setItems={setOptions}
                placeholder={'Select'}
                style={{
                  width: '100%',
                  borderRadius: 5,
                  marginTop: 5,
                  borderWidth: 0.3,
                }}
                listMode="SCROLLVIEW"
              />
            </View>
            <View style={{marginTop: SIZES.width * 0.025}}>
              <Text style={styles.title2}>
                If Yes, please enter the platform name.{' '}
              </Text>
              <View style={styles.mainContainer2}>
                <TextInput
                  placeholder={'Platfrom Name'}
                  style={{
                    paddingLeft: SIZES.width * 0.051,
                    color: COLORS.black,
                    textTransform: 'capitalize',
                    width: '100%',
                  }}
                  keyboardType="default"
                  placeholderTextColor={COLORS.black}
                  onChangeText={handlePlatfromName}
                />
              </View>
            </View>
            <View style={{marginTop: SIZES.width * 0.025}}>
              <Text style={styles.title2}>
                From where did you learn Astrology?
              </Text>
              <View style={styles.mainContainer2}>
                <TextInput
                  placeholder={'Your Answer'}
                  style={{
                    paddingLeft: SIZES.width * 0.051,
                    color: COLORS.black,
                    textTransform: 'capitalize',
                    width: '100%',
                  }}
                  keyboardType="default"
                  placeholderTextColor={COLORS.black}
                  onChangeText={handleAnswer}
                />
              </View>
            </View>
            <View style={{marginTop: SIZES.width * 0.025}}>
              <Text style={styles.title2}>
                Main source of income (Other than astrology)?
              </Text>
              <View style={styles.mainContainer2}>
                <TextInput
                  placeholder={'Your Answer'}
                  style={{
                    paddingLeft: SIZES.width * 0.051,
                    color: COLORS.black,
                    textTransform: 'capitalize',
                    width: '100%',
                  }}
                  keyboardType="default"
                  placeholderTextColor={COLORS.black}
                  onChangeText={handleIncomeSource}
                />
              </View>
            </View>
            <View style={styles.button_position}>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => handleNavigation()}
                disabled={loading}>
                {loading ? (
                  <ActivityIndicator color={COLORS.black} />
                ) : (
                  <Text
                    style={[
                      styles.title,
                      {fontWeight: '500', fontSize: SIZES.width * 0.041},
                    ]}>
                    Submit
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={loading}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setLoading(!loading);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ActivityIndicator size={'large'} color={'green'} />
              <Text style={{fontSize: 18, color: '#000'}}>Loading</Text>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // black shade with 50% opacity
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    paddingHorizontal: 50,
    paddingVertical: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'row',
    gap: 10,
  },
  mainContainer: {
    marginHorizontal: SIZES.width * 0.051,
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
  title2: {
    fontSize: SIZES.width * 0.036,
    color: '#000',
  },
  button_position: {
    position: 'relative',
  },
  buttonContainer: {
    height: SIZES.width * 0.13,
    marginTop: SIZES.width * 0.051,
    backgroundColor: '#FFB443',
    borderRadius: SIZES.width * 0.01,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.width * 0.05,
  },
});
