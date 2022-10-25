import React, {useCallback, useMemo} from 'react';
import {View, Text, StyleSheet, Pressable, FlatList, Image} from 'react-native';
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

const CustomBottomSheet = ({bottomSheetModalRef}) => {
  // variables
  const snapPoints = useMemo(() => ['90%', '90%'], []);

  // callbacks
  const closeHandler = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

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
    },
    {
      key: 'Bookmark',
      icons: (
        <AntIcon name="heart" size={totalSize(2)} color={colors.secondary} />
      ),
    },
    {
      key: 'Messages',
      icons: (
        <AntIcon name="message1" size={totalSize(2)} color={colors.green} />
      ),
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
    },
    {
      key: 'Change Password',
      icons: (
        <FontIcon name="lock" size={totalSize(2)} color={colors.skyBlue} />
      ),
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
    },
    {
      key: 'Contact Us',
      icons: (
        <AntIcon name="contacts" size={totalSize(2)} color={colors.green} />
      ),
    },
    {
      key: 'Events',
      icons: (
        <MaterialIcons name="event" size={totalSize(2)} color={colors.yellow} />
      ),
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
                    <View style={styles.item}>
                      {item?.icons}
                      <Text style={styles.itemHeading}>{item.key}</Text>
                    </View>
                  )}
                />
              </View>
              <Pressable>
                <View style={{...styles.rowCenter, marginBottom: height(5)}}>
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
    marginVertical: height(5),
  },
  item: {
    flexDirection: 'row',
    marginVertical: height(3),
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
