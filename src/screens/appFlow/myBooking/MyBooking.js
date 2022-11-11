import {View, Text, FlatList, ActivityIndicator,Pressable} from 'react-native';
import React from 'react';
import styles from './Styles';
import AntIcon from 'react-native-vector-icons/dist/AntDesign';
import {height, totalSize} from 'react-native-dimension';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../../utils/constants/colors';
import useEventApi from '../../../utils/api/event.api';
import EventCard from '../../../components/EventCard';
const MyBooking = props => {
  const propsData = props.route.params;
  const navigation = useNavigation();
  const {useFetchUserBookingEventsService} = useEventApi();
  const {isLoading, data} = useFetchUserBookingEventsService(
    propsData?.user?._id,
  );
  console.log(data, isLoading);
  return (
    <>
      {isLoading ? (
        <>
          <View
            style={{
              width: '100%',
              height: height(65),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size={'large'} color={colors.secondary} />
          </View>
        </>
      ) : (
        <>
          <View style={styles.wraper}>
            <View style={styles.header}>
              <Pressable onPress={() => navigation.goBack()} style={styles.row}>
                <AntIcon
                  name="arrowleft"
                  size={totalSize(2)}
                  color={colors.black}
                />
                <Text style={styles.backLink}>Back</Text>
              </Pressable>
              <Text style={styles.headerHeading}>Booking</Text>
              <View></View>
            </View>
            {data.length > 0 ? (


              <FlatList
                data={data || []}
                renderItem={({item, idx}) => (
                  <EventCard data={item?.event} key={idx + 1} />
                )}
                horizontal={false}
                keyExtractor={item => item.id}
              />
            ) : (
              <View style={styles.emptyListContainer}>
                <Text style={styles.emptyListText}>
                  No List to show yet.
                </Text>
              </View>
            )}
          </View>
        </>
      )}
    </>
  );
};

export default MyBooking;
