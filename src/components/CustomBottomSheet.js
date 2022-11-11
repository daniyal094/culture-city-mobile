import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View, Text, StyleSheet, Pressable, FlatList, Image} from 'react-native';
import {BottomSheetModal, BottomSheetModalProvider,BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {height, totalSize, width} from 'react-native-dimension';
import {colors} from '../utils/constants/colors';
import AntIcon from 'react-native-vector-icons/dist/AntDesign';
import FontIcon from 'react-native-vector-icons/dist/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/dist/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import { routes } from '../utils/constants/routes';
import { getAsyncStorage } from '../utils/helper/functions';

const CustomBottomSheet = ({bottomSheetModalRef}) => {
  const [user, setuser] = useState('');
  const {useHandleLogOutApi} = useAuthApi();
  const navigation = useNavigation();
  const {isLoading: isLogoutLoading, mutate} = useHandleLogOutApi();
 
  useEffect(() => {
    getAsyncStorage('user').then(res => setuser(res.user));
  }, []);
 
  // variables
  const snapPoints = useMemo(() => ['80%', '80%'], []);

  // callbacks
  const closeHandler = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);
  const logoutHandler = async () => {
    const user = await AsyncStorage.getItem('user');
    mutate(JSON.parse(user).user._id);
  };
  const listData = [
    {
      key: 'My Bookings',
      icons: (
        <MaterialIcons
          name="event-available"
          size={totalSize(2)}
          color={colors.pink}
        />
      ),
      link : routes.myBooking
    },
    {
      key: 'Bookmark',
      icons: (
        <AntIcon name="heart" size={totalSize(2)} color={colors.secondary} />
      ),
      link : routes.myBookmark

    },
    {
      key: 'Messages',
      icons: (
        <AntIcon name="message1" size={totalSize(2)} color={colors.green} />
      ),
      link : routes.changePass

    },
    {
      key: 'About Us',
      icons: (
        <FeatherIcon
          name="users"
          size={totalSize(2)}
          color={colors.darkGreen}
        />
      ),
      link : routes.aboutUs

    },
    {
      key: 'Change Password',
      icons: (
        <FontIcon name="lock" size={totalSize(2)} color={colors.skyBlue} />
      ),
      link : routes.changePass

    },
    {
      key: 'Payment',
      icons: (
        <MaterialIcons
          name="payments"
          size={totalSize(2)}
          color={colors.lightPink}
        />
      ),
      link : routes.changePass

    },
    {
      key: 'Contact Us',
      icons: (
        <AntIcon name="contacts" size={totalSize(2)} color={colors.green} />
      ),
      link : routes.contact

    },
    {
      key: 'Events',
      icons: (
        <MaterialIcons name="event" size={totalSize(2)} color={colors.yellow} />
      ),
      link : routes.eventList

    },
  ];
  return (
    <>
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}>
            <View style={styles.contentContainer}>
              <Text></Text>
              <Text style={styles.heading}>Menu</Text>
              <Pressable onPress={closeHandler}>
                <View style={styles.rowCenter}>
                  <AntIcon
                    name="close"
                    size={totalSize(2)}
                    color={colors.coal}
                  />
                  <Text>Close</Text>
                </View>
              </Pressable>
            </View>
            <BottomSheetScrollView>
            <View style={styles.listContainer}>
              <FlatList
                data={listData}
                renderItem={({item}) => (
                  <Pressable onPress={() => {
                    closeHandler()
                    navigation.navigate(item.link,{key :item.key, user : user})}}>
                    <View style={styles.item}>
                      {item?.icons}
                      <Text style={styles.itemHeading}>{item.key}</Text>
                    </View>
                  </Pressable>
                )}
              />
            </View>
            <Pressable onPress={logoutHandler}>
              <View style={{...styles.rowCenter, marginBottom: height(15)}}>
                <FontIcon
                  name="power-off"
                  size={totalSize(1.5)}
                  color={colors.secondary}
                />
                <Text
                  style={{
                    color: colors.secondary,
                    marginLeft: 5,
                    fontWeight: '700',
                  }}>
                  Logout
                </Text>
              </View>
            </Pressable>
            </BottomSheetScrollView>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    textAlign: 'center',

    color: colors.coal,
    fontWeight: '400',
    fontSize: 22,
    letterSpacing: 1,
    marginLeft: width(12),
  },
  contentContainer: {
    width: width(100),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: height(1),
    paddingHorizontal: width(5),
  },
  listContainer: {
    width: width(100),
    marginVertical: height(0),
  },
  item: {
    flexDirection: 'row',
    marginVertical: height(2.5),
    marginLeft: width(15),
  },
  itemHeading: {
    color: colors.black,
    fontWeight: '600',
    fontSize: totalSize(2),
    marginLeft: width(5),
  },
});

export default CustomBottomSheet;
