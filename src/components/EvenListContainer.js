import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../utils/constants/colors';
import {height, totalSize, width} from 'react-native-dimension';
import NearFestivalCard from './NearFestivalCard';

const EvenListContainer = ({heading, list}) => {
  return (
    <>
      {list.length > 0 ? (
        <View style={styles.container}>
          <Text style={styles.heading}>{heading}</Text>
          <FlatList
            numColumns={1}
            data={list || []}
            renderItem={({item,idx} ) => <NearFestivalCard item={item} key={idx + 1}/>}
            horizontal={true}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            style={{marginLeft: width(5)}}
          />
        </View>
      ) : null}
    </>
  );
};

export default EvenListContainer;

const styles = StyleSheet.create({
  container: {
    width: width(100),
    marginVertical: height(1),
  },
  heading: {
    fontSize: totalSize(2),
    color: colors.coal,
    fontWeight: '500',
    letterSpacing: 1,
    marginVertical: height(1),
    marginLeft: width(5),
    marginBottom: height(2),
  },
  emptyBack: {
    height: height(14),
    width: width(60),
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
  },
});
