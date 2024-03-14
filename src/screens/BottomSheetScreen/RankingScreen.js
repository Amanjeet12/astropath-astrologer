/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import BackButton from '../../components/BackButton';
import HeaderSection from '../../components/HeaderSection';
import {COLORS, SIZES} from '../../constant/theme';
import images from '../../constant/images';
import {useNavigation} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';

const RankingScreen = () => {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('Week');
  const [items, setItems] = useState([
    {label: 'Week', value: 'Week'},
    {label: 'Month', value: 'Month'},
    {label: 'Year', value: 'Year'},
  ]);
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
              <BackButton placeholder={'Weekly Ranking'} />
            </View>
            <View>
              <View style={styles.mainContainer2}>
                <View style={styles.flexBox}>
                  <View>
                    <Text style={{fontSize: 18, color: '#000'}}>
                      Current Week Ranking
                    </Text>
                  </View>
                  <View>
                    <DropDownPicker
                      open={open}
                      value={value}
                      items={items}
                      setOpen={setOpen}
                      setValue={setValue}
                      setItems={setItems}
                      placeholder={'Week'}
                      style={{
                        width: 100,
                        borderRadius: 5,
                        borderColor: '#7D3807',
                      }}
                      listMode="SCROLLVIEW"
                    />
                  </View>
                </View>
                <View
                  style={[
                    styles.flexBox,
                    {marginTop: 10, justifyContent: 'flex-start', gap: 8},
                  ]}>
                  <Text
                    style={{fontSize: 36, fontWeight: '600', color: '#7D3807'}}>
                    565
                  </Text>
                  <Icon name="chevrons-up" color={'green'} size={15} />
                  <Text style={{fontSize: 16, color: 'green'}}>
                    +66 from past week
                  </Text>
                </View>
                <View
                  style={[
                    styles.flexBox,
                    {marginTop: 5, justifyContent: 'flex-start', gap: 10},
                  ]}>
                  <Text style={{fontSize: 14, color: '#000'}}>
                    Total earing this week
                  </Text>
                  <Text style={{fontSize: 14, color: '#7D3807'}}>- ₹54.22</Text>
                </View>
              </View>
            </View>
            <View style={{marginBottom: 50}}>
              <Image
                source={images.table}
                style={{width: '100%', height: 500, resizeMode: 'stretch'}}
              />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default RankingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    marginHorizontal: SIZES.width * 0.051,
  },
  mainContainer2: {
    marginTop: SIZES.width * 0.051,
    height: 200,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    borderRadius: 10,
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 50,
  },
  flexBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
