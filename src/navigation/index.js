import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthNavigation from './authNavigation/AuthNavigation';
import AppNavigation from './appNavigation/AppNavigation';
import Splash from '../screens/authFlow/splash/Splash';
import { routes } from '../utils/constants/routes';


const MainStack = createNativeStackNavigator();

export default function Navigation() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  });

  if (loading) return <Splash />;
  else
    return (
      <NavigationContainer>
        <MainStack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName={routes.auth}>
          <MainStack.Screen name={routes.auth} component={AuthNavigation} />
          <MainStack.Screen name={routes.app} component={AppNavigation} />
        </MainStack.Navigator>
      </NavigationContainer>
    );
}
