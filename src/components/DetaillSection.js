/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../constant/theme';
import {report} from '../constant/data';
import Icon from 'react-native-vector-icons/Feather';

const DetailSection = () => {
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleItem = index => {
    setExpandedItem(expandedItem === index ? null : index);
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
              <Text style={styles.title}>Name - {item.name}</Text>
              <Text style={[styles.title, {fontSize: 14}]}>
                Amount - {item.Amount}
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
              {item.details.map(detail => (
                <View
                  key={detail.id}
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginTop: 10,
                  }}>
                  <Text style={styles.title}>{detail.title}:</Text>
                  <Text style={styles.value}>{detail.value}:</Text>
                </View>
              ))}
            </>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={report}
        renderItem={renderItem}
        scrollEnabled={false}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{marginBottom: 50}}
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
