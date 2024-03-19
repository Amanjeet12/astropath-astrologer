/* eslint-disable react/no-unstable-nested-components */
import React, {useRef} from 'react';

import {StyleSheet, View, Text, Button, Image} from 'react-native';
import ZegoUIKitPrebuiltCallService, {
  ZegoUIKitPrebuiltCall,
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
  ONE_ON_ONE_VOICE_CALL_CONFIG,
  ZegoMenuBarButtonName,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import {useNavigation} from '@react-navigation/native';

export default function CallPage(props) {
  const navigation = useNavigation();
  const prebuiltRef = useRef();
  const {route} = props;
  const {params} = route;
  const {userID, userName} = params;

  return (
    <View style={styles.container}>
      <ZegoUIKitPrebuiltCall
        ref={prebuiltRef}
        appID={678662769}
        appSign={
          'a88556743e933ecfa883c17d34de63633098a9ee8acb7e4ea5544b5504268707'
        }
        userID={userID}
        userName={userName}
        callID="rn12345678"
        token={
          '04AAAAAGXxXJcAEGgzNGZ1MzF0MXRxOGhmMHAAcO8iR5JHdHW7xa5791EIpdrGj4G93BKbHoZJhaYBVMyAQqM+zZW2OJFuAWI0wJltWmab1RPznV/FKXtZxxOgiTp9HAU+zyvt0TH4E4Js/4+NrMiASo7owESPzNlOlmDiB1NpwngyI9XI5v/yTxCctEg='
        }
        config={{
          ...ONE_ON_ONE_VOICE_CALL_CONFIG,
          // ...ONE_ON_ONE_VIDEO_CALL_CONFIG,

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
          onHangUp: () => {
            console.log('########CallPage onHangUp');
            navigation.navigate('Waitlist');
          },
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
          topMenuBarConfig: {
            buttons: [ZegoMenuBarButtonName.minimizingButton],
          },
          onWindowMinimized: () => {
            console.log('[Demo]CallPage onWindowMinimized');
            navigation.navigate('Waitlist');
          },
          onWindowMaximized: () => {
            console.log('[Demo]CallPage onWindowMaximized');
            navigation.navigate('CallPage', {
              userID: userID,
              userName: userName,
              callID: 'rn12345678',
            });
          },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
});
