import 'react-native-gesture-handler';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabScreen from './src/screens/BottomSheetScreen/BottomTabScreen';
import {NavigationContainer} from '@react-navigation/native';
import CallScreen from './src/screens/BottomSheetScreen/FeaturesScreen,js/CallScreen';
import ChatScreen from './src/screens/BottomSheetScreen/FeaturesScreen,js/ChatScreen';
import VideoScreen from './src/screens/BottomSheetScreen/FeaturesScreen,js/VideoScreen';
import ReportScreen from './src/screens/BottomSheetScreen/FeaturesScreen,js/ReportScreen';
import Waitlist from './src/screens/BottomSheetScreen/FeaturesScreen,js/WaitlistScreen';
import ReviewSceen from './src/screens/BottomSheetScreen/FeaturesScreen,js/ReviewScreen';
import OffersScreen from './src/screens/BottomSheetScreen/FeaturesScreen,js/OffersScreen';
import NoticeBoardScreen from './src/screens/BottomSheetScreen/NoticeBoardScreen';
import RankingScreen from './src/screens/BottomSheetScreen/RankingScreen';
import CustomerSupportScreen from './src/screens/BottomSheetScreen/CustomerSupportScreen';
import Splashscreen from './src/screens/onboarding/SplashScreen';
import OnboardingScreen from './src/screens/onboarding/OnboardingScreen';
import LoginScreen from './src/screens/Login/LoginScreen';
import OtpScreen from './src/screens/Login/OtpScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
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
          // cardStyleInterpolator: ({current, next, layouts}) => {
          //   return {
          //     cardStyle: {
          //       transform: [
          //         {
          //           translateX: current.progress.interpolate({
          //             inputRange: [0, 1],
          //             outputRange: [layouts.screen.width, 0],
          //           }),
          //         },
          //         {
          //           translateX: next
          //             ? next.progress.interpolate({
          //                 inputRange: [0, 1],
          //                 outputRange: [0, -layouts.screen.width],
          //               })
          //             : 0,
          //         },
          //       ],
          //     },
          //     overflow: 'visible',
          //   };
          // },
        }}>
        <Stack.Screen
          options={{headerShown: false}}
          name="Splashscreen"
          component={Splashscreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="OnboardingScreen"
          component={OnboardingScreen}
        />
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
          name="LoginScreen"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="OtpScreen"
          component={OtpScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
