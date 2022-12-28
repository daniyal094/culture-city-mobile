import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthNavigation from './authNavigation/AuthNavigation';
import AppNavigation from './appNavigation/AppNavigation';
import Splash from '../screens/authFlow/splash/Splash';
import {routes} from '../utils/constants/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUserUpdate} from '../utils/context/UserContenxt';
import {navigationRef} from './RootNavigation';
import {useCartUpdate} from '../utils/context/CartContext';
import { enableFreeze } from 'react-native-screens';

const MainStack = createNativeStackNavigator();

export default function Navigation() {
  const [loading, setLoading] = useState(true);
  const [user, setuser] = useState({});
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const updateUser = useUserUpdate();
  const updateCart = useCartUpdate();
  const getAsyncStorage = async () => {
    const user = await AsyncStorage.getItem('user');
    const cartData = await AsyncStorage.getItem('cartData');
    setisAuthenticated(
      JSON.parse(user)?.user._id && JSON.parse(user).user.isApproved
        ? true
        : false,
    );
    setuser(JSON.parse(user));
    updateUser({
      user: JSON.parse(user)?.user || '',
      role: JSON.parse(user)?.user?.role || '',
      token: JSON.parse(user)?.tokens || '',
    });
    updateCart(
      JSON.parse(cartData) === null
        ? {
            organizerId: '',
            cartItems: [],
          }
        : JSON.parse(cartData),
    );
  };

  useEffect(() => {
    setTimeout(() => {
      getAsyncStorage().then(() => {
        setLoading(false);
      });
    }, 2500);
  }, []);
  if (loading) return <Splash />;
  else
    return (
      <NavigationContainer ref={navigationRef}>
        <MainStack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName={isAuthenticated ? routes.app : routes.auth}>
          <MainStack.Screen
            name={routes.auth}
            component={AuthNavigation}
            initialParams={{user: user}}
          />
          <MainStack.Screen
            name={routes.app}
            component={AppNavigation}
            initialParams={{user: user}}
          />
        </MainStack.Navigator>
      </NavigationContainer>
    );
}
enableFreeze(true)