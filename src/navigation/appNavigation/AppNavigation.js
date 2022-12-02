import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from '../../screens/appFlow/dashboard/Dashboard';
import {routes} from '../../utils/constants/routes';
import Search from '../../screens/appFlow/search/Search';
import Profile from '../../screens/appFlow/profile/Profile';
import EventDetail from '../../screens/appFlow/eventDetail/EventDetail';
import ChangePassword from '../../screens/appFlow/changePassword/ChangePassword';
import ChangeSuccess from '../../screens/appFlow/changePassword/ChangeSuccess';
import ContactUs from '../../screens/appFlow/contact/ContactUs';
import AboutUs from '../../screens/appFlow/aboutUs/AboutUs';
import Event from '../../screens/appFlow/event/Event';
import MyBooking from '../../screens/appFlow/myBooking/MyBooking';
import MyBookmark from '../../screens/appFlow/myBookmark/MyBookmark';
import GetDirection from '../../screens/appFlow/getDirection/GetDirection';
import AddEvent from '../../screens/appFlow/addEvent/AddEvent';
import MyEvents from '../../screens/appFlow/myEvents/MyEvents';

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
      <AppStack.Screen name={routes.changePass} component={ChangePassword} />
      <AppStack.Screen
        name={routes.changePassSuccess}
        component={ChangeSuccess}
      />
      <AppStack.Screen name={routes.contact} component={ContactUs} />
      <AppStack.Screen name={routes.aboutUs} component={AboutUs} />
      <AppStack.Screen name={routes.eventList} component={Event} />
      <AppStack.Screen name={routes.myBooking} component={MyBooking} />
      <AppStack.Screen name={routes.myBookmark} component={MyBookmark} />
      <AppStack.Screen name={routes.direction} component={GetDirection} />
      <AppStack.Screen name={routes.addEvent} component={AddEvent} />
      <AppStack.Screen name={routes.myEvents} component={MyEvents} />
    
    </AppStack.Navigator>
  );
};

export default AppNavigation;
