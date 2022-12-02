import {View, Text, FlatList} from 'react-native';
import React from 'react';
import NearFestivalCard from '../../../components/NearFestivalCard';
import styles from './Styles';
import { width } from 'react-native-dimension';
import useEventApi from '../../../utils/api/event.api';
const ProfileView = ({userData}) => {
  const {useFetchNearByEventsService} = useEventApi();
const {isLoading: isLoadingNearByEvent, data: nearByEvents} = useFetchNearByEventsService();
  const memberSince = userData?.createdAt;
  const date = new Date(memberSince);
  const monthNames = [
    'Jan',
    'Feb',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];
  return (
    <>
      <View style={styles.profileDetailContainer}>
        <View>
          <Text style={styles.profileDetailHeading}>Role</Text>
          <Text style={styles.profileDetailInfo}>{userData?.role}</Text>
        </View>
        <View>
          <Text style={styles.profileDetailHeading}>Approved</Text>
          <Text style={styles.profileDetailInfo}>
            {userData?.isApproved ? 'Yes' : 'NO'}{' '}
          </Text>
        </View>
        <View>
          <Text style={styles.profileDetailHeading}>Member Since</Text>
          <Text style={styles.profileDetailInfo}>{`${date.getFullYear()}-${
            monthNames[date.getMonth()]
          }-${date.getDate()}`}</Text>
        </View>
      </View>
      <Text style={styles.tagHeading}>Profile Bio</Text>
      <View style={styles.tileContainer}>
      <Text style={{...styles.profileDetailInfo,textAlign:'justify',marginLeft:width(2)}}>{userData?.bio}</Text>
        {/* <Tile label={'Canadian'} />
        <Tile label={'Argentinian'} />
        <Tile label={'Italian'} />
        <Tile label={'Canadian'} />
        <Tile label={'Italian'} /> */}
      </View>

      <View style={styles.historyContainer}>
        <Text style={styles.historyHeading}>Nearby Events</Text>
        <FlatList
          numColumns={1}
          data={nearByEvents || []}
          renderItem={({item}) => <NearFestivalCard item={item} />}
          horizontal={true}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </>
  );
};

export default ProfileView;
