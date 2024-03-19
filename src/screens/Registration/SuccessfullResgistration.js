import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import images from '../../constant/images';
import {SIZES} from '../../constant/theme';

const SuccessfullResgistration = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      <View style={styles.mainContainer}>
        <Image
          source={images.resgistrationsuccess}
          style={{width: '100%', height: 400, resizeMode: 'contain'}}
        />
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Text style={{fontSize: 18, color: '#000', fontWeight: '600'}}>
            REGISTRATION SUCCESSFUL
          </Text>
          <Text style={{color: 'grey'}}>
            We will shortly inform your status on your email
          </Text>
        </View>
        <View style={styles.button_position}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigation.navigate('LoginScreen')}>
            <Text
              style={[
                styles.title,
                {fontWeight: '600', fontSize: SIZES.width * 0.041},
              ]}>
              BACK TO LOGIN
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SuccessfullResgistration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainContainer: {
    paddingHorizontal: 20,
  },
  buttonContainer: {
    height: SIZES.width * 0.13,
    marginTop: SIZES.width * 0.051,
    backgroundColor: '#FFB443',
    borderRadius: SIZES.width * 0.01,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.width * 0.05,
  },
  button_position: {
    position: 'relative',
    marginTop: 50,
  },
});
