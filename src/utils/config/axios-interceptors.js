import axios from './axios-instance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import {setAsyncStorage} from '../helper/functions';
import * as RootNavigation from '../../navigation/RootNavigation.js';
import {routes} from '../constants/routes';
// import { useNavigation } from '@react-navigation/native';
// import { routes } from "../constants/routes";

// intercepting requests
// Step-2: Create request, response & error handlers
const requestHandler = async request => {
  // Token will be dynamic, so we can use any app-specific way to always
  // fetch the new token before making the call
  const tokenList = await AsyncStorage.getItem('tokens');
  const token = JSON.parse(tokenList)?.access_token;
  request.headers['Authorization'] = `Bearer ${token}`;
  return request;
};

const responseHandler = async response => {
  const user = await AsyncStorage.getItem('user');
  const token = JSON.parse(user)?.tokens?.access_token;
  response.headers['Authorization'] = `Bearer ${token}`;
  return response;
};

const errorHandler = async err => {
  // const originalConfig = err.config;
  if (err.response.status === 401) {
    AsyncStorage.clear();
    RootNavigation.navigate(routes.auth);
    Toast.show('Session expired, please login again');

  } else {
    let error = err?.response?.data?.message;
    Toast.show(Array.isArray(error) ? error[0] : error);
  }
  // else if (err.response.status === 403) {
  //   Toast.show('Session Expired 403');
  //   // AsyncStorage.clear();
  // }
  // console.log("ERROR INTERCEPTORS",err);
  // Toast.show('Error');

  return Promise.reject(err);
};

const setup = () => {
  axios.interceptors.request.use(
    request => requestHandler(request),
    error => Promise.reject(error),
  );

  axios.interceptors.response.use(
    response => responseHandler(response),
    error => errorHandler(error),
  );
};

export default setup;
