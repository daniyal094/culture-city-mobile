import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Evenet from '../assets/images/Evenet.png';
import {height, totalSize, width} from 'react-native-dimension';
import {colors} from '../utils/constants/colors';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import CalanderBox from './CalanderBox';
import {MEDIA_BASE_URL} from '../utils/constants/enums';
import {useNavigation} from '@react-navigation/native';
import { routes } from '../utils/constants/routes';
const FestivalCardBg = ({data}) => {
  const navigation = useNavigation();
  const imgSrc =
    data?.media?.length > 0 && `${MEDIA_BASE_URL}${data?.media[0]}`;
  const date = new Date(data?.startDateTime);
  return (
    <View style={styles.container}>
      <Image
        source={data?.media?.length > 0 ? {uri: imgSrc} : Evenet}
        resizeMode={'cover'}
        style={styles.imgBackgroundContainer}
      />
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: height(27),
          position: 'absolute',
          width: '100%',
        }}>
        <CalanderBox date={date.getDate()} month={date.getMonth()} />
        <View style={styles.detailContainer}>
          <Text style={styles.cardHeading}>{data?.title}</Text>
          <Text style={styles.cardDetailText}>Time Zone:{data?.timezone}</Text>
          <View style={{justifyContent: 'flex-end', flexDirection: 'row'}}>
            {/* <View style={styles.iconContainer}>
              <Icon name="favorite" size={14} color="#900" />
            </View> */}
            <Pressable
              style={styles.iconContainer}
              onPress={() =>
                navigation.navigate(routes.eventDetail, {id: data?._id})
              }>
              <Icon name="arrow-forward-ios" size={14} color="#9BA1AF" />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FestivalCardBg;

const styles = StyleSheet.create({
  container: {
    width: width(50),
    height: height(27),
    marginHorizontal: width(2),
    borderRadius: 10,
  },
  imgBackgroundContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: width(50),
    height: height(27),
  },
  cardHeading: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  detailContainer: {
    paddingHorizontal: width(4),
    marginBottom: height(1),
    width: '100%',
  },
  cardDetailText: {
    color: colors.white,
    fontWeight: '400',
    fontSize: totalSize(1.3),
    marginTop:5,
  },
  iconContainer: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    width: width(6.5),
    height: height(3),
    marginLeft: width(1),
    marginTop: height(1),
    marginBottom: height(1),
  },
});
