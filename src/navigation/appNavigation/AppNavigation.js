import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from '../../screens/appFlow/dashboard/Dashboard';
import {routes} from '../../utils/constants/routes';
import Search from '../../screens/appFlow/search/Search';
import Profile from '../../screens/appFlow/profile/Profile';
import EventDetail from '../../screens/appFlow/eventDetail/EventDetail';

const AppStack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <AppStack.Navigator
      initialRouteName={routes.home}
      screenOptions={{headerShown: false}}>
      <AppStack.Screen name={routes.home} component={Dashboard} />
      <AppStack.Screen name={routes.searchScreen} component={Search} />
      <AppStack.Screen name={routes.profile} component={Profile} />
      <AppStack.Screen name={routes.eventDetail} component={EventDetail} />
    </AppStack.Navigator>
  );
};

export default AppNavigation;
