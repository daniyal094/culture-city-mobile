import React, {useCallback, useMemo} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {height, totalSize, width} from 'react-native-dimension';
import {colors} from '../utils/constants/colors';
import AntIcon from 'react-native-vector-icons/dist/AntDesign';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import CustomButton from './CustomButton';

import TicketCounter from './TicketCounter';
import {useNavigation} from '@react-navigation/native';
import {routes} from '../utils/constants/routes';
const BookEventModal = ({
  bottomSheetModalRef,
  data,
  RemainingTickesData,
  eventId,
}) => {
  const navigation = useNavigation();

  // variables
  const snapPoints = useMemo(() => ['60%', '60%'], []);

  // callbacks
  const closeHandler = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

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
              <Text style={styles.EventHeading}>{data?.title}</Text>
              <View style={styles.flexRow}>
                <Entypo
                  name="location-pin"
                  color={colors.coal}
                  size={totalSize(2)}
                />
                <Text style={{color: colors.disableColor}}>
                  {data?.timezone} (Timezone)
                </Text>
              </View>
              <View style={{...styles.flexRow, marginTop: height(1)}}>
                <Text style={{color: colors.black, fontWeight: '500'}}>
                  Start date:
                </Text>
                <Text
                  style={{color: colors.disableColor, marginLeft: width(2)}}>
                  {data?.startDateTime?.split('T')[0]}
                </Text>
              </View>
              <View style={{...styles.flexRow, marginTop: height(0.5)}}>
                <Text style={{color: colors.black, fontWeight: '500'}}>
                  End date:
                </Text>
                <Text
                  style={{color: colors.disableColor, marginLeft: width(3.3)}}>
                  {data?.endDateTime?.split('T')[0]}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: width(100),
                borderTopWidth: 1,
                borderTopColor: colors.disableColor,
                marginVertical: height(2),
              }}></View>
            {data?.tickets?.categories?.map((item, index) => {
              const obj = {
                ...item,
                limit: RemainingTickesData?.find(i => i._id === item._id)
                  ?.ticketsRemaining,
              };
              return (
                <View key={index + 34123}>
                  <TicketCounter
                    data={obj}
                    eventId={eventId}
                    organizerId={data?.creator?._id}
                    eventName={data?.title}
                    isCart={false}
                  />
                </View>
              );
            })}

            <View style={styles.btnContainer}>
              <CustomButton
                labeColor={colors.light}
                bgColor={colors.secondary}
                onPress={() => {
                  navigation.navigate(routes.cart);
                  closeHandler();
                }}
                label="Make a Reservation"
                // loading={isLoading}
              />
            </View>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  contentContainer: {
    paddingHorizontal: width(5),
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  EventHeading: {
    fontSize: totalSize(4),
    color: colors.black,
    fontWeight: '500',
    // letterSpacing:1,
    marginTop: height(2),
  },
  flexRow: {
    flexDirection: 'row',
  },
  btnContainer: {
    marginVertical: height(1),
    width: width(100),

    alignItems: 'center',
  },
});

export default BookEventModal;
