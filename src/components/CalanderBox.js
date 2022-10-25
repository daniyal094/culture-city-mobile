import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { height, totalSize, width } from 'react-native-dimension';
import { colors } from '../utils/constants/colors';

const CalanderBox = () => {
  return (
    <View style={styles.calander}>
      <View style={styles.calanderHeader}>
        <Text style={{fontSize: totalSize(0.9), color: colors.white}}>
          December
        </Text>
      </View>
      <View style={styles.calanderBody}>
        <Text style={{fontWeight: '600', color: colors.black, fontSize: 22}}>
          24
        </Text>
      </View>
    </View>
  );
};

export default CalanderBox;

const styles = StyleSheet.create({
  calander: {
    width: width(11),
    height: height(5.5),
    backgroundColor: colors.white,
    flexDirection: 'column',
    borderRadius: 5,
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 10,
  },
  calanderHeader: {
    backgroundColor: colors.danger,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 2,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  calanderBody: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
