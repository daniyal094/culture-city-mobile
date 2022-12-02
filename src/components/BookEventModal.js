import React, {useCallback, useMemo, useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {height, totalSize, width} from 'react-native-dimension';
import {colors} from '../utils/constants/colors';
import AntIcon from 'react-native-vector-icons/dist/AntDesign';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import CustomButton from './CustomButton';
import DropDown from './DropDown';
const BookEventModal = ({bottomSheetModalRef, data}) => {
  // Ticket Counter
  const [counter, setcounter] = useState(0);
  const [ticketType, setticketType] = useState('');
  // variables
  const snapPoints = useMemo(() => ['54%', '54%'], []);

  // callbacks
  const closeHandler = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  // Ticket Count Handler
  const countHandler = type => {
    if (type === 'plus') {
      setcounter(counter + 1);
    }
    if (type === 'minus' && counter > 0) {
      setcounter(counter - 1);
    }
  };
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
                  {data?.startDateTime}
                </Text>
              </View>
              <View style={{...styles.flexRow, marginTop: height(0.5)}}>
                <Text style={{color: colors.black, fontWeight: '500'}}>
                  End date:
                </Text>
                <Text
                  style={{color: colors.disableColor, marginLeft: width(3.3)}}>
                  {data?.endDateTime}
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

            <View style={styles.ticketContainer}>
              <Text
                style={{
                  color: colors.coal,
                  fontWeight: '500',
                  fontSize: totalSize(2),
                }}>
                Tickets{' '}
              </Text>
              <View style={{...styles.flexRow, alignItems: 'center'}}>
                <Pressable
                  style={styles.counterBox}
                  onPress={() => countHandler('minus')}>
                  <AntIcon
                    name="minus"
                    color={colors.black}
                    size={totalSize(1.3)}
                  />
                </Pressable>
                <Text style={{color: colors.black}}>{counter}</Text>
                <Pressable
                  style={styles.counterBox}
                  onPress={() => countHandler('plus')}>
                  <AntIcon
                    name="plus"
                    color={colors.black}
                    size={totalSize(1.3)}
                  />
                </Pressable>
              </View>
            </View>
            {!data?.tickets?.isFree && (
              <DropDown
                list={data?.tickets?.categories?.map(item => {
                  return {label: item?.name, value: item};
                })}
                setState={setticketType}
                stateKey="ticketType"
              />
            )}
            <View style={styles.btnContainer}>
              <CustomButton
                labeColor={colors.light}
                bgColor={colors.secondary}
                onPress={() => {
                  console.log('herer');
                }}
                label="Make a Reservation"
                // loading={isLoginLoading}
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
    flex: 1,
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
  ticketContainer: {
    paddingHorizontal: width(7),
    paddingVertical: height(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnContainer: {
    marginVertical: height(1),
    width: width(100),

    alignItems: 'center',
  },
  counterBox: {
    padding: totalSize(1),
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    marginHorizontal: width(2),
  },
});

export default BookEventModal;
