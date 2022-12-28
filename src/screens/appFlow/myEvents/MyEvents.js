import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import React from 'react';
import styles from './Styles';
import AntIcon from 'react-native-vector-icons/dist/AntDesign';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {height, totalSize} from 'react-native-dimension';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../../utils/constants/colors';
import useEventApi from '../../../utils/api/event.api';
import EventCard from '../../../components/EventCard';
import {useUser} from '../../../utils/context/UserContenxt';
import MyEventCard from '../../../components/MyEventCard';
const MyEvents = props => {
  const propsData = props.route.params;
  const userData = useUser();
  const user = userData.user;
  const navigation = useNavigation();
  const {useFetchUserEventsService} = useEventApi();
  const {isLoading, data} = useFetchUserEventsService(user?._id);
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
              <Text style={styles.headerHeading}>My Events</Text>
              <View></View>
            </View>
            {data?.length > 0 ? (
              <FlatList
                data={data || []}
                renderItem={({item, idx}) => (
                  <MyEventCard data={item} key={idx + 1} />
                )}
                horizontal={false}
                keyExtractor={item => item.id}
              />
            ) : (
              <View style={styles.emptyListContainer}>
                <Text style={styles.emptyListText}>No List to show yet.</Text>
              </View>
            )}
          </View>
        </>
      )}
    </>
  );
};

export default MyEvents;
