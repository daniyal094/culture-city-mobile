import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Evenet from '../assets/images/Evenet.png';
import {height, width} from 'react-native-dimension';
import {colors} from '../utils/constants/colors';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import CalanderBox from './CalanderBox';
import { MEDIA_BASE_URL } from '../utils/constants/enums';
const FestivalCardBg = ({data}) => {
  console.log("data",data);
  const imgSrc =
    data?.media?.length > 0 && `${MEDIA_BASE_URL}${data?.media[0]}`;
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
        }}>
        <CalanderBox />
        <View style={styles.detailContainer}>
          <Text style={styles.cardHeading}>{data?.title}</Text>
          <Text style={styles.cardDetailText}>
            {data?.about}
          </Text>
          <View style={{justifyContent: 'flex-end', flexDirection: 'row'}}>
            <View style={styles.iconContainer}>
              <Icon name="favorite" size={14} color="#900" />
            </View>
            <View style={styles.iconContainer}>
              <Icon name="arrow-forward-ios" size={14} color="#9BA1AF" />
            </View>
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
    marginHorizontal: width(1),
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
  },
  cardDetailText: {
    color: colors.white,
    fontWeight: '400',
    fontSize: 10,
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
