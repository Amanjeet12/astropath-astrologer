import 'react-native-gesture-handler';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {
  ZegoCallInvitationDialog,
  ZegoUIKitPrebuiltCallFloatingMinimizedView,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import Main from './src/screens/Authentication/Main';
import {AuthProvider} from './src/constant/Auth';

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <ZegoCallInvitationDialog />
        <Main />
        <ZegoUIKitPrebuiltCallFloatingMinimizedView />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
