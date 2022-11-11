import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
export const IsEmail = text => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (reg.test(text) === false) {
    return false;
  } else {
    return true;
  }
};
// Save Data in Async Storage
export const setAsyncStorage = async (key, value) => {
  try {
    const jsonValue = typeof value === 'object' ? JSON.stringify(value) : value;
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    Toast.show(e);
  }
};

// Get Data from Async Storage
export const getAsyncStorage = async key => {
  const value = await AsyncStorage.getItem(key);
  return JSON.parse(value);
};




