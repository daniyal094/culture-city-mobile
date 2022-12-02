import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {routes} from '../../utils/constants/routes';
import SignIn from '../../screens/authFlow/signIn/SignIn';
import SignUp from '../../screens/authFlow/signUp/SignUp';
import ForgotPassword from '../../screens/authFlow/forgotPassword/ForgotPassword';
import InvalidEmail from '../../screens/authFlow/invalidEmail/InvalidEmail';
import Interest from '../../screens/authFlow/interest/Interest';
import Verification from '../../screens/authFlow/verification/Verification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NewPass from '../../screens/authFlow/newPass/NewPass';
import {useNavigation} from '@react-navigation/native';
const AuthStack = createNativeStackNavigator();
const AuthNavigation = () => {
  const [isVerified, setisVerified] = useState(false);
  const [isLoading, setisLoading] = useState(true);

  const navigation = useNavigation();
  const getAsyncStorage = async () => {
    const user = await AsyncStorage.getItem('user');
    setisVerified(
      JSON.parse(user)?.user._id && !JSON.parse(user).user.isApproved
        ? true
        : false,
    );
    setisLoading(false);
  };
  useEffect(() => {
    getAsyncStorage();
  }, []);
  return (
    <>
      {!isLoading && (
        <AuthStack.Navigator
          initialRouteName={isVerified ? routes.verification : routes.signin}
          screenOptions={{headerShown: false}}>
          <AuthStack.Screen name={routes.signin} component={SignIn} />
          <AuthStack.Screen name={routes.signup} component={SignUp} />
          <AuthStack.Screen
            name={routes.forgotPass}
            component={ForgotPassword}
          />
          <AuthStack.Screen
            name={routes.errorForgotPass}
            component={InvalidEmail}
          />
          <AuthStack.Screen
            name={routes.verification}
            component={Verification}
          />
          <AuthStack.Screen
            name={routes.profileInterest}
            component={Interest}
          />
          <AuthStack.Screen name={routes.newPass} component={NewPass} />
        </AuthStack.Navigator>
      )}
    </>
  );
};

export default AuthNavigation;
