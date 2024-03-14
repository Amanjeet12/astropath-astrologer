/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import {FlatList, Image, StyleSheet, Switch, Text, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, SIZES} from '../constant/theme';
import Icon from 'react-native-vector-icons/Entypo';
import images from '../constant/images';

const StatusSection = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [callEnabled, setCallEnabled] = useState(false);
  const [chatEnabled, setChatEnabled] = useState(false);
  const [vcEnabled, setVcEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const toggleCall = () => setCallEnabled(previousState => !previousState);

  const toggleChat = () => setChatEnabled(previousState => !previousState);

  const toggleVC = () => setVcEnabled(previousState => !previousState);

  const data = [
    {
      id: 1,
      image: images.call,
      title: 'Call',
      enabled: callEnabled,
      toggle: toggleCall,
    },
    {
      id: 2,
      image: images.chat,
      title: 'Chat',
      enabled: chatEnabled,
      toggle: toggleChat,
    },
    {
      id: 3,
      image: images.video,
      title: 'VC',
      enabled: vcEnabled,
      toggle: toggleVC,
    },
  ];

  const renderItem = ({item, index}) => {
    const isLastItem = index === data.length - 1;

    return (
      <>
        <View>
          <View style={{alignItems: 'center'}}>
            <View style={[styles.flexBox, {gap: 5}]}>
              <Image
                source={item.image}
                style={{width: 50, height: 50, resizeMode: 'contain'}}
              />
              <Text style={{color: '#000'}}>{item.title}</Text>
            </View>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={item.enabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={item.toggle}
              value={item.enabled}
            />
          </View>
        </View>
        {!isLastItem && (
          <View
            style={{
              borderWidth: 1,
              height: '100%',
              marginLeft: 20,
              borderColor: COLORS.borderColor,
            }}
          />
        )}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.flexBox}>
        <View style={styles.flexBox}>
          <Text style={{fontSize: 16, color: '#000'}}>Active Status</Text>
          <View
            style={[
              styles.flexBox,
              styles.statusContainer,
              {backgroundColor: isEnabled ? '#dcffe5' : '#f2f2f2'},
            ]}>
            <Icon
              name={'dot-single'}
              size={10}
              color={isEnabled ? 'green' : 'black'}
            />
            <Text style={{fontSize: 10, color: isEnabled ? '#409261' : '#000'}}>
              {isEnabled ? 'Online' : 'Offline'}
            </Text>
          </View>
        </View>
        <View>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
      <View style={styles.border} />
      <View style={{marginTop: 10}}>
        <Text style={{fontSize: 12, color: COLORS.borderColor}}>
          Availability status in -
        </Text>
      </View>
      <View>
        <FlatList
          scrollEnabled={false}
          horizontal
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 15,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    borderWidth: 1,
    height: 200,
    borderColor: COLORS.borderColor,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 16,
  },
  flexBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusContainer: {
    marginLeft: 10,
    paddingHorizontal: 15,
    borderRadius: 12,
    paddingVertical: 4,
  },
  border: {
    borderWidth: 1,
    borderColor: '#F39200',
    marginTop: 15,
  },
});

export default StatusSection;
