import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CustomerSupportScreen from '../BottomSheetScreen/CustomerSupportScreen';
import RankingScreen from '../BottomSheetScreen/RankingScreen';
import NoticeBoardScreen from '../BottomSheetScreen/NoticeBoardScreen';
import OffersScreen from '../BottomSheetScreen/FeaturesScreens/OffersScreen';
import ReviewSceen from '../BottomSheetScreen/FeaturesScreens/ReviewScreen';
import Waitlist from '../BottomSheetScreen/FeaturesScreens/WaitlistScreen';
import ReportScreen from '../BottomSheetScreen/FeaturesScreens/ReportScreen';
import VideoScreen from '../BottomSheetScreen/FeaturesScreens/VideoScreen';
import ChatScreen from '../BottomSheetScreen/FeaturesScreens/ChatScreen';
import CallScreen from '../BottomSheetScreen/FeaturesScreens/CallScreen';
import AdvancePanchangScreen from '../BottomSheetScreen/FeaturesScreens/AdvancePanchangScreen';
import BottomTabScreen from '../BottomSheetScreen/BottomTabScreen';
import {
  ZegoUIKitPrebuiltCallWaitingScreen,
  ZegoUIKitPrebuiltCallInCallScreen,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import SingleKundaliForm from '../BottomSheetScreen/SingleKundaliForm';
import SearchPlaceScreen from '../BottomSheetScreen/SearchPlaceScreen';
import SingleKundli from '../BottomSheetScreen/SingleKundli';
import NumerologyFormScreen from '../BottomSheetScreen/NumerologyFormScreen';
import NumerologyScreen from '../BottomSheetScreen/NumerologyScreen';
import MarraigeScreenForm from '../BottomSheetScreen/MarraigeScreenForm';
import MarraigeKundli from '../BottomSheetScreen/MarraigeKundli';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'push',
        gestureEnabled: false,
        gestureDirection: 'horizontal',
        transitionSpec: {
          open: {
            animation: 'timing',
            config: {
              duration: 100,
            },
          },
          close: {
            animation: 'timing',
            config: {
              duration: 100,
            },
          },
        },
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name="BottomTabScreen"
        component={BottomTabScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="CallScreen"
        component={CallScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ChatScreen"
        component={ChatScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="VideoScreen"
        component={VideoScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ReportScreen"
        component={ReportScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Waitlist"
        component={Waitlist}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ReviewSceen"
        component={ReviewSceen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="OffersScreen"
        component={OffersScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="NoticeBoardScreen"
        component={NoticeBoardScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="RankingScreen"
        component={RankingScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="CustomerSupportScreen"
        component={CustomerSupportScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="AdvancePanchangScreen"
        component={AdvancePanchangScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="SingleKundaliForm"
        component={SingleKundaliForm}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="SearchPlaceScreen"
        component={SearchPlaceScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="SingleKundli"
        component={SingleKundli}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="NumerologyFormScreen"
        component={NumerologyFormScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="NumerologyScreen"
        component={NumerologyScreen}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name="MarraigeScreenForm"
        component={MarraigeScreenForm}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name="MarraigeKundli"
        component={MarraigeKundli}
      />

      <Stack.Screen
        options={{headerShown: false}}
        // DO NOT change the name
        name="ZegoUIKitPrebuiltCallWaitingScreen"
        component={ZegoUIKitPrebuiltCallWaitingScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        // DO NOT change the name
        name="ZegoUIKitPrebuiltCallInCallScreen"
        component={ZegoUIKitPrebuiltCallInCallScreen}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
