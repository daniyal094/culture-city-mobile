import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useRef, useState, useEffect} from 'react';
import styles from './Styles';
import eventDetail from '../../../assets/images/eventDetail.png';
import {colors} from '../../../utils/constants/colors';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import {height, totalSize, width} from 'react-native-dimension';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import CustomButton from '../../../components/CustomButton';
import BookEventModal from '../../../components/BookEventModal';
import AntIcon from 'react-native-vector-icons/dist/AntDesign';
import {useNavigation} from '@react-navigation/native';
import useEventApi from '../../../utils/api/event.api';
import {MEDIA_BASE_URL} from '../../../utils/constants/enums';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {routes} from '../../../utils/constants/routes';

const EventDetail = props => {
  const [user, setuser] = useState(null);
  const propsData = props.route.params;
  const navigation = useNavigation();
  const bottomSheetModalRef = useRef(null);
  const {useFetchEventByIdService, useFetchFavStatusEventsService} =
    useEventApi();
  const {
    isLoading: isEventDeatilLoading,
    data,
    isSuccess,
  } = useFetchEventByIdService(propsData.id);
  const {
    isLoading: isfavStatusLoading,
    data: fevStatusData,
    mutate,
  } = useFetchFavStatusEventsService();
  console.log('fevStatusData', fevStatusData);
  const getAsyncStorage = async () => {
    const res = await AsyncStorage.getItem('user');
    setuser(JSON.parse(res)?.user);
  };
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const imgSrc =
    data?.media?.length > 0 && `${MEDIA_BASE_URL}${data?.media[0]}`;
  const imgProfile = !data?.creator?.profilePicture?.isCompleteUrl
    ? `${MEDIA_BASE_URL}${data?.creator?.profilePicture?.url}`
    : data?.creator?.profilePicture?.url;

  useEffect(() => {
    getAsyncStorage();
  }, []);

  useEffect(() => {
    if (user) {
      console.log('mutaion data for fav ', user?._id, propsData.id);
      // mutate(user, propsData.id);
    }
  }, [user]);

  return (
    <>
      {isEventDeatilLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} color={colors.secondary} />
        </View>
      ) : (
        <>
          <View style={styles.wraper}>
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                position: 'absolute',
                top: height(5),
                left: width(2),
                zIndex: 99,
              }}
              onPress={() => navigation.goBack()}>
              <AntIcon
                name="arrowleft"
                size={totalSize(2.5)}
                color={colors.white}
              />
              <Text style={styles.backLink}>Back</Text>
            </Pressable>
            <ScrollView>
              <Image
                source={data?.media?.length > 0 ? {uri: imgSrc} : eventDetail}
                resizeMode="cover"
                style={styles.img}
              />
              <View style={styles.bodyWrapper}>
                <View style={styles.ownerContainer}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={
                        data?.media?.length > 0
                          ? {uri: imgProfile}
                          : eventDetail
                      }
                      resizeMode="cover"
                      style={styles.profilePicture}
                    />
                    <View style={{marginLeft: 10}}>
                      <Text style={styles.profileHeading}>
                        {data?.creator?.firstName +
                          ' ' +
                          data?.creator?.lastName}
                      </Text>
                      <Text style={{color: colors.disableColor}}>
                        {data?.creator?.organization}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View style={styles.locationIcon}>
                      <FontAwesome
                        name="location-arrow"
                        color="#fff"
                        size={totalSize(2)}
                      />
                    </View>
                    {/* <Ionicons
          name="ios-chatbox-ellipses-outline"
          color={colors.primary}
          size={totalSize(3)}
        /> */}
                  </View>
                </View>
                <Text style={styles.EventHeading}>{data?.title}</Text>
                <View style={{...styles.flexRow, alignItems: 'center'}}>
                  <Entypo
                    name="location-pin"
                    color={colors.coal}
                    size={totalSize(2)}
                  />
                  <Text style={{color: colors.disableColor}}>
                    {data?.timezone} (Timezone) |
                  </Text>
                  <Pressable
                    onPress={() =>
                      navigation.navigate(routes.direction, {data: data})
                    }>
                    <Text style={{color: colors.secondary}}>
                      {' '}
                      Get Direction{' '}
                    </Text>
                  </Pressable>
                </View>
                <View style={{...styles.flexRow, marginTop: height(1)}}>
                  <Text style={{color: colors.black, fontWeight: '500'}}>
                    Start date:
                  </Text>
                  <Text
                    style={{color: colors.disableColor, marginLeft: width(2)}}>
                    {data?.startDateTime}
                  </Text>
                </View>
                <View style={{...styles.flexRow, marginTop: height(0.5)}}>
                  <Text style={{color: colors.black, fontWeight: '500'}}>
                    End date:
                  </Text>
                  <Text
                    style={{
                      color: colors.disableColor,
                      marginLeft: width(3.3),
                    }}>
                    {data?.endDateTime}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: width(100),
                  borderTopWidth: 0.2,
                  borderTopColor: colors.disableColor,
                }}></View>

              <Text style={styles.discription}>{data?.about}</Text>
              {user?.role !== 'Organizer' && (
                <View style={styles.btnContainer}>
                  <CustomButton
                    labeColor={colors.light}
                    bgColor={colors.secondary}
                    onPress={() => {
                      handlePresentModalPress();
                    }}
                    label="Book this Event"
                    // loading={isLoginLoading}
                  />
                </View>
              )}
            </ScrollView>
          </View>
          <BookEventModal
            bottomSheetModalRef={bottomSheetModalRef}
            data={data}
          />
        </>
      )}
    </>
  );
};

export default EventDetail;
