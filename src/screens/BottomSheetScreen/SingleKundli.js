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
import React, {useEffect, useState} from 'react';
import {COLORS, SIZES} from '../../constant/theme';
import HeaderSection from '../../components/HeaderSection';
import ChartsSection from '../../components/ChartsSection';
import AshtakvargaSSection from '../../components/AshtakvargaSSection';
import DashaSection from '../../components/DashaSection';
import BasicSection from '../../components/BasicSection';
import LalKitab from '../../components/LalKitab';
import images from '../../constant/images';
import BackButton from '../../components/BackButton';
import {useDispatch, useSelector} from 'react-redux';
import {astro, manglik, panchang} from '../../redux/features/BasicKundaliSlice';
import {
  fetchCurrentDasha,
  fetchMajorvDasha,
  fetchPlanet,
} from '../../redux/features/DashaKundaliSlice';
import {
  fetchLalKitab,
  fetchLalKitabPlanet,
} from '../../redux/features/LalKitabKundaliSlice';
import WebUrls from '../../api/WebUrl';

const SingleKundli = ({route}) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState('Basic');
  const [panchangData, setPanchangData] = useState(null);
  const [astroDetail, setAstroDetail] = useState(null);
  const [manglik_report, setManglik_report] = useState(null);
  const [basic_render, setBasic_render] = useState(true);
  const [basic_loading, setBasic_loading] = useState(false);
  const [dasha, setDasha] = useState('');
  const [dasha_render, setDasha_render] = useState(true);
  const [dasha_loading, setDasha_loading] = useState(false);
  const [planet, setPlanet] = useState('');
  const [planet_render, setPlanet_render] = useState(true);
  const [planet_loading, setPlanet_loading] = useState(false);
  const [chart_loading, setChart_loading] = useState(false);
  const [current_dasha, setCurrent_dasha] = useState('');
  const [lalkitab, setLalkitab] = useState('');
  const [lalkitab_loading, setLalkitab_loading] = useState(false);
  const [lalkitab_story, setLalkitab_story] = useState('');
  const [birth_chart, setBirthChart] = useState('');
  const [Chathurthamasha_Chart, setChathurthamasha_Chart] = useState('');
  const [Panchmansha_Chart, setPanchmansha_Chart] = useState('');
  const [Chalit_Chart, setChalit_Chart] = useState('');
  const routesToFetch = ['birth_chart', 'another_route', 'third', 'chalit'];

  const handleSelecter = option => {
    if (option === 'Basic' && !astroDetail) {
      fetchData();
      setBasic_render(false);
    }
    if (option === 'Dasha' && dasha_render) {
      fetchDashaData();
      setDasha_render(false);
    }
    if (option === 'KP' && planet_render) {
      fetchKPData();
      setPlanet_render(false);
    }
    if (option === 'Charts') {
      fetchAndSaveChartData(routesToFetch);
    }
    if (option === 'LK' && !lalkitab) {
      fetchLKData();
    }
    setSelected(option);
  };

  useEffect(() => {
    if (basic_render) {
      fetchData();
      setBasic_render(false);
    }
  }, []);

  const {name, day, month, year, hour, min, lat, lon, token} = route.params;

  const fetchData = async () => {
    setBasic_loading(true);
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
      const [firstResponse, secondResponse, thirdResponse] = await Promise.all([
        dispatch(astro({params, token: token})),
        dispatch(panchang({params, token: token})),
        dispatch(manglik({params, token: token})),
      ]);
      console.log(firstResponse.payload.data);
      setAstroDetail(firstResponse.payload.data);
      setPanchangData(secondResponse.payload.data);
      setManglik_report(thirdResponse.payload.data);
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setBasic_loading(false);
    }
  };

  const fetchDashaData = async () => {
    setDasha_loading(true);
    try {
      const params = {
        name,
        day: day,
        month: month,
        year: year,
        hour: hour,
        min: min,
        lat: lat,
        lon: lon,
        tzone: '5.5',
      };
      const [currentDashaData, dashaData] = await Promise.all([
        dispatch(fetchCurrentDasha({params, token: token})),
        dispatch(fetchMajorvDasha({params, token: token})),
      ]);

      console.log(currentDashaData.payload.data);

      setCurrent_dasha(currentDashaData.payload.data);
      setDasha(dashaData.payload.data);
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setDasha_loading(false);
    }
  };

  const fetchKPData = async () => {
    setPlanet_loading(true);
    try {
      const params = {
        name,
        day: day,
        month: month,
        year: year,
        hour: hour,
        min: min,
        lat: lat,
        lon: lon,
        tzone: '5.5',
      };

      const [planetData] = await Promise.all([
        dispatch(fetchPlanet({params, token: token})),
      ]);

      setPlanet(planetData.payload.data);
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setPlanet_loading(false);
    }
  };
  const fetchLKData = async () => {
    setLalkitab_loading(true);
    try {
      const params = {
        name,
        day: day,
        month: month,
        year: year,
        hour: hour,
        min: min,
        lat: lat,
        lon: lon,
        tzone: '5.5',
      };

      const [lalkitabPlanet, lalKitabStory] = await Promise.all([
        dispatch(fetchLalKitabPlanet({params, token: token})),
        dispatch(fetchLalKitab({params, token: token})),
      ]);

      setLalkitab(lalkitabPlanet.payload);
      setLalkitab_story(lalKitabStory.payload.data);
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setLalkitab_loading(false);
    }
  };
  const fetchAndSaveChartData = async routeNames => {
    setChart_loading(true);
    try {
      if (token) {
        const params = {
          name,
          day: day,
          month: month,
          year: year,
          hour: hour,
          min: min,
          lat: lat,
          lon: lon,
          tzone: '5.5',
        };

        for (let i = 0; i < routeNames.length; i++) {
          let url;
          switch (routeNames[i]) {
            case 'birth_chart':
              url = WebUrls.url.LOcal_URL + WebUrls.url.birth_chart;
              console.log('1');
              break;
            case 'another_route':
              url = WebUrls.url.LOcal_URL + WebUrls.url.Chathurthamasha_Chart;
              console.log('2');
              break;
            case 'chalit':
              url = WebUrls.url.LOcal_URL + WebUrls.url.Navamansha_Chart;
              console.log('3');
              break;
            // Add more cases for other routes as needed
            default:
              url = WebUrls.url.LOcal_URL + WebUrls.url.Panchmansha_Chart;
              console.log('4');
              break;
          }

          fetch(url, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(params),
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.blob();
            })
            .then(blob => {
              const reader = new FileReader();
              reader.onloadend = () => {
                const base64data = reader.result;
                switch (routeNames[i]) {
                  case 'birth_chart':
                    setBirthChart(base64data);
                    console.log('1');
                    break;
                  case 'another_route':
                    setChathurthamasha_Chart(base64data);
                    console.log('2');
                    break;
                  case 'chalit':
                    setChalit_Chart(base64data);
                    console.log('3');
                    break;
                  default:
                    setPanchmansha_Chart(base64data);
                    console.log('4');
                    break;
                }
              };
              reader.readAsDataURL(blob);
            })
            .catch(error => {
              console.log('error', error);
            });
        }
      } else {
        console.log('Token is null');
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setChart_loading(false);
    }
  };

  const components = {
    Basic: (
      <BasicSection
        panchang={panchangData}
        manglik_report={manglik_report}
        astroDetail={astroDetail}
        loading={basic_loading}
      />
    ),
    Charts: (
      <ChartsSection
        birth_chart={birth_chart}
        Panchmansha_Chart={Panchmansha_Chart}
        Chathurthamasha_Chart={Chathurthamasha_Chart}
        Chalit_Chart={Chalit_Chart}
        loading={chart_loading}
      />
    ),
    KP: <AshtakvargaSSection planet={planet} loading={planet_loading} />,
    Dasha: (
      <DashaSection
        dasha={dasha}
        loading={dasha_loading}
        current_dasha={current_dasha}
      />
    ),
    LK: (
      <LalKitab
        lalkitab={lalkitab}
        loading={lalkitab_loading}
        lalkitabStory={lalkitab_story}
      />
    ),
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
              <BackButton placeholder={'Your Kundli'} />
            </View>
            <View style={styles.boxContainer}>
              <TouchableOpacity
                style={[
                  styles.singleContainer,
                  {
                    backgroundColor: selected === 'Basic' ? '#F39200' : '#fff',
                  },
                ]}
                onPress={() => handleSelecter('Basic')}>
                <Text
                  style={{
                    color: selected === 'Basic' ? '#fff' : '#000',
                    fontSize: SIZES.width * 0.031,
                  }}>
                  Basic
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.singleContainer,
                  {
                    backgroundColor: selected === 'KP' ? '#F39200' : '#fff',
                  },
                ]}
                onPress={() => handleSelecter('KP')}>
                <Text
                  style={{
                    color: selected === 'KP' ? '#fff' : '#000',
                    fontSize: SIZES.width * 0.031,
                  }}>
                  Planets
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.singleContainer,
                  {
                    backgroundColor: selected === 'Dasha' ? '#F39200' : '#fff',
                  },
                ]}
                onPress={() => handleSelecter('Dasha')}>
                <Text
                  style={{
                    color: selected === 'Dasha' ? '#fff' : '#000',
                    fontSize: SIZES.width * 0.031,
                  }}>
                  Dasha
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.singleContainer,
                  {
                    backgroundColor: selected === 'LK' ? '#F39200' : '#fff',
                  },
                ]}
                onPress={() => handleSelecter('LK')}>
                <Text
                  style={{
                    color: selected === 'LK' ? '#fff' : '#000',
                    fontSize: SIZES.width * 0.031,
                  }}>
                  Lal Kitab
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.singleContainer,
                  {
                    backgroundColor: selected === 'Charts' ? '#F39200' : '#fff',
                  },
                ]}
                onPress={() => handleSelecter('Charts')}>
                <Text
                  style={{
                    color: selected === 'Charts' ? '#fff' : '#000',
                    fontSize: SIZES.width * 0.031,
                  }}>
                  Charts
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: SIZES.width * 0.077}}>
              {components[selected]}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default SingleKundli;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    marginHorizontal: SIZES.width * 0.051,
  },
  boxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: SIZES.width * 0.077,
    backgroundColor: '#fff',
    width: '100%',
    height: SIZES.width * 0.139,
    alignSelf: 'center',
    borderRadius: SIZES.width * 0.077,
    paddingHorizontal: 5,
  },
  singleContainer: {
    paddingHorizontal: SIZES.width * 0.039,
    paddingVertical: SIZES.width * 0.026,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
  },
});
