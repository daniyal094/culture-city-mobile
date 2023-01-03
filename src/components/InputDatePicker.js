import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {colors} from '../utils/constants/colors';
import {height, totalSize, width} from 'react-native-dimension';
const InputDatePicker = ({
  value,
  setValue,
  extraData = {},
  stateName,
  mode = 'date',
  borderColor = colors.gray,
  extraStyle = {},
  placeHolder = 'Select Date and time',
}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  return (
    <>
      <Pressable
        style={{
          ...styles.inputWrapper,
          borderColor: borderColor,
          ...extraStyle,
        }}
        onPress={() => setOpen(true)}>
        <Text
          style={{
            color: colors.disableColor,
            fontSize: totalSize(1.4),
            marginLeft: width(3),
          }}>
          {value === '' ? placeHolder : value?.toString()}
        </Text>
      </Pressable>
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
          setValue({...extraData, [stateName]: date});
        }}
        onCancel={() => {
          setOpen(false);
        }}
        mode={mode}
      />
    </>
  );
};

export default InputDatePicker;

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 6,
    color: colors.black,
    alignSelf: 'center',
    minHeight: height(5),
    width: '90%',
  },
});
