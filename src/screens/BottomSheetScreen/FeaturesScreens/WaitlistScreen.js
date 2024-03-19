/* eslint-disable react/no-unstable-nested-components */
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

const Waitlist = () => {
  const navigation = useNavigation();
  const [userID, setUserID] = useState('');
  // const [invitees, setInvitees] = useState(['123456']);

  const onUserLogin = async (userID, userName) => {
    return ZegoUIKitPrebuiltCallService.init(
      678662769,
      'a88556743e933ecfa883c17d34de63633098a9ee8acb7e4ea5544b5504268707',
      userID,
      userName,
      [ZIM, ZPNs],
      {
        ringtoneConfig: {
          incomingCallFileName: 'zego_incoming.mp3',
          outgoingCallFileName: 'zego_outgoing.mp3',
        },
        notifyWhenAppRunningInBackgroundOrQuit: true,
        androidNotificationConfig: {
          channelId: 'zego_video_call',
          channelName: 'zego_video_call',
        },
        avatarBuilder: ({userInfo}) => {
          return (
            <View style={{width: '100%', height: '100%'}}>
              <Image
                style={{width: '100%', height: '100%'}}
                resizeMode="cover"
                source={{uri: `https://robohash.org/${userInfo.userID}.png`}}
              />
            </View>
          );
        },
        requireConfig: data => {
          return {
            timingConfig: {
              isDurationVisible: true,
              onDurationUpdate: duration => {
                console.log(
                  '########CallWithInvitation onDurationUpdate',
                  duration,
                );
                if (duration === 10 * 60) {
                  ZegoUIKitPrebuiltCallService.hangUp();
                }
              },
            },

            hangUpConfirmInfo: {
              title: 'Hangup confirm',
              message: 'Do you want to hangup?',
              cancelButtonName: 'Cancel',
              confirmButtonName: 'Confirm',
            },

            topMenuBarConfig: {
              buttons: [ZegoMenuBarButtonName.minimizingButton],
            },
            onWindowMinimized: () => {
              console.log('[Demo]CallInvitation onWindowMinimized');
              navigation.navigate('Waitlist');
            },
            onWindowMaximized: () => {
              console.log('[Demo]CallInvitation onWindowMaximized');
              navigation.navigate('ZegoUIKitPrebuiltCallInCallScreen');
            },
          };
        },
      },
    );
  };

  useEffect(() => {
    // Simulated auto login if there is login info cache
    // getUserInfo().then(info => {
    //   if (info) {
    //     setUserID(info.userID);
    //   } else {
    //     // Back to the login screen if not login before
    //     navigation.navigate('Waitlist');
    //   }
    // });

    onUserLogin('123456', 'nfo.userName');
  }, []);

  const onJoinPress = (userID, userName) => {
    navigation.navigate('CallPage', {
      userID: userID,
      userName: userName,
    });
  };
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.boxContainer}>
        <View style={[styles.flexBox, {gap: 10}]}>
          <View style={styles.headerContainer}>
            <Text style={[styles.title, {color: '#fff'}]}>A</Text>
          </View>
          <View>
            <Text style={styles.title}>{item.name}</Text>
            <Text
              style={[
                styles.title,
                {color: 'grey', fontSize: 12, paddingTop: 3},
              ]}>
              ID - {item.uid}
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
            <Text style={styles.title2}>Token No - {item.token}</Text>
            <Text style={styles.title2}>Status - {item.status}</Text>
          </View>
          <View
            style={{
              width: '50%',
              marginLeft: 25,
            }}>
            <Text style={styles.title2}>Duration - {item.duration}</Text>
            <Text style={styles.title2}>Date - {item.date}</Text>
            <Text style={styles.title2}>Time - {item.time}</Text>
          </View>
        </View>
        <View style={{alignItems: 'center', marginTop: 20}}>
          <ZegoSendCallInvitationButton
            invitees={[{userID: '65e88', userName: 'Amanjeet'}]}
            isVideoCall={false}
            text={'Call'}
            width={200}
            height={50}
            textColor={'#DA1818'}
            backgroundColor={'#CFAAAA'}
            borderRadius={5}
            borderWidth={2}
            borderColor={'#0E0E0E'}
            fontSize={16}
            resourceID={'zego_data'}
          />
          {/* <TouchableOpacity
            style={styles.button}
            onPress={() => {
              onJoinPress(item.name, item.uid);
            }}>
            <Text
              style={[
                styles.title,
                {color: '#fff', textTransform: 'uppercase', fontSize: 14},
              ]}>
              start Session
            </Text>
          </TouchableOpacity> */}
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
                data={waitlist}
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
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: COLORS.borderColor,
  },
});
