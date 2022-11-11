import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import {colors} from '../utils/constants/colors';
import {height, width} from 'react-native-dimension';

const CustomInput = ({
  icon = false,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  iconPressHandler,
  multiline = false,
  numberOfLines = 1
}) => {
  const styles = StyleSheet.create({
    inputWrapper: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: colors.gray,
      width: '90%',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 6,
      color: colors.black,
      marginVertical: 10,
    },
    input: {
      width: width(70),
      height: multiline ?  height(15) : height(6),
      paddingLeft: width(2),
    },
    inputIcon: {
      marginRight: 15,
    },
  });
  return (
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        autoCapitalize={'none'}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
      {icon && (
        <Pressable style={{marginRight: width(3)}} onPress={iconPressHandler}>
          {icon}
        </Pressable>
      )}
    </View>
  );
  
};

export default CustomInput;

