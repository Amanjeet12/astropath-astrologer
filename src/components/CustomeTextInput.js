import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../constant/theme';

const CustomeTextInput = ({placeholder}) => {
  return (
    <View style={styles.mainContainer}>
      <TextInput
        placeholder={placeholder}
        style={{paddingLeft: SIZES.width * 0.051, color: COLORS.black}}
        keyboardType="default"
        placeholderTextColor={COLORS.black}
      />
    </View>
  );
};

export default CustomeTextInput;

const styles = StyleSheet.create({
  mainContainer: {
    height: SIZES.width * 0.13,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    marginBottom: 3,
    borderColor: COLORS.borderColor,
    borderWidth: 1,
  },
});
