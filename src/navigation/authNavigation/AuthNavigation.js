import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {routes} from '../../utils/constants/routes';
import SignIn from '../../screens/authFlow/signIn/SignIn';
import SignUp from '../../screens/authFlow/signUp/SignUp';
import ForgotPassword from '../../screens/authFlow/forgotPassword/ForgotPassword';
import InvalidEmail from '../../screens/authFlow/invalidEmail/InvalidEmail';
import Interest from '../../screens/authFlow/interest/Interest';

const AuthStack = createNativeStackNavigator();
const AuthNavigation = () => {
  return (
    <AuthStack.Navigator
      initialRouteName={routes.signin}
      screenOptions={{headerShown: false}}>
      <AuthStack.Screen name={routes.signin} component={SignIn} />
      <AuthStack.Screen name={routes.signup} component={SignUp} />
      <AuthStack.Screen name={routes.forgotPass} component={ForgotPassword} />
      <AuthStack.Screen
        name={routes.errorForgotPass}
        component={InvalidEmail}
      />
      <AuthStack.Screen name={routes.profileInterest} component={Interest} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;
