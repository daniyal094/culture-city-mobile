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
import {width} from 'react-native-dimension';

const CustomInput = ({
  icon = false,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  iconPressHandler
}) => {
  return (
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
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

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    padding: 3,
    borderWidth: 1,
    borderColor: colors.lightGray,
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 6,
    color: colors.black,
    marginVertical: 10,
  },
  input: {
    width: width(70),
  },
  inputIcon: {
    marginRight: 15,
  },
});
