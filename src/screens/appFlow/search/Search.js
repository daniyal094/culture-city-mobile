import {View, Text, TextInput, FlatList} from 'react-native';
import React from 'react';
import styles from './Styles';
import AntIcon from 'react-native-vector-icons/dist/AntDesign';
import {height, totalSize, width} from 'react-native-dimension';
import {colors} from '../../../utils/constants/colors';
import TabBar from '../../../components/TabBar';
import EventCard from '../../../components/EventCard';
const Search = () => {
  return (
    <>
      <View style={styles.wraper}>
        <View style={styles.headerContainer}>
          <View style={styles.searchFieldContainer}>
            <TextInput
              keyboardType="web-search"
              placeholder="Search event"
              placeholderTextColor={colors.disableColor}
              style={{width: width(70), color: colors.coal}}
            />
            <AntIcon
              name="arrowright"
              size={totalSize(2)}
              color={colors.coal}
            />
          </View>
        </View>
        <View style={{marginTop:height(2),marginBottom:height(5)}}>
          <FlatList
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
            renderItem={({item}) => <EventCard />}
          />
        </View>

        <TabBar selectedTab={'Search'} />
      </View>
    </>
  );
};

export default Search;
