import React, {useCallback, useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {routes} from '../../utils/constants/routes';
import SignIn from '../../screens/authFlow/signIn/SignIn';
import SignUp from '../../screens/authFlow/signUp/SignUp';
import ForgotPassword from '../../screens/authFlow/forgotPassword/ForgotPassword';
import InvalidEmail from '../../screens/authFlow/invalidEmail/InvalidEmail';
import Interest from '../../screens/authFlow/interest/Interest';
import Verification from '../../screens/authFlow/verification/Verification';
import NewPass from '../../screens/authFlow/newPass/NewPass';
import Landing from '../../screens/authFlow/landing/Landing';
const AuthStack = createNativeStackNavigator();
const AuthNavigation = props => {
  const propsData = props.route.params;
  const [isVerified, setisVerified] = useState(false);

  const getuser =  useCallback(() => {
    setisVerified(propsData?.user);
  }, [propsData?.user]);
  useEffect(() => {
    getuser()
  }, [propsData]);

  return (
    <>
      <AuthStack.Navigator
        initialRouteName={isVerified ? routes.verification : routes.landing}
        screenOptions={{headerShown: false}}>
        <AuthStack.Screen name={routes.signin} component={SignIn} />
        <AuthStack.Screen name={routes.signup} component={SignUp} />
        <AuthStack.Screen name={routes.forgotPass} component={ForgotPassword} />
        <AuthStack.Screen
          name={routes.errorForgotPass}
          component={InvalidEmail}
        />
        <AuthStack.Screen name={routes.verification} component={Verification} />
        <AuthStack.Screen name={routes.profileInterest} component={Interest} />
        <AuthStack.Screen name={routes.newPass} component={NewPass} />
        <AuthStack.Screen name={routes.landing} component={Landing} />
      </AuthStack.Navigator>
    </>
  );
};

export default AuthNavigation;
