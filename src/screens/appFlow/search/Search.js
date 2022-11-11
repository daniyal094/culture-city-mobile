import {View,  TextInput, FlatList} from 'react-native';
import React from 'react';
import styles from './Styles';
import AntIcon from 'react-native-vector-icons/dist/AntDesign';
import {height, totalSize, width} from 'react-native-dimension';
import {colors} from '../../../utils/constants/colors';
import TabBar from '../../../components/TabBar';
import EventCard from '../../../components/EventCard';
const Search = (props) => {
  const propsData = props.route.params;
  return (
    <>
      <View style={styles.wraper}>
        <View style={styles.headerContainer}>
          <View style={styles.searchFieldContainer}>
            <TextInput
              keyboardType="web-search"
              placeholder="Search event"
              placeholderTextColor={colors.disableColor}
              style={{width: width(70), color: colors.coal, padding: height(2)}}
            />
            <AntIcon
              name="arrowright"
              size={totalSize(2)}
              color={colors.coal}
            />
          </View>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={propsData?.searchList}
            renderItem={({item}) => <EventCard data={item}/>}
          />
        </View>

        <TabBar selectedTab={'Search'} />
      </View>
    </>
  );
};

export default Search;
