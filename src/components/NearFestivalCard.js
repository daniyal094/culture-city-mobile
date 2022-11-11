import {Image, StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import {height, width} from 'react-native-dimension';
import {colors} from '../utils/constants/colors';
import eventNearBy from '../assets/images/eventNearBy.png';
import {useNavigation} from '@react-navigation/native';
import {routes} from '../utils/constants/routes';
import {MEDIA_BASE_URL} from '../utils/constants/enums';
const NearFestivalCard = ({item}) => {
  const navigation = useNavigation();
  const pressHanler = () => {
    navigation.navigate(routes.eventDetail, {id: item._id});
  };
  const imgSrc =
    item?.media?.length > 0 && `${MEDIA_BASE_URL}${item?.media[0]}`;
  return (
    <View style={styles.container}>
      <Pressable onPress={pressHanler}>
        <Image
          source={item?.media?.length > 0 ? {uri: imgSrc} : eventNearBy}
          resizeMode="cover"
          style={styles.imgStyle}
        />
        <View style={{paddingHorizontal: 10, marginTop: 10}}>
          <Text style={styles.cardHeading}>{item?.title}</Text>
          <Text
            style={
              styles.cardSubhHeading
            }>{`${item?.location?.address?.countryOrRegion} - ${item?.location?.address?.city}`}</Text>
          <View style={styles.lastContainer}>
            <Text style={styles.cardSubhHeading}>44mins</Text>
            <Text style={styles.cardSubhHeading}>2mi</Text>
          </View>
        </View>
      </Pressable>
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
    elevation: 3,
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
    marginTop: 10,
  },
});
