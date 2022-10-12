import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const CustomButton = ({label, labeColor, bgColor, onPress}) => {
  return (
    <Pressable
      style={{
        width: '85%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: bgColor,
        paddingVertical: 15,
        borderRadius: 10,
        marginVertical:10
      }}
      onPress={onPress}>
      <Text
        style={{
          color: labeColor,
          fontSize:15
        }}>
        {label}
      </Text>
    </Pressable>
  );
};

export default CustomButton;
