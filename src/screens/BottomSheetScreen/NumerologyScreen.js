/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SIZES} from '../../constant/theme';
import HeaderSection from '../../components/HeaderSection';
import {ScrollView} from 'react-native-gesture-handler';
import TableComponent from '../../components/TableComponent';
import images from '../../constant/images';
import BackButton from '../../components/BackButton';
import {useDispatch} from 'react-redux';
import {fetchNumerology} from '../../redux/features/LalKitabKundaliSlice';

const NumerologyScreen = ({route}) => {
  const dispatch = useDispatch();
  const {name, day, month, year, hour, min, lat, lon, token} = route.params;
  const [nero, setNero] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!nero) {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = {
        name,
        day: day,
        month: month,
        year: year,
        hour: hour,
        min: min,
        lat,
        lon,
        tzone: '5.5',
      };

      const [nueroReportData] = await Promise.all([
        dispatch(fetchNumerology({params, token: token})),
      ]);

      setNero(nueroReportData?.payload.data);
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <StatusBar backgroundColor={'#f7f1e1'} barStyle={'dark-content'} />
      <ImageBackground
        source={images.mobile_bg}
        style={{width: SIZES.width, height: SIZES.height, flex: 1}}
        imageStyle={{resizeMode: 'stretch'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.mainContainer}>
            <View style={{marginTop: SIZES.width * 0.026}}>
              <HeaderSection />
            </View>
            <View style={{width: SIZES.width * 0.65}}>
              <BackButton placeholder={'Your Numero'} />
            </View>
            <View style={{marginVertical: 30}}>
              {loading && (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <ActivityIndicator size="large" />
                </View>
              )}
              {nero && (
                <>
                  <View style={styles.flexBox}>
                    <Text style={styles.title}>Numero Details</Text>
                  </View>
                  <View style={styles.border} />
                  <View style={{marginTop: SIZES.width * 0.051}}>
                    <TableComponent data={nero} />
                  </View>
                </>
              )}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default NumerologyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    marginHorizontal: SIZES.width * 0.051,
  },
  title: {
    fontSize: SIZES.width * 0.051,
    color: '#171532',
    fontFamily: 'KantumruyPro-Regular',
  },
  flexBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  border: {
    height: 1,
    borderWidth: 0.5,
    borderColor: '#F39200',
    marginTop: SIZES.width * 0.013,
  },
});
