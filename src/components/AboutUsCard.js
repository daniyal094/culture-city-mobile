import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { colors } from '../utils/constants/colors';
import { height, totalSize, width } from 'react-native-dimension';
const AboutUsCard = ({name,designation,img,detail}) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.nameHeading}>{name}</Text>
      <Text style={styles.designation}>{designation}</Text>
      <Text style={styles.details}>
       {detail}
      </Text>
      <Image source={img} resizeMode="contain" style={styles.imgStyle} />
    </View>
  );
};

export default AboutUsCard;

const styles = StyleSheet.create({
    cardContainer:{
        backgroundColor:colors.white,
        borderRadius:10,
        elevation:6,
        marginVertical:height(2),
        paddingLeft:width(8),
        width:width(88)
    },
    nameHeading:{
        color:colors.black,
        marginTop:height(2),
        letterSpacing:1,
        fontSize:totalSize(2),
        fontWeight:'600',  
    },
    designation:{
        marginVertical:height(1),
        letterSpacing:1,
        fontSize:totalSize(2),
        fontWeight:'600', 
        color:colors.secondary
    },
    details:{
        color:colors.disableColor,
        fontSize:totalSize(1.5),
        textAlign:'justify',
        marginBottom:height(2),
        width:width(75)
    },
    imgStyle:{
        position:'absolute',
        top:height(3.5),
        left:-width(6),
        zIndex:99
    }
});
