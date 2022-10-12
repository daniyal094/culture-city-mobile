import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {height, width} from 'react-native-dimension';
import {colors} from '../utils/constants/colors';
import eventNearBy from '../assets/images/eventNearBy.png';
const NearFestivalCard = () => {
  return (
    <View style={styles.container}>
      <Image source={eventNearBy} resizeMode="cover" style={styles.imgStyle} />
      <View style={{paddingHorizontal: 10, marginTop: 10}}>
        <Text style={styles.cardHeading}>Festival of colors</Text>
        <Text style={styles.cardSubhHeading}>Pilar, Bataan</Text>
        <View style={styles.lastContainer}>
          <Text style={styles.cardSubhHeading}>44mins</Text>
          <Text style={styles.cardSubhHeading}>2mi</Text>
        </View>
      </View>
    </View>
  );
};

export default NearFestivalCard;

const styles = StyleSheet.create({
  container: {
    width: width(40),
    height: height(24),
    backgroundColor: colors.white,
    borderRadius: 10,
    marginBottom: height(2),
    marginHorizontal: width(2),
  },
  imgStyle: {
    width: '100%',
    height: height(15),
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  cardHeading: {
    color: colors.secondary,
    fontWeight: '500',
    fontSize: 16,
  },
  cardSubhHeading: {
    color: colors.disableColor,
    fontSize: 9,
  },
  lastContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:10,
  },
});
