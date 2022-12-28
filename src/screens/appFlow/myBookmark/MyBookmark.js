import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import React from 'react';
import styles from './Styles';
import AntIcon from 'react-native-vector-icons/dist/AntDesign';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {totalSize} from 'react-native-dimension';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../../utils/constants/colors';
import useEventApi from '../../../utils/api/event.api';
import EventCard from '../../../components/EventCard';
import {useUser} from '../../../utils/context/UserContenxt';
const MyBookmark = props => {
  const userData = useUser();
  const user = userData.user;
  const propsData = props.route.params;
  const navigation = useNavigation();
  const {useFetchUserBookmarkEventsService} = useEventApi();
  const {isLoading, data} = useFetchUserBookmarkEventsService(user?._id,true);
  return (
    <View style={styles.wraper}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.row}>
          <AntIcon name="arrowleft" size={totalSize(2)} color={colors.black} />
          <Text style={styles.backLink}>Back</Text>
        </Pressable>
        <Text style={styles.headerHeading}>Bookmarks</Text>
        <View></View>
      </View>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} color={colors.secondary} />
        </View>
      ) : (
        <>
          {data?.length > 0 ? (
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
              <Text style={styles.emptyListText}>No List to show yet.</Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default MyBookmark;
