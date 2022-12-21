import React, {useCallback, useMemo} from 'react';
import {View, Text, StyleSheet, Pressable, FlatList} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import {height, totalSize, width} from 'react-native-dimension';
import {colors} from '../utils/constants/colors';
import AntIcon from 'react-native-vector-icons/dist/AntDesign';
import FontIcon from 'react-native-vector-icons/dist/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/dist/Feather';
import {useNavigation} from '@react-navigation/native';
import {routes} from '../utils/constants/routes';
import {useUser} from '../utils/context/UserContenxt';
import SimpleToast from 'react-native-simple-toast';

const CustomBottomSheet = ({bottomSheetModalRef}) => {
  const user = useUser();
  const {useHandleLogOutApi} = useAuthApi();
  const navigation = useNavigation();
  const {isLoading: isLogoutLoading, mutate} = useHandleLogOutApi();
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
    if (user.role) {
      mutate(user?.user?._id);
    } else {
      navigation.navigate(routes.auth);
    }
    closeHandler();
  };

  const listData = [
    {
      key: user?.role === 'Organizer' ? 'Add Event' : 'My Bookings',
      icons: (
        <MaterialIcons
          name="event-available"
          size={totalSize(2)}
          color={colors.pink}
        />
      ),
      link: user?.role === 'Organizer' ? routes.addEvent : routes.myBooking,
      isDisabled: !user?.role,
    },
    {
      key: user?.role === 'Organizer' ? 'My Events' : 'Bookmark',
      icons: (
        <AntIcon name="heart" size={totalSize(2)} color={colors.secondary} />
      ),
      link: user?.role === 'Organizer' ? routes.myEvents : routes.myBookmark,
      isDisabled: !user?.role,
    },
    {
      key: 'Messages',
      icons: (
        <AntIcon name="message1" size={totalSize(2)} color={colors.green} />
      ),
      link: routes.changePass,
      isDisabled: true,
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
      link: routes.aboutUs,
      isDisabled: false,
    },
    {
      key: 'Change Password',
      icons: (
        <FontIcon name="lock" size={totalSize(2)} color={colors.skyBlue} />
      ),
      link: routes.changePass,
      isDisabled: !user?.role,
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
      link: routes.changePass,
      isDisabled: !user?.role,
    },
    {
      key: 'Contact Us',
      icons: (
        <AntIcon name="contacts" size={totalSize(2)} color={colors.green} />
      ),
      link: routes.contact,
      isDisabled: !user?.role,
    },
    {
      key: 'Events',
      icons: (
        <MaterialIcons name="event" size={totalSize(2)} color={colors.yellow} />
      ),
      link: routes.eventList,
      isDisabled: false,
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
                    <Pressable
                      onPress={() => {
                        if (!item?.isDisabled) {
                          closeHandler();
                          navigation.navigate(item.link, {
                            key: item.key,
                            user: user,
                          });
                        } else {
                          SimpleToast.show('Please Login First');
                        }
                      }}>
                      <View style={styles.item}>
                        {item?.icons}
                        <Text
                          style={{
                            ...styles.itemHeading,
                            color: item?.isDisabled
                              ? colors.gray
                              : colors.black,
                          }}>
                          {item.key}
                        </Text>
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
                    {user?.role === '' ? 'Login' : 'Logout'}
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
    alignItems: 'center',
  },
  itemHeading: {
    fontWeight: '600',
    fontSize: totalSize(2),
    marginLeft: width(5),
  },
});

export default CustomBottomSheet;
