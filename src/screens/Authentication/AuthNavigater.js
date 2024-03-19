import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingScreen from '../onboarding/OnboardingScreen';
import OtpScreen from '../Login/OtpScreen';
import CallPage from '../BottomSheetScreen/CallPage';
import SignUpScreen from '../Registration/SignUpScreen';
import SuccessfullResgistration from '../Registration/SuccessfullResgistration';
import Splashscreen from '../onboarding/SplashScreen';
import LoginScreen from '../Login/LoginScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  const [firstLaunch, setFirstLaunch] = useState(null);
  useEffect(() => {
    async function setData() {
      const appData = await AsyncStorage.getItem('appLaunched');
      if (appData == null) {
        setFirstLaunch(true);
        AsyncStorage.setItem('appLaunched', 'false');
      } else {
        setFirstLaunch(false);
      }
    }
    setData();
  }, []);

  return (
    firstLaunch != null && (
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
                duration: 400,
              },
            },
            close: {
              animation: 'timing',
              config: {
                duration: 400,
              },
            },
          },
        }}>
        {firstLaunch && (
          <Stack.Screen
            name="OnboardingScreen"
            component={OnboardingScreen}
            options={{headerShown: false}}
          />
        )}

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
        <Stack.Screen
          options={{headerShown: false}}
          name="CallPage"
          component={CallPage}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="SignUpScreen"
          component={SignUpScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="SuccessfullResgistration"
          component={SuccessfullResgistration}
        />
      </Stack.Navigator>
    )
  );
};

export default AuthNavigator;
