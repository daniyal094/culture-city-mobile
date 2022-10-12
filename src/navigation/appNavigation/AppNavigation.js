import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from '../../screens/appFlow/dashboard/Dashboard';
import {routes} from '../../utils/constants/routes';

const AppStack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <AppStack.Navigator initialRouteName={routes.home}
    screenOptions={{headerShown: false}}
    
    >
      <AppStack.Screen
        name={routes.home}
        component={Dashboard}
      />
    </AppStack.Navigator>
  );
};

export default AppNavigation;
