/* eslint-disable react-native/no-inline-styles */
import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../constant/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Progress from 'react-native-progress';

const RatingSection = () => {
  const data = [
    {
      id: 1,
      star: 5,
      rating: 100,
    },
    {
      id: 2,
      star: 4,
      rating: 80,
    },
    {
      id: 3,
      star: 3,
      rating: 60,
    },
    {
      id: 4,
      star: 2,
      rating: 40,
    },
    {
      id: 5,
      star: 1,
      rating: 20,
    },
  ];

  const renderItem = ({item, index}) => {
    return (
      <View style={[styles.flexBox, {gap: 5}]}>
        <Text style={{fontSize: 16, color: '#000'}}>{item.star}</Text>
        <View>
          <Progress.Bar
            progress={item.rating / 100}
            width={150}
            height={8}
            color="#FFB443"
            unfilledColor="#D9D9D9"
            borderColor="#fff"
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.flexBox}>
        <View
          style={{
            width: '45%',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}>
          <Text style={{fontSize: 18, color: '#000', letterSpacing: 1.5}}>
            Your Rating
          </Text>
          <Text style={{fontSize: 35, color: '#000', fontWeight: '700'}}>
            5/<Text style={{fontSize: 20}}>5 </Text>
          </Text>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Icon name={'star'} size={15} color={'gold'} />
            <Icon name={'star'} size={15} color={'gold'} />
            <Icon name={'star'} size={15} color={'gold'} />
            <Icon name={'star'} size={15} color={'gold'} />
            <Icon name={'star'} size={15} color={'gold'} />
          </View>
          <Text style={{fontSize: 16, color: 'grey', marginTop: 15}}>
            348 Rating
          </Text>
        </View>
        <View>
          <FlatList
            data={data}
            scrollEnabled={false}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default RatingSection;

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: SIZES.width * 0.051,
    height: 200,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    borderRadius: 10,
    padding: 16,
    backgroundColor: '#fff',
  },
  flexBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
