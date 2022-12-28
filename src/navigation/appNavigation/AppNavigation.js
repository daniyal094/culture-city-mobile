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
import Payment from '../../screens/appFlow/payment/Payment';
import PaymentWebView from '../../screens/appFlow/payment/PaymentWebView';
import Cart from '../../screens/appFlow/cart/Cart';
import Bill from '../../screens/appFlow/Bill/Bill';
import BookingSuccess from '../../screens/appFlow/bookingSuccess/BookingSuccess';
import TicketOrders from '../../screens/appFlow/ticketOrders/TicketOrders';

const AppStack = createNativeStackNavigator();

const AppNavigation = props => {
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
      <AppStack.Screen name={routes.payment} component={Payment} />
      <AppStack.Screen name={routes.paymentWeb} component={PaymentWebView} />
      <AppStack.Screen name={routes.cart} component={Cart} />
      <AppStack.Screen name={routes.bill} component={Bill} />
      <AppStack.Screen
        name={routes.bookingSuccess}
        component={BookingSuccess}
      />
      <AppStack.Screen name={routes.tickets} component={TicketOrders} />
    </AppStack.Navigator>
  );
};

export default AppNavigation;
