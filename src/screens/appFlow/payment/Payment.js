import {
  View,
  Text,
  ImageBackground,
  Pressable,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React from 'react';
import styles from './Styles';
import useUserApi from '../../../utils/api/user.api';
import {useUser} from '../../../utils/context/UserContenxt';
import debitBg from '../../../assets/images/debitBg.png';
import {height, totalSize, width} from 'react-native-dimension';
import AntIcon from 'react-native-vector-icons/dist/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../../utils/constants/colors';
import NearFestivalCard from '../../../components/NearFestivalCard';

const Payment = () => {
  const userData = useUser();
  const user = userData.user;
  const navigation = useNavigation();
  const {
    useFetchCreditCardService,
    useHandleDeleteCreditCardService,
    useHandleSaveCreditCardService,

  } = useUserApi();
  const {isLoading, data} = useFetchCreditCardService(user._id);
  const {isLoading: isCardDeleteLoading, mutate} =
    useHandleDeleteCreditCardService(user._id);
  const {isLoading: isSaveCardLoading, mutate: saveCard} =
    useHandleSaveCreditCardService(user._id);
  const {useFetchHomeEventsService} = useEventApi();
  const {isLoading: isLoadingHomeEvent, data: homeEvents} =
    useFetchHomeEventsService();

  const createTwoButtonAlert = () =>
    Alert.alert(
      'Are you sure',
      'Are you sure you want to delete you card details?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => mutate()},
      ],
    );
  const carDetailHandler = () => {
    if (data?.expiryYear > 0) {
      // rem""ove card details
      createTwoButtonAlert();
    } else {
      // add Seeker card details

      if (!isSaveCardLoading) {
        saveCard();
      }
    }
  };

  return (
    <View style={styles.wraper}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.row}>
          <AntIcon name="arrowleft" size={totalSize(2)} color={colors.black} />
          <Text style={styles.backLink}>Back</Text>
        </Pressable>
        <Text style={styles.headerHeading}>Payment Detail</Text>
        <View></View>
      </View>

      <>
        <ImageBackground
          source={debitBg}
          style={{
            width: width(100),
            height: height(33),
            marginBottom: height(7),
          }}
          resizeMode="contain">
          <View style={styles.cardDetailContainer}>
            <Text style={styles.cardNum}>
              XXXX XXXX XXXX {data?.last4 || 'XXXX'}
            </Text>
            <Text style={styles.cardNum}>
              Exp: {data?.expiryYear || 'XXXX'}
            </Text>
          </View>
          <Pressable style={styles.debitBtn} onPress={carDetailHandler}>
            <View
              style={{
                ...styles.iconContainer,
                backgroundColor:
                  data?.expiryYear > 0 ? colors.danger : colors.green,
              }}>
              <AntIcon
                name={data?.expiryYear > 0 ? 'delete' : 'plus'}
                size={totalSize(2)}
                color={colors.white}
              />
            </View>
          </Pressable>
        </ImageBackground>
        <View style={styles.historyContainer}>
          <Text style={styles.historyHeading}>Upcoming Events</Text>
          <FlatList
            numColumns={1}
            data={homeEvents?.upcomingEvents || []}
            renderItem={({item}) => <NearFestivalCard item={item} />}
            horizontal={true}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </>
    </View>
  );
};

export default Payment;
