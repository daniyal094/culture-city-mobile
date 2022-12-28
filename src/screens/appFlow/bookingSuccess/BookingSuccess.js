import {View, Text, Image, FlatList, ScrollView} from 'react-native';
import React from 'react';
import styles from './Styles';
import Header from '../../../components/Header';
import paymentSuccess from '../../../assets/images/paymentSuccess.png';
import {height, totalSize, width} from 'react-native-dimension';
import {routes} from '../../../utils/constants/routes';
import CustomButton from '../../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../../utils/constants/colors';
import useEventApi from '../../../utils/api/event.api';
import NearFestivalCard from '../../../components/NearFestivalCard';
import {useUser} from '../../../utils/context/UserContenxt';
const BookingSuccess = () => {
  const navigation = useNavigation();
  const userData = useUser();
  const user = userData.user;
  const {useFetchHomeEventsService} = useEventApi();
  // const {isLoading: favLoading, data: favData} =
  //   useFetchUserBookmarkEventsService(user?._id);
  const {isLoading: isLoadingHomeEvent, data: homeEvents} =
    useFetchHomeEventsService();
  return (
    <View style={styles.wraper}>
      {isLoadingHomeEvent ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} color={colors.secondary} />
        </View>
      ) : (
        <>
          <Header heading={'Successfully'} link={routes.home} />
          <ScrollView>
            <Image
              source={paymentSuccess}
              resizeMode="contain"
              style={{width: width(100)}}
            />
            <Text style={styles.successText}>
              Thank you {'\n'}
              For your Booking!
            </Text>
            <View style={{alignItems: 'center', width: width(100)}}>
              <CustomButton
                label={'Go to My Bookings'}
                labeColor={colors.light}
                bgColor={colors.secondary}
                onPress={() => navigation.navigate(routes.myBooking)}
                //   loading={isLoading}
              />
            </View>
            <View style={styles.moreEventContainer}>
              <Text
                style={{
                  color: colors.black,
                  fontSize: totalSize(2),
                  marginVertical: height(1),
                }}>
                Browse upcoming events
              </Text>
              <FlatList
                numColumns={1}
                data={homeEvents?.upcomingEvents || []}
                renderItem={({item}) => <NearFestivalCard item={item} />}
                horizontal={true}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default BookingSuccess;
