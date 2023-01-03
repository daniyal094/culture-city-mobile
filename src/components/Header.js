import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {height, totalSize, width} from 'react-native-dimension';
import {colors} from '../utils/constants/colors';
import AntIcon from 'react-native-vector-icons/dist/AntDesign';
import {useNavigation} from '@react-navigation/native';

const Header = ({heading, link = false}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <Pressable
        onPress={() => {
          link ? navigation.navigate(link) : navigation.goBack();
        }}
        style={styles.row}>
        <AntIcon name="arrowleft" size={totalSize(2)} color={colors.black} />
        <Text style={styles.backLink}>Back</Text>
      </Pressable>
      <Text style={styles.headerHeading}>{heading}</Text>
      <View></View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height(6),
    marginHorizontal: width(5),
    marginBottom: height(1),
  },
  headerHeading: {
    color: colors.black,
    fontSize: totalSize(2),
    fontWeight: '600',
    letterSpacing: 1,
    marginRight: width(10),
  },
  backLink: {
    color: colors.black,
    fontSize: totalSize(1.5),
    fontWeight: '500',
    marginLeft: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
