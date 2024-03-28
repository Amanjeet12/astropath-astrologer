/* eslint-disable react/self-closing-comp */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, SIZES} from '../constant/theme';
import Icon from 'react-native-vector-icons/Feather';

const DetailSection = ({data}) => {
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleItem = index => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  const fetchDuration = (start, end) => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const durationInSeconds = (endTime - startTime) / 1000;
    const minutes = Math.floor(durationInSeconds / 60);
    if (isNaN(minutes)) {
      return 0;
    }
    return minutes;
  };

  const renderItem = ({item, index}) => {
    const isExpanded = expandedItem === index;

    return (
      <TouchableOpacity onPress={() => toggleItem(index)}>
        <View style={styles.boxContainer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={styles.title}>Name - {item.customerName}</Text>
              <Text style={[styles.title, {fontSize: 14}]}>
                Amount - {item.cost}
              </Text>
            </View>

            <View>
              {isExpanded ? (
                <Icon name={'chevron-up'} size={20} color={'#000'} />
              ) : (
                <Icon name={'chevron-down'} size={20} color={'#000'} />
              )}
            </View>
          </View>

          {isExpanded && (
            <>
              <View style={styles.border} />
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  marginTop: 10,
                }}>
                <Text style={styles.title}>Service:</Text>
                <Text style={styles.value}>{item.service}</Text>
              </View>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  marginTop: 10,
                }}>
                <Text style={styles.title}>Status:</Text>
                <Text style={styles.value}>{item.status}</Text>
              </View>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  marginTop: 10,
                }}>
                <Text style={styles.title}>Duration:</Text>
                <Text style={styles.value}>
                  {fetchDuration(item.startTime, item.endTime)} min
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  marginTop: 10,
                }}>
                <Text style={styles.title}>OrderID:</Text>
                <Text style={styles.value}>{item._id}</Text>
              </View>
            </>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={data}
        renderItem={renderItem}
        scrollEnabled={false}
        keyExtractor={item => item._id.toString()}
        contentContainerStyle={{marginBottom: 50}}
        ListEmptyComponent={() => (
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text style={{color: '#000'}}>Empty Data</Text>
          </View>
        )}
      />
    </View>
  );
};

export default DetailSection;

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  value: {
    fontSize: 14,
    color: 'grey',
    fontWeight: '400',
    textTransform: 'capitalize',
  },
  boxContainer: {
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    marginTop: 10,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  border: {
    width: '100%',
    height: 1,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    marginTop: 10,
  },
});
