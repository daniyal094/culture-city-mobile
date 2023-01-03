import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {height, width} from 'react-native-dimension';
import check from '../assets/icons/check.png';
import {colors} from '../utils/constants/colors';
const CheckBoxWithLable = ({
  isChecked,
  onChange,
  label,
  linkedLabel,
  linkPress,
}) => {
  const styles = StyleSheet.create({
    checkBoxContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkBoxCircle: {
      borderWidth: 1,
      borderColor: isChecked ? colors.transparent : colors.gray,
      borderRadius: width(100),
      justifyContent: 'center',
      alignItems: 'center',
      width: width(4),
      height: height(2),
      backgroundColor: isChecked ? colors.secondary : colors.transparent,
      marginRight: width(1.5),
    },
  });
  return (
    <View style={styles.checkBoxContainer}>
      <Pressable style={styles.checkBoxCircle} onPress={onChange}>
        {isChecked && <Image source={check} />}
      </Pressable>
      <Text style={{color:colors.coal}}>{label}</Text>
      <TouchableOpacity onPress={linkPress}>
        <Text
          style={{
            fontWeight: '700',
            color: colors.black,
            marginLeft: 5,
          }}>
          {linkedLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CheckBoxWithLable;
