import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {height, width} from 'react-native-dimension';
import {colors} from '../utils/constants/colors';

const Tile = ({label}) => {
  const styles = StyleSheet.create({
    tileContainer: {
      backgroundColor: colors.primary,
      paddingVertical: height(1),
      paddingHorizontal: width(3.5),
      borderRadius: 40,
      margin: 5,
      minWidth: width(20),
    },
    tileTitle: {
      color: colors.white,
      textAlign: 'center',
      fontSize: 15,
    },
  });
  return (
    <View style={styles.tileContainer}>
      <Text style={styles.tileTitle}>{label}</Text>
    </View>
  );
};

export default Tile;

const styles = StyleSheet.create({});
