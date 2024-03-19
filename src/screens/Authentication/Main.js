// Main.js
import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import AuthNavigator from './AuthNavigater';
import AppNavigator from './AppNavigator';
import {useAuth} from '../../constant/Auth';
import Splashscreen from '../onboarding/SplashScreen';
import {useSelector} from 'react-redux';

const Main = () => {
  const {islogin} = useSelector(state => state.verifyotp);

  return <>{islogin ? <AppNavigator /> : <AuthNavigator />}</>;
};

export default Main;
