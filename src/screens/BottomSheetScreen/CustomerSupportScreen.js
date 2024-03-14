/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
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
import BackButton from '../../components/BackButton';
import HeaderSection from '../../components/HeaderSection';
import {COLORS, SIZES} from '../../constant/theme';
import images from '../../constant/images';
import CustomeTextInput from '../../components/CustomeTextInput';
import Icon from 'react-native-vector-icons/AntDesign';
import {TextInput} from 'react-native-gesture-handler';
import {question} from '../../constant/data';
import Add from 'react-native-vector-icons/AntDesign';

const CustomerSupportScreen = () => {
  const [selectedQuestionIndex, setSelectedQuestionIndex] =
    React.useState(null);

  const renderItem = ({item, index}) => {
    const isQuestionSelected = index === selectedQuestionIndex;
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedQuestionIndex(isQuestionSelected ? null : index);
        }}
        style={{
          marginTop: 20,
          marginHorizontal: 20,
          backgroundColor: '#fff',
          paddingVertical: 20,
          paddingLeft: 10,
          borderRadius: 5,
          borderColor: COLORS.borderColor,
          borderWidth: 1,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: '#000', width: '85%', fontSize: 16}}>
            {item.question}
          </Text>
          {isQuestionSelected ? (
            <TouchableOpacity>
              <Add name={'close'} color={'#FFB443'} size={20} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity>
              <Add name={'plus'} color={'#FFB443'} size={20} />
            </TouchableOpacity>
          )}
        </View>

        {isQuestionSelected && (
          <Text
            style={{color: 'grey', width: '85%', fontSize: 12, paddingTop: 20}}>
            {item.answer}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

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
              <BackButton placeholder={'Customer Support'} />
            </View>
            <View style={{marginTop: 40}}>
              <Text style={{color: '#000', marginBottom: 5}}>Name *</Text>
              <CustomeTextInput placeholder={'Enter name'} />
            </View>
            <View style={{marginTop: 10}}>
              <Text style={{color: '#000', marginBottom: 5}}>Email *</Text>
              <CustomeTextInput placeholder={'Enter email'} />
            </View>
            <View style={{marginTop: 10}}>
              <Text style={{color: '#000', marginBottom: 5}}>
                Upload Screenshot *
              </Text>
              <View style={[styles.flex, {paddingTop: 10, gap: 10}]}>
                <Image
                  source={images.upload}
                  style={{width: 50, height: 50, resizeMode: 'contain'}}
                />
                <TouchableOpacity
                  style={[
                    styles.flex,

                    {
                      width: 150,
                      height: 50,
                      borderWidth: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 5,
                      borderRadius: 5,
                      backgroundColor: '#fff',
                    },
                  ]}>
                  <Icon name={'upload'} size={20} color={'#000'} />
                  <Text style={{color: '#000'}}>Upload Image</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginTop: 15}}>
              <Text style={{color: '#000', marginBottom: 5}}>Message *</Text>
              <View style={styles.mainContainer2}>
                <TextInput
                  placeholder={'Write Message'}
                  style={{
                    color: COLORS.black,
                    width: '100%',
                    // height: SIZES.width * 0.35,
                  }}
                  keyboardType="default"
                  multiline={true}
                />
              </View>
            </View>
            <TouchableOpacity style={styles.button}>
              <Text style={{color: '#fff'}}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderWidth: 1,
              marginTop: 50,
              marginHorizontal: 20,
              borderColor: COLORS.borderColor,
            }}
          />
          <View>
            <FlatList
              data={question}
              renderItem={renderItem}
              scrollEnabled={false}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={{marginBottom: 50}}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default CustomerSupportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    marginHorizontal: SIZES.width * 0.051,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainContainer2: {
    height: SIZES.width * 0.4,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    marginBottom: 3,
    borderColor: COLORS.borderColor,
    borderWidth: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 10,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFB443',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});
