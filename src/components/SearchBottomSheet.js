import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {height, totalSize, width} from 'react-native-dimension';
import {colors} from '../utils/constants/colors';
import AntIcon from 'react-native-vector-icons/dist/AntDesign';
import {useNavigation} from '@react-navigation/native';
import CustomButton from './CustomButton';
import CustomInput from './CustomInput';
import CheckBoxWithLable from './CheckBoxWithLable';
import DropDown from './DropDown';
import useEventApi from '../utils/api/event.api';
import useCultureApi from '../utils/api/culture.api';
import {routes} from '../utils/constants/routes';
import SimpleToast from 'react-native-simple-toast';

const SearchBottomSheet = ({searchSheetModalRef}) => {
  const [searchData, setsearchData] = useState({
    query: '',
    isFree: false,
    culture: '',
    eventType: '',
    dateFilter: 1,
  });
  const [isChecked, setisChecked] = useState('free');
  const navigation = useNavigation();
  const {useFetchEventTypesService, useFetchGetSearchEventsApi} = useEventApi();
  const {data: eventTypeData} = useFetchEventTypesService();
  const {useFetchAllCultureGroupsService} = useCultureApi();
  const {data: culturesData} = useFetchAllCultureGroupsService();
  const {
    data: searchList,
    isLoading: isSearchLoading,
    mutate,
    isSuccess,
  } = useFetchGetSearchEventsApi();

  useEffect(() => {
    if (isSuccess) {
      navigation.navigate(routes.searchScreen, {
        searchList: searchList?.data?.data,
        queryData: searchData,
      });
    }
  }, [isSuccess]);

  // variables
  const snapPoints = useMemo(() => ['65%', '65%'], []);

  // callbacks
  const closeHandler = useCallback(() => {
    searchSheetModalRef.current?.close();
  }, []);

  const onChangeRadioHandler = value => {
    setisChecked(value);
    setsearchData({...searchData, isFree: value === 'free'});
  };

  const handleSheetChanges = useCallback(index => {
    console.log(index);
  }, []);

  const searchHandler = async () => {
    // if (searchData.dateFilter !== '' && searchData.dateFilter !== '') {
      mutate(searchData);
      closeHandler()
    // } 
    // else {
    //   SimpleToast.show('Fill Search field and date type');
    // }
  };

  return (
    <>
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <BottomSheetModal
            ref={searchSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}>
            <View style={styles.contentContainer}>
              <Text></Text>
              <Text style={styles.heading}>Search Event</Text>
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
            <View style={{alignItems: 'center', paddingTop: height(2)}}>
              <CustomInput
                placeholder="Search.."
                value={searchData.query}
                onChangeText={value =>
                  setsearchData({...searchData, query: value})
                }
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  width: width(70),
                  marginVertical: height(1),
                }}>
                <CheckBoxWithLable
                  label={'Free'}
                  onChange={() => onChangeRadioHandler('free')}
                  isChecked={isChecked === 'free'}
                />

                <CheckBoxWithLable
                  label={'Paid'}
                  onChange={() => onChangeRadioHandler('paid')}
                  isChecked={isChecked === 'paid'}
                />
              </View>
              <DropDown
                list={culturesData?.map(item => {
                  return {label: item?.cultureGroup, value: item?.cultureGroup};
                })}
                newStyles={{marginVertical: height(1)}}
                extraData={searchData}
                setState={setsearchData}
                stateKey="culture"
                zIndex={3000}
                zIndexInverse={1000}
                placeholder="Cultures"
              />
              <DropDown
                list={eventTypeData?.map(item => {
                  return {label: item, value: item};
                })}
                newStyles={{marginVertical: height(1), zIndex: -99}}
                extraData={searchData}
                setState={setsearchData}
                stateKey="eventType"
                zIndex={2000}
                zIndexInverse={2000}
                placeholder="Event Type"
              />
              <DropDown
                list={[
                  {label: 'Any Date', value: 1},
                  {label: 'Today', value: 2},
                  {label: 'This Week', value: 3},
                  {label: 'This Month', value: 4},
                  {label: 'Next Month', value: 5},
                ]}
                newStyles={{marginVertical: height(1)}}
                extraData={searchData}
                setState={setsearchData}
                stateKey="dateFilter"
                placeholder="Date"
                zIndex={1000}
                zIndexInverse={3000}
                defaultVlue={{label: 'Any Date', value: 1}}
              />
              <CustomButton
                labeColor={colors.light}
                bgColor={colors.secondary}
                onPress={searchHandler}
                label="Search"
                loading={isSearchLoading}
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
});

export default SearchBottomSheet;
