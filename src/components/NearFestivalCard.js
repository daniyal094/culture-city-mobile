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
          <Text style={styles.cardHeading} numberOfLines={1}>
            {item?.title}
          </Text>
          <Text style={styles.cardSubhHeading}>
            {/* {item?.isTraditional && `${item?.location?.address?.countryOrRegion} - ${item?.location?.address?.city}`} */}
            Time Zone: {item?.timezone}
          </Text>
          <View style={styles.lastContainer}>
            <Text style={styles.cardSubhHeading}>Starting from:</Text>
            <Text style={styles.cardSubhHeading}>$30</Text>
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
    height: height(25),
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
    marginTop: 4,
  },
  lastContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
