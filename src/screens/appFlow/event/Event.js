import {View, Text, ScrollView, ActivityIndicator} from 'react-native';
import React from 'react';
import EvenListContainer from '../../../components/EvenListContainer';
import TabBar from '../../../components/TabBar';
import {height, totalSize} from 'react-native-dimension';
import styles from './Styles';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import AntIcon from 'react-native-vector-icons/dist/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../../utils/constants/colors';
import useEventApi from '../../../utils/api/event.api'
const Event = () => {
  const navigation = useNavigation();
  const {useHandleGetAllEventsApi} = useEventApi();
  const {data: eventList, isLoading} = useHandleGetAllEventsApi();
  return (
    <View style={styles.wraper}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.row}>
          <AntIcon name="arrowleft" size={totalSize(2)} color={colors.black} />
          <Text style={styles.backLink}>Back</Text>
        </Pressable>
        <Text style={styles.headerHeading}>Events</Text>
        <View></View>
      </View>
      {isLoading ? (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>

          <ActivityIndicator size={'large'} color={colors.secondary}/>
        </View>
      ) : (

        <ScrollView style={{marginBottom: height(5)}}>
          {eventList?.map((item, idx) => (
            <EvenListContainer
              heading={item?.name}
              list={item?.events}
              key={idx + 1}
            />
          ))}
        </ScrollView>
      )}
      <TabBar selectedTab={'Event'} />
    </View>
  );
};

export default Event;
