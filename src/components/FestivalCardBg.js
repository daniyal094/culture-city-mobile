import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Evenet from '../assets/images/Evenet.png';
import {height, width} from 'react-native-dimension';
import {colors} from '../utils/constants/colors';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
const FestivalCardBg = ({data}) => {
  return (
    <ImageBackground
      source={Evenet}
      resizeMode={'contain'}
      style={styles.container}
      imageStyle={{borderRadius: 10}}>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: height(27),
        }}>
        <View style={styles.calander}>
          <View style={styles.calanderHeader}>
            <Text style={{fontSize: 10, color: colors.white}}>December</Text>
          </View>
          <View style={styles.calanderBody}>
            <Text
              style={{fontWeight: '600', color: colors.black, fontSize: 22}}>
              24
            </Text>
          </View>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.cardHeading}>FestivalCardBg Test</Text>
          <Text style={styles.cardDetailText}>
            Catchy Information about the event, goal is to make them book
          </Text>
          <View style={{justifyContent: 'flex-end', flexDirection: 'row'}}>
            <View style={styles.iconContainer}>
              <Icon name="favorite" size={14} color="#900" />
            </View>
            <View style={styles.iconContainer}>
              <Icon name="arrow-forward-ios" size={14} color="#9BA1AF" />
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default FestivalCardBg;

const styles = StyleSheet.create({
  container: {
    width: width(50),
    height: height(27),
    marginHorizontal: width(1),
  },
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
  cardHeading: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  detailContainer: {
    paddingHorizontal: width(4),
    marginBottom: height(1),
  },
  cardDetailText: {
    color: colors.white,
    fontWeight: '400',
    fontSize: 10,
  },
  iconContainer: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    width: width(6.5),
    height: height(3),
    marginLeft: width(1),
    marginTop:5
  },
});
