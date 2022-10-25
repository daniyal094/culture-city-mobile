import {ActivityIndicator, Pressable, Text} from 'react-native';
import React from 'react';
import { colors } from '../utils/constants/colors';

const CustomButton = ({
  label,
  labeColor,
  bgColor,
  onPress,
  loading = false,
}) => {
  return (
    <Pressable
      style={{
        width: '85%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: bgColor,
        paddingVertical: 15,
        borderRadius: 10,
        marginVertical: 10,
      }}
      onPress={onPress}>
      {loading ? (
            <ActivityIndicator size="small" color={colors.white} />
      ) : (
        <Text
          style={{
            color: labeColor,
            fontSize: 15,
          }}>
          {label}
        </Text>
      )}
    </Pressable>
  );
};

export default CustomButton;
