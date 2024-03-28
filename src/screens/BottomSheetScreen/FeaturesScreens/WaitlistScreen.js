/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  Alert,
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
import BackButton from '../../../components/BackButton';
import HeaderSection from '../../../components/HeaderSection';
import {COLORS, SIZES, getUserInfo} from '../../../constant/theme';
import images from '../../../constant/images';
import {reportChat, waitlist} from '../../../constant/data';
import * as Progress from 'react-native-progress';
import {useNavigation} from '@react-navigation/native';

import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';

import ZegoUIKitPrebuiltCallService, {
  ZegoSendCallInvitationButton,
  ZegoMenuBarButtonName,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import {useDispatch, useSelector} from 'react-redux';
import {deleteQueue, fetchAllQueue} from '../../../redux/features/QueueSlice';
import Chat from 'react-native-vector-icons/AntDesign';

const Waitlist = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [userID, setUserID] = useState('');
  const [queue, setQueue] = useState('');
  const {islogin} = useSelector(state => state.verifyotp);
  const {isloading} = useSelector(state => state.queue);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [firstData] = await Promise.all([
      dispatch(fetchAllQueue(islogin.jwt_token)),
    ]);
    console.log(firstData.payload.data);
    setQueue(firstData.payload.data);
  };

  const handleRejectQueue = index => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to Delete?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            console.log('done', index);
            handleDelete(index);
          },
        },
      ],
      {cancelable: false},
    );
  };

  const handleDelete = async index => {
    var params = {
      index: index,
    };
    try {
      const [firstData] = await Promise.all([
        dispatch(deleteQueue({params, token: islogin.jwt_token})),
      ]);
      console.log(firstData.payload.success);
      if (firstData.payload.success === 1) {
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.boxContainer}>
        <View style={[styles.flexBox, {gap: 10}]}>
          <View style={styles.headerContainer}>
            <Text style={[styles.title, {color: '#fff'}]}>
              {item.user_name.substring(0, 1)}
            </Text>
          </View>
          <View>
            <Text style={styles.title}>{item.user_name}</Text>
            <Text
              style={[
                styles.title,
                {color: 'grey', fontSize: 12, paddingTop: 3},
              ]}>
              ID - {item.user_data.substring(0, 7)}
            </Text>
          </View>
        </View>
        <View style={[styles.flexBox, {marginTop: 10}]}>
          <View
            style={{
              width: '50%',
              borderRightWidth: 1,
              borderColor: '#F39200',
            }}>
            <Text style={styles.title2}>Service - {item.service}</Text>
            <Text style={styles.title2}>Token No - {item.index + 1}</Text>
          </View>
          <View
            style={{
              width: '50%',
              marginLeft: 25,
            }}>
            <Text style={styles.title2}>
              Date - {new Date(item.date).toLocaleDateString()}
            </Text>
            <Text style={styles.title2}>
              Time - {new Date(item.date).toLocaleTimeString()}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 30,
          }}>
          {item.service === 'chat' ? (
            <TouchableOpacity
              style={[
                styles.button,
                {backgroundColor: COLORS.white, borderWidth: 1},
              ]}
              onPress={() => console.log('chat')}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <Chat name={'message1'} size={20} color={'blue'} />
                <Text
                  style={[
                    styles.title,
                    {
                      color: COLORS.black,
                      textTransform: 'uppercase',
                      fontSize: 14,
                    },
                  ]}>
                  chat
                </Text>
              </View>
            </TouchableOpacity>
          ) : item.service === 'voice call' ? (
            <ZegoSendCallInvitationButton
              invitees={[{userID: item.phone, userName: item.user_name}]}
              isVideoCall={false}
              text={'Voice Call'}
              width={150}
              height={45}
              textColor={COLORS.borderColor}
              backgroundColor={COLORS.white}
              borderRadius={5}
              borderWidth={1}
              borderColor={'#000'}
              fontSize={16}
              resourceID={'zego_data'}
            />
          ) : (
            <ZegoSendCallInvitationButton
              invitees={[{userID: item.phone, userName: item.user_name}]}
              isVideoCall={true}
              text={'VC'}
              width={150}
              height={45}
              textColor={COLORS.borderColor}
              backgroundColor={COLORS.white}
              borderRadius={5}
              borderWidth={1}
              borderColor={'#000'}
              fontSize={16}
              resourceID={'zego_data'}
            />
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleRejectQueue(item.index)}>
            <Text
              style={[
                styles.title,
                {color: '#fff', textTransform: 'uppercase', fontSize: 14},
              ]}>
              Cancel Session
            </Text>
          </TouchableOpacity>
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
                data={queue}
                renderItem={renderItem}
                keyExtractor={item => item.index.toString()}
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

export default Waitlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    marginHorizontal: SIZES.width * 0.051,
  },
  boxContainer: {
    height: 220,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    marginTop: 20,
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  title: {
    color: '#000',
    fontSize: 16,
  },
  title2: {
    color: '#000',
    fontSize: 14,
    paddingTop: 3,
  },
  flexBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContainer: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.borderColor,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 150,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: COLORS.borderColor,
  },
});
