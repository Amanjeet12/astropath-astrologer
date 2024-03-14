/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../constant/theme';
import HeaderSection from '../../components/HeaderSection';
import images from '../../constant/images';
import CustomeDesignNavigation from '../../components/CustomeDesignNavigation';

const AccountScreen = () => {
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
            <View style={{marginBottom: 30}}>
              <Image
                source={images.profile}
                style={{width: 80, height: 80, resizeMode: 'contain'}}
              />
              <Text style={{fontSize: 16, color: '#000', marginTop: 10}}>
                Tanmay Singh
              </Text>
            </View>
            <View>
              <Text style={styles.title}>Account Settings</Text>

              <View style={{marginTop: SIZES.width * 0.026}}>
                <CustomeDesignNavigation
                  title={'terms'}
                  icon={images.terms}
                  screen={'WalletScreen'}
                />
                <CustomeDesignNavigation
                  title={'Customer Support'}
                  icon={images.customer}
                  screen={'CustomerSupportScreen'}
                />
                <CustomeDesignNavigation
                  title={'Privacy Policy'}
                  icon={images.privacy}
                  screen={'privacy'}
                />
                <CustomeDesignNavigation
                  title={'Language'}
                  icon={images.language}
                  screen={'LanguageScreen'}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    marginHorizontal: SIZES.width * 0.051,
  },
  title: {
    fontSize: SIZES.width * 0.051,
    color: COLORS.black,
  },
});
