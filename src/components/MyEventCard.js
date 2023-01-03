import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../utils/constants/colors';
import {height, totalSize, width} from 'react-native-dimension';
import eventImg from '../assets/images/eventImg.png';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import CalanderBox from './CalanderBox';
import {useNavigation} from '@react-navigation/native';
import {routes} from '../utils/constants/routes';
import {MEDIA_BASE_URL} from '../utils/constants/enums';
import Entypo from 'react-native-vector-icons/Entypo';
import useEventApi from '../utils/api/event.api';
import {useUser} from '../utils/context/UserContenxt';
const MyEventCard = ({data}) => {
  const [open, setopen] = useState(false);
  const navigation = useNavigation();
  const userData = useUser();
  const user = userData.user;
  const date = new Date(data?.startDateTime);
  const imgSrc =
    data?.media?.length > 0 && `${MEDIA_BASE_URL}${data?.media[0]}`;
  const {useHandlePublishEventService, useHandleDeleteEventService} =
    useEventApi();
  const {mutate} = useHandlePublishEventService(
    data?._id,
    user?._id,
    !data?.isPublished,
  );
  const {mutate: deleteEvent} = useHandleDeleteEventService(
    data?._id,
    user?._id,
  );

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
      <Pressable style={{alignSelf: 'center'}} onPress={() => setopen(!open)}>
        <Entypo
          name="dots-three-vertical"
          size={totalSize(2)}
          color={colors.coal}
        />
      </Pressable>
      {open && (
        <View style={styles.optionContainer}>
          <Pressable
            style={{marginVertical: height(0.5)}}
            onPress={() => {
              navigation.navigate(routes.eventDetail, {id: data._id});
              setopen(false);
            }}>
            <Text style={{color: colors.black}}>View Event</Text>
          </Pressable>
          <Pressable style={{marginVertical: height(0.5)}}>
            <Text style={{color: colors.black}}>Edit Event</Text>
          </Pressable>
          <Pressable
            style={{marginVertical: height(0.5)}}
            onPress={() => {
              setopen(false);
              mutate();
            }}>
            <Text style={{color: colors.black}}>
              {data?.isPublished ? 'Un-Publish Event' : 'Publish Event'}
            </Text>
          </Pressable>
          <Pressable
            style={{marginVertical: height(0.5)}}
            onPress={() => {
              deleteEvent();
              setopen(false);
            }}>
            <Text style={{color: colors.black}}>Delete Event</Text>
          </Pressable>
        </View>
      )}
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
    marginTop: height(1),
    marginBottom: height(1.5),
    position: 'relative',
    zIndex: -999,
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
  optionContainer: {
    position: 'absolute',
    top: 30,
    right: 50,
    backgroundColor: colors.gray,
    borderRadius: totalSize(1),
    elevation: 10,
    zIndex: 99999,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});
