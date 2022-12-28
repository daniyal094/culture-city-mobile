import {ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useId} from 'react';
import festival from '../assets/images/festival.png';
import {height, totalSize, width} from 'react-native-dimension';
import {colors} from '../utils/constants/colors';
import {MEDIA_BASE_URL} from '../utils/constants/enums';
import {useNavigation} from '@react-navigation/native';
import {routes} from '../utils/constants/routes';

const UpcomingCard = ({item}) => {
  const navigation = useNavigation();
  const id = useId();
  const imgSrc =
    item?.media?.length > 0 && `${MEDIA_BASE_URL}${item?.media[0]}`;
  return (
    <View
      style={{
        width: width(100),
        height: height(25),
        alignItems: 'center',
        justifyContent: 'center',
      }}
      key={id}>
      <ImageBackground
        source={item?.media?.length > 0 ? {uri: imgSrc} : festival}
        resizeMode="cover"
        style={{
          width: width(90),
          height: height(25),
          alignSelf: 'center',
          marginTop: 10,
        }}
        imageStyle={{borderRadius: 10}}>
        <View
          style={{
            width: width(90),
            backgroundColor: colors.black,
            opacity: 0.65,
            position: 'absolute',
            bottom: 0,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            paddingHorizontal: width(2),
          }}>
          <Text
            style={{
              color: colors.white,
              fontWeight: '500',
              fontSize: 14,
              marginTop: height(1),
            }}>
            {item?.title}
          </Text>
          <Text
            style={{
              color: colors.white,
              fontWeight: '500',
              fontSize: 13,
              marginVertical: height(0.3),
            }}
            numberOfLines={1}
            >
            {item?.about}
          </Text>
          <Pressable
            onPress={() =>
              navigation.navigate(routes.eventDetail, {id: item?._id})
            }>
            <Text
              style={{
                fontSize: totalSize(1.2),
                color: colors.yellow,
                fontWeight: '600',
                marginBottom: height(1),
              }}>
              Read More
            </Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

export default UpcomingCard;

const styles = StyleSheet.create({});
