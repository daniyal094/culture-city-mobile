import {View, Text, TextInput, Pressable} from 'react-native';
import React from 'react';
import styles from './Styles';
import {colors} from '../../../utils/constants/colors';
import {height, totalSize, width} from 'react-native-dimension';
import InputDatePicker from '../../../components/InputDatePicker';
const TicketListContainer = ({addEventdata, setaddEventdata, index}) => {
  return (
    <View style={styles.ticketListContainer}>
      <Pressable
        onPress={() => {
          setaddEventdata({
            ...addEventdata,
            ticketList: [...addEventdata.ticketList].filter(
              (i, indx) => index !== indx,
            ),
          });
        }}>
        <Text
          style={{
            fontWeight: '700',
            fontSize: totalSize(2),
            position: 'absolute',
            top: -19,
            right: -10,
          }}>
          x
        </Text>
      </Pressable>
      <TextInput
        style={{
          borderColor: colors.black,
          borderWidth: 1,
          borderRadius: 7,
          width: '100%',
          padding: 15,
          marginVertical: height(1),
        }}
        placeholder="Category Name"
        //    onChangeText={() => setaddEventdata{}}
        // value=''
      />
      <View style={styles.row}>
        <TextInput
          style={{
            borderColor: colors.black,
            borderWidth: 1,
            borderRadius: 7,
            width: '50%',
            padding: 15,
            marginVertical: height(1),
            marginRight: 5,
          }}
          placeholder="Quantity"
          //    onChangeText={() => setaddEventdata{}}
          // value=''
        />
        <TextInput
          style={{
            borderColor: colors.black,
            borderWidth: 1,
            borderRadius: 7,
            width: '49%',
            padding: 15,
            marginVertical: height(1),
          }}
          placeholder="Price"
          //    onChangeText={() => setaddEventdata{}}
          // value=''
        />
      </View>
      <View style={styles.row}>
        <InputDatePicker
          borderColor={colors.black}
          extraStyle={{
            width: '49%',
            marginLeft: width(1),
            marginVertical: height(1),
          }}
          placeHolder="Sales Start Date"
          mode="date"
          value=""
        />
        <InputDatePicker
          borderColor={colors.black}
          extraStyle={{
            width: '49%',
            marginLeft: width(1),
            marginVertical: height(1),
          }}
          placeHolder="Sales Start Time"
          mode="time"
          value=""
        />
      </View>
      <View style={styles.row}>
        <InputDatePicker
          borderColor={colors.black}
          extraStyle={{
            width: '49%',
            marginLeft: width(1),
            marginVertical: height(1),
          }}
          placeHolder="Sales End Date"
          mode="date"
          value=""
        />
        <InputDatePicker
          borderColor={colors.black}
          extraStyle={{width: '49%', marginLeft: width(1)}}
          placeHolder="Sales End Time"
          mode="time"
          value=""
        />
      </View>
    </View>
  );
};

export default TicketListContainer;
