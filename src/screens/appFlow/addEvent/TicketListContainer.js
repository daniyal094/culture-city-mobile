import {View, Text, TextInput, Pressable} from 'react-native';
import React from 'react';
import styles from './Styles';
import {colors} from '../../../utils/constants/colors';
import {height, totalSize, width} from 'react-native-dimension';
import InputDatePicker from '../../../components/InputDatePicker';
const TicketListContainer = ({addEventdata, setaddEventdata, index}) => {
  // {
  //   categoryName: '',
  //   quantity: '',
  //   price: '',
  //   salestartdate: '',
  //   salestarttime: '',
  //   salesenddate: '',
  //   salesendtime: '',
  // },
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
        onChangeText={text => {
          const obj = {...addEventdata};
          obj.ticketList[index].categoryName = text;
          setaddEventdata(obj);
        }}
        value={addEventdata.ticketList[index].categoryName}
      />
      <View style={styles.row}>
        <TextInput
          style={{
            borderColor: colors.black,
            borderWidth: 1,
            borderRadius: 7,
            width: '49%',
            padding: 7,
            marginVertical: height(1),
            marginRight: 5,
          }}
          placeholder="Quantity"
          onChangeText={text => {
            const obj = {...addEventdata};
            obj.ticketList[index].quantity = text;
            setaddEventdata(obj);
          }}
          value={addEventdata.ticketList[index].quantity}
        />
        <TextInput
          style={{
            borderColor: colors.black,
            borderWidth: 1,
            borderRadius: 7,
            width: '49%',
            padding: 7,
            marginVertical: height(1),
          }}
          placeholder="Price"
          onChangeText={text => {
            const obj = {...addEventdata};
            obj.ticketList[index].price = text;
            setaddEventdata(obj);
          }}
          value={addEventdata.ticketList[index].price}
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
          setValue={date => {
            const obj = {...addEventdata};
            obj.ticketList[index].salestartdate = date?.startDate;
            setaddEventdata(obj);
          }}
          stateName="startDate"
          value={
            addEventdata.ticketList[index].salestartdate &&
            `${addEventdata.ticketList[index].salestartdate?.getDate()}-${
              addEventdata.ticketList[index].salestartdate?.getMonth() + 1
            }-${addEventdata.ticketList[index].salestartdate?.getFullYear()}`
          }
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
          stateName={'startTime'}
          setValue={date => {
            const obj = {...addEventdata};
            obj.ticketList[index].salestarttime = date?.startTime;
            setaddEventdata(obj);
          }}
          value={
            addEventdata.ticketList[index].salestarttime &&
            `${
              addEventdata.ticketList[index].salestarttime?.getHours() < 10
                ? `0${addEventdata.ticketList[index].salestarttime?.getHours()}`
                : addEventdata.ticketList[index].salestarttime?.getHours()
            }:${addEventdata.ticketList[index].salestarttime?.getMinutes()}`
          }
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
          setValue={date => {
            const obj = {...addEventdata};
            obj.ticketList[index].salesenddate = date?.endDate;
            setaddEventdata(obj);
          }}
          stateName="endDate"
          value={
            addEventdata.ticketList[index].salesenddate &&
            `${addEventdata.ticketList[index].salesenddate?.getDate()}-${
              addEventdata.ticketList[index].salesenddate?.getMonth() + 1
            }-${addEventdata.ticketList[index].salesenddate?.getFullYear()}`
          }
        />
        <InputDatePicker
          borderColor={colors.black}
          extraStyle={{width: '49%', marginLeft: width(1)}}
          placeHolder="Sales End Time"
          mode="time"
          stateName={'endTime'}
          setValue={date => {
            const obj = {...addEventdata};
            obj.ticketList[index].salesendtime = date?.endTime;
            setaddEventdata(obj);
          }}
          value={
            addEventdata.ticketList[index].salesendtime &&
            `${
              addEventdata.ticketList[index].salesendtime?.getHours() < 10
                ? `0${addEventdata.ticketList[index].salesendtime?.getHours()}`
                : addEventdata.ticketList[index].salesendtime?.getHours()
            }:${addEventdata.ticketList[index].salesendtime?.getMinutes()} `
          }
        />
      </View>
    </View>
  );
};

export default TicketListContainer;
