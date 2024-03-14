/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, SIZES} from '../constant/theme';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

const IncomeSection = () => {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('Week');
  const [items, setItems] = useState([
    {label: 'Week', value: 'Week'},
    {label: 'Month', value: 'Month'},
    {label: 'Year', value: 'Year'},
  ]);
  return (
    <View style={styles.mainContainer}>
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
            style={{width: 100, borderRadius: 5, borderColor: '#7D3807'}}
            listMode="SCROLLVIEW"
          />
        </View>
      </View>
      <View
        style={[
          styles.flexBox,
          {marginTop: 10, justifyContent: 'flex-start', gap: 8},
        ]}>
        <Text style={{fontSize: 36, fontWeight: '600', color: '#7D3807'}}>
          565
        </Text>
        <Icon name="chevrons-up" color={'green'} size={15} />
        <Text style={{fontSize: 16, color: 'green'}}>+66 from past week</Text>
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
      <View style={{alignItems: 'flex-end', marginTop: 5}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('RankingScreen')}
          style={{
            paddingHorizontal: 15,
            paddingVertical: 8,
            borderRadius: 5,
            backgroundColor: COLORS.borderColor,
          }}>
          <Text style={{color: '#fff', fontSize: 12}}>View More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default IncomeSection;

const styles = StyleSheet.create({
  mainContainer: {
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
