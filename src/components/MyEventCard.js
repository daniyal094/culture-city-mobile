import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../utils/constants/colors';
import {height, totalSize, width} from 'react-native-dimension';
import eventImg from '../assets/images/eventImg.png';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import CalanderBox from './CalanderBox';
import {useNavigation} from '@react-navigation/native';
import {routes} from '../utils/constants/routes';
import {MEDIA_BASE_URL} from '../utils/constants/enums';
const MyEventCard = ({data}) => {
  const navigation = useNavigation();
  const date = new Date(data?.startDateTime);
  const imgSrc =
    data?.media?.length > 0 && `${MEDIA_BASE_URL}${data?.media[0]}`;
  return (
    <View style={styles.cardContainer}>
      <View>
        <Image
          source={data?.media?.length > 0 ? {uri: imgSrc} : eventImg}
          resizeMode="cover"
          style={{width: width(20), height: height(11), borderRadius: 10}}
        />
        <View style={{position: 'absolute', left: 0, bottom: -1}}>
          <CalanderBox date={date.getDate()} month={date.getMonth()} />
        </View>
      </View>
      <View style={styles.detailSection}>
        <Text style={styles.heading} numberOfLines={1}>
          {data?.title}
        </Text>
        <Text style={styles.detail} numberOfLines={1}>
          Event: {date > new Date() ? 'Not started yet' : 'Started'}
        </Text>
        <Text style={styles.detail} numberOfLines={2}>
          Status:{' '}
          <Text
            style={{color: data?.isPublished ? colors.green : colors.danger}}>
            {data?.isPublished ? 'Active' : 'Draft'}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default MyEventCard;

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
    width: width(50),
  },
  heading: {
    fontSize: 18,
    color: colors.primary,
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
    marginTop: height(1),
    width: width(50),
  },
  detailLink: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 12,
    letterSpacing: 1,
  },
});
