import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CheckBoxWithLable from './CheckBoxWithLable';
import {colors} from '../utils/constants/colors';
import {height, width} from 'react-native-dimension';

const CheckBoxTile = ({label, onChange, isChecked}) => {
  const styles = StyleSheet.create({
    tileContainer: {
      backgroundColor: colors.white,
      paddingVertical: height(1.2),
      paddingHorizontal: width(3),
      borderRadius: 40,
      alignSelf: 'flex-start',
      margin:5
    },
  });
  return (
    <View style={styles.tileContainer}>
      <CheckBoxWithLable
        label={label}
        onChange={onChange}
        isChecked={isChecked}
      />
    </View>
  );
};

export default CheckBoxTile;
