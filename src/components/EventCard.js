import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../utils/constants/colors';
import {height, totalSize, width} from 'react-native-dimension';
import eventImg from '../assets/images/eventImg.png';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import CalanderBox from './CalanderBox';
import { useNavigation } from '@react-navigation/native';
import { routes } from '../utils/constants/routes';
const EventCard = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.cardContainer}>
      <View>
        <Image source={eventImg} resizeMode="contain" />
        <View style={{position: 'absolute', left: 0, bottom: -1}}>
          <CalanderBox />
        </View>
      </View>
      <View style={styles.detailSection}>
        <Text style={styles.heading}>Makulay Festivals</Text>
        <Text style={styles.subHeading}>Pilar, Bataan 2mi</Text>
        <Text style={styles.detail}>
          Travel the world one bite at a time! Join us for‘Curry{' '}
        </Text>
        <Pressable onPress={() => navigation.navigate(routes.eventDetail)}>
          <Text style={styles.detailLink}>View Details </Text>
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.white,
    margin: 5,
    shadowColor: '#000',

    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    width: width(90),
    borderRadius: totalSize(1),
    paddingHorizontal: width(4),
    paddingVertical: height(2),
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: height(1),
  },
  detailSection: {
    marginLeft: width(4),
  },
  heading: {
    fontSize: 18,
    color: colors.secondary,
    fontWeight: '700',
    letterSpacing: 1,
  },
  subHeading: {
    color: colors.disableColor,
    fontSize: 11,
    fontWeight: '400',
  },
  detail: {
    color: colors.disableColor,
    fontSize: 13,
    fontWeight: '500',
    marginVertical: height(1),
    width: width(50),
  },
  detailLink: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 12,
    letterSpacing: 1,
  },
});

export default EventCard;
