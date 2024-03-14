/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import images from '../../constant/images';
import {SIZES} from '../../constant/theme';
import HeaderSection from '../../components/HeaderSection';
import FeaturesSection from '../../components/FeaturesSection';
import StatusSection from '../../components/StatusSection';
import RatingSection from '../../components/RatingSection';
import IncomeSection from '../../components/IncomeSection';
import UserIdSection from '../../components/UserIdSection';

const DashboardScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#f7f1e1'} barStyle={'dark-content'} />
      <ImageBackground
        source={images.mobile}
        style={{width: SIZES.width, height: SIZES.height, flex: 1}}
        imageStyle={{resizeMode: 'stretch'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.mainContainer}>
            <View>
              <HeaderSection />
            </View>
            <View>
              <UserIdSection />
            </View>
            <View>
              <FeaturesSection />
            </View>
            <View>
              <StatusSection />
            </View>
            <View>
              <RatingSection />
            </View>
            <View>
              <IncomeSection />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    paddingHorizontal: SIZES.width * 0.051,
  },
});
