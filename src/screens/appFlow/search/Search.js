import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import React from 'react';
import styles from './Styles';
import {totalSize} from 'react-native-dimension';
import {colors} from '../../../utils/constants/colors';
import TabBar from '../../../components/TabBar';
import EventCard from '../../../components/EventCard';
const Search = props => {
  const propsData = props.route.params;
  return (
    <>
      <View style={styles.wraper}>
        <View style={styles.headerContainer}>
          <View style={styles.searchFieldContainer}>
            <Text style={styles.searchHeading}>
              Search Result : {propsData?.searchList?.length}
            </Text>
            {/* <TextInput
              keyboardType="web-search"
              placeholder="Search event"
              placeholderTextColor={colors.disableColor}
              style={{width: width(70), color: colors.coal, padding: height(2)}}
            />
            <AntIcon
              name="arrowright"
              size={totalSize(2)}
              color={colors.coal}
            /> */}
          </View>
        </View>

        <View style={styles.listContainer}>
          {propsData?.searchList?.length > 0 ? (
            <FlatList
              data={propsData?.searchList}
              renderItem={({item}) => <EventCard data={item} />}
            />
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: totalSize(2),
                  color: colors.disableColor,
                  fontWeight: '600',
                  letterSpacing: 1,
                }}>
                No Results Found
              </Text>
            </View>
          )}
        </View>

        <TabBar selectedTab={'Search'} />
      </View>
    </>
  );
};

export default Search;
