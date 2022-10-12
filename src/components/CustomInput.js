import {Image, StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import {colors} from '../utils/constants/colors';
import { width } from 'react-native-dimension';

const CustomInput = ({icon, placeholder, value, onChangeText,secureTextEntry = false}) => {
  return (
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />
      <Image source={icon} style={styles.inputIcon} />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    padding: 3,
    borderWidth: 1,
    borderColor: colors.lightGray,
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius:6,
    color:colors.black,
    marginVertical:10
  },
  input:{
    width:width(70)
  },
  inputIcon:{
    marginRight:15
  }
});
