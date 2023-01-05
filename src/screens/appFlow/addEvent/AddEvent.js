import {View, Text, Pressable, ScrollView, Image, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import styles from './Styles';
import {height, totalSize, width} from 'react-native-dimension';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../../utils/constants/colors';
import AntIcon from 'react-native-vector-icons/dist/AntDesign';
import CustomInput from '../../../components/CustomInput';
import DropDown from '../../../components/DropDown';
import useEventApi from '../../../utils/api/event.api';
import {getDropDownObj} from '../../../utils/helper/functions';
import InputDatePicker from '../../../components/InputDatePicker';
import useCultureApi from '../../../utils/api/culture.api';
import {launchImageLibrary} from 'react-native-image-picker';
import CheckBoxWithLable from '../../../components/CheckBoxWithLable';
import CustomButton from '../../../components/CustomButton';
import TicketListContainer from './TicketListContainer';
import {useUser} from '../../../utils/context/UserContenxt';
import GoogleSearch from '../../../components/GoogleSearch';
const AddEvent = () => {
  const userData = useUser();
  const user = userData?.user;
  const [addEventdata, setaddEventdata] = useState({
    title: '',
    about: '',
    eventType: '',
    culture: '',
    cultureGroup: '',
    tags: '',
    startTime: '',
    startDate: '',
    endDate: '',
    endTime: '',
    timeZone: '',
    images: [],
    isChecked: false,
    ticketList: [
      {
        categoryName: '',
        quantity: '',
        price: '',
        salestartdate: '',
        salestarttime: '',
        salesenddate: '',
        salesendtime: '',
      },
    ],
  });
  const [isPerson, setisPerson] = useState(true);
  const [isVenuName, setisVenuName] = useState(true);

  const navigation = useNavigation();

  // Fetch All on Load Api Data
  const {
    useFetchEventTypesService,
    useHandleSearchTagsService,
    useHandleCreateEventService,
  } = useEventApi();
  const {data: eventTypeData, isLoading: typeDataLoading} =
    useFetchEventTypesService();
  const {isLoading: createEventLoading, mutate} = useHandleCreateEventService(
    user?._id,
  );
  const {
    useFetchAllCultureGroupsService,
    useFetchAllTimeZoneService,
    useFetchAllCulturesService,
  } = useCultureApi();

  const {data: timeZoneData, isLoading: timeZoneDataLoading} =
    useFetchAllTimeZoneService();
  const {data: cultureGroupData, isLoading: cultureGroupDataLoading} =
    useFetchAllCultureGroupsService();
  const {data: cultureData, isLoading: cultureDataLoading} =
    useFetchAllCulturesService();
  const {data: tagsData, isLoading: tagsDataLoaging} =
    useHandleSearchTagsService(true, '');

  //Handlers
  const imageUploadHandler = async () => {
    const options = {noData: true, selectionLimit: 0};
    const result = await launchImageLibrary(options);
    console.log(result);
    let obj = {
      ...addEventdata,
      images: [...addEventdata.images, ...result.assets],
    };
    // console.log(obj);
    setaddEventdata(obj);
  };

  return (
    <View style={styles.wraper}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.row}>
          <AntIcon name="arrowleft" size={totalSize(2)} color={colors.black} />
          <Text style={styles.backLink}>Back</Text>
        </Pressable>
        <Text style={styles.headerHeading}>Add Event</Text>
        <View></View>
      </View>
      {typeDataLoading ||
      timeZoneDataLoading ||
      cultureGroupDataLoading ||
      cultureDataLoading ||
      tagsDataLoaging ? (
        <>
          <View
            style={{
              width: '100%',
              height: height(65),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size={'large'} color={colors.secondary} />
          </View>
        </>
      ) : (
        <ScrollView>
          <Text style={styles.secondHeading}>Event Info</Text>
          <View style={{width: width(100), alignItems: 'center'}}>
            <CustomInput
              placeholder="Title"
              value={addEventdata.title}
              onChangeText={value =>
                setaddEventdata({...addEventdata, title: value})
              }
            />

            <CustomInput
              placeholder="About Event"
              value={addEventdata.about}
              onChangeText={value =>
                setaddEventdata({...addEventdata, about: value})
              }
              multiline={true}
              numberOfLines={10}
            />
            <DropDown
              list={getDropDownObj(eventTypeData)}
              setState={setaddEventdata}
              stateKey="eventType"
              placeholder="Event Type"
              extraData={addEventdata}
              zIndex={5000}
              zIndexInverse={1000}
              // defaultValue={getDropDownObj(eventTypeData)[0].value}
            />
            <DropDown
              list={getDropDownObj(cultureData?.data?.data, 'culture')}
              setState={setaddEventdata}
              stateKey="culture"
              placeholder="Culture"
              extraData={addEventdata}
              newStyles={{marginVertical: height(1)}}
              zIndex={4000}
              zIndexInverse={2000}
            />
            <DropDown
              list={getDropDownObj(cultureGroupData, 'cultureGroup')}
              setState={setaddEventdata}
              stateKey="cultureGroup"
              placeholder="Culture Group"
              extraData={addEventdata}
              zIndex={2000}
              zIndexInverse={3000}
            />
          </View>
          <Text style={{...styles.secondHeading, marginTop: height(3)}}>
            Tags
          </Text>
          <Text style={styles.detailText}>
            Add tags relevant to the subject matter to improve discoverability
            of your event.
          </Text>
          <DropDown
            list={getDropDownObj(tagsData, 'name')}
            setState={setaddEventdata}
            stateKey="tags"
            placeholder="Tags"
            extraData={addEventdata}
            zIndex={2000}
            zIndexInverse={4000}
            addCustomItem={true}
            multiple={true}
          />

          <Text style={{...styles.secondHeading, marginTop: height(3)}}>
            Date And Time
          </Text>
          <Text style={styles.detailText}>Event Start Date </Text>
          <InputDatePicker
            value={
              addEventdata.startDate &&
              `${addEventdata?.startDate?.getDate()}-${
                addEventdata?.startDate?.getMonth() + 1
              }-${addEventdata?.startDate?.getFullYear()}`
            }
            setValue={setaddEventdata}
            extraData={addEventdata}
            stateName="startDate"
            placeHolder="Start Date"
          />
          <Text style={styles.detailText}>Event Start Time</Text>
          <InputDatePicker
            value={
              addEventdata.startTime &&
              `${
                addEventdata?.startTime?.getHours() < 10
                  ? `0${addEventdata?.startTime?.getHours()}`
                  : addEventdata?.startTime?.getHours()
              }:${addEventdata?.startTime?.getMinutes()}`
            }
            setValue={setaddEventdata}
            extraData={addEventdata}
            stateName="startTime"
            mode="time"
            placeHolder="Start Time"
          />
          <Text style={{...styles.detailText, marginTop: height(2)}}>
            Event End Date
          </Text>
          <InputDatePicker
            value={
              addEventdata.endDate &&
              `${addEventdata?.endDate?.getDate()}-${
                addEventdata?.endDate?.getMonth() + 1
              }-${addEventdata?.endDate?.getFullYear()}`
            }
            setValue={setaddEventdata}
            extraData={addEventdata}
            stateName="endDate"
            placeHolder="End Date"
          />
          <Text style={{...styles.detailText, marginTop: height(2)}}>
            Event End Time
          </Text>
          <InputDatePicker
            value={
              addEventdata.endTime &&
              `${
                addEventdata?.endTime?.getHours() < 10
                  ? `0${addEventdata?.endTime?.getHours()}`
                  : addEventdata?.endTime?.getHours()
              }:${addEventdata?.endTime?.getMinutes()}`
            }
            setValue={setaddEventdata}
            extraData={addEventdata}
            stateName="endTime"
            mode="time"
            placeHolder="End Time"
          />
          <DropDown
            list={getDropDownObj(timeZoneData, 'label')}
            setState={setaddEventdata}
            stateKey="timeZone"
            placeholder="Time Zone"
            extraData={addEventdata}
            newStyles={{marginTop: height(3)}}
            zIndex={1000}
            zIndexInverse={5000}
          />
          <Text style={{...styles.secondHeading, marginTop: height(3)}}>
            Location
          </Text>
          <Text style={styles.detailText}>
            Help people in the area discover your event and let attendees know
            where to show up.
          </Text>
          <Text style={styles.detailText}>
            Choose if the event is at a live venue or online event
          </Text>
          <View
            style={{
              ...styles.row,
              marginHorizontal: width(4),
              marginVertical: height(1),
            }}>
            <Pressable
              style={
                isPerson ? styles.addeventTabActive : styles.addeventTabInActive
              }
              onPress={() => setisPerson(true)}>
              <Text style={{color: isPerson ? colors.white : colors.primary}}>
                In Person
              </Text>
            </Pressable>
            <Pressable
              style={
                !isPerson
                  ? styles.addeventTabActive
                  : styles.addeventTabInActive
              }
              onPress={() => setisPerson(false)}>
              <Text style={{color: !isPerson ? colors.white : colors.primary}}>
                Online
              </Text>
            </Pressable>
          </View>
          <View style={{width: width(100), alignItems: 'center'}}>
            {isPerson ? (
              <>
                <View style={{width: width(100), alignItems: 'flex-start'}}>
                  <Text style={styles.detailText}>
                    Either add a venue address explicitly or just find your
                    venue name.
                  </Text>
                </View>
                <View
                  style={{
                    ...styles.row,
                    marginHorizontal: width(4),
                    marginVertical: height(1),
                    width: width(95),
                  }}>
                  <Pressable
                    style={
                      isVenuName
                        ? styles.addeventTabActive
                        : styles.addeventTabInActive
                    }
                    onPress={() => setisVenuName(true)}>
                    <Text
                      style={{
                        color: isVenuName ? colors.white : colors.primary,
                      }}>
                      Venue Name
                    </Text>
                  </Pressable>
                  <Pressable
                    style={
                      !isVenuName
                        ? styles.addeventTabActive
                        : styles.addeventTabInActive
                    }
                    onPress={() => setisVenuName(false)}>
                    <Text
                      style={{
                        color: !isVenuName ? colors.white : colors.primary,
                      }}>
                      Venue Address
                    </Text>
                  </Pressable>
                </View>
              </>
            ) : (
              <>
                <View style={{width: width(100), alignItems: 'flex-start'}}>
                  <Text style={styles.detailText}>
                    Add link of your online event.
                  </Text>
                </View>

                <CustomInput
                  placeholder="Add a meeting link for your online event"
                  value={addEventdata.link}
                  onChangeText={value =>
                    setaddEventdata({...addEventdata, link: value})
                  }
                />
              </>
            )}
          </View>
          {isVenuName ? (
            <View
              style={{
                alignItems: 'center',
                width: width(100),
                paddingHorizontal: width(3),
                marginVertical: height(1.5),
              }}>
              <GoogleSearch />
            </View>
          ) : (
            <View style={{alignItems: 'center'}}>
              <CustomInput
                placeholder="Area"
                value={addEventdata.title}
                onChangeText={value =>
                  setaddEventdata({...addEventdata, title: value})
                }
              />
              <CustomInput
                placeholder="Apartment, unit, suite, or floor #"
                value={addEventdata.title}
                onChangeText={value =>
                  setaddEventdata({...addEventdata, title: value})
                }
              />
              <CustomInput
                placeholder="City "
                value={addEventdata.title}
                onChangeText={value =>
                  setaddEventdata({...addEventdata, title: value})
                }
              />
              <CustomInput
                placeholder="State/Province"
                value={addEventdata.title}
                onChangeText={value =>
                  setaddEventdata({...addEventdata, title: value})
                }
              />
              <CustomInput
                placeholder="Postal Code"
                value={addEventdata.title}
                onChangeText={value =>
                  setaddEventdata({...addEventdata, title: value})
                }
              />
              <CustomInput
                placeholder="Country/Region"
                value={addEventdata.title}
                onChangeText={value =>
                  setaddEventdata({...addEventdata, title: value})
                }
              />
            </View>
          )}
          <Text style={{...styles.secondHeading, marginTop: height(3)}}>
            Event Photo
          </Text>
          <Text style={styles.detailText}>
            Upload a high resolution image Image ratio of 8:6
          </Text>
          <View style={styles.imageUploadContianer}>
            {addEventdata.images.length > 0 ? (
              <>
                {addEventdata.images.map((image, index) => (
                  <>
                    <Image
                      key={index + 31254}
                      source={{uri: image?.uri}}
                      style={{width: width(30), height: height(15)}}
                      resizeMode="contain"
                    />
                  </>
                ))}
              </>
            ) : (
              <Pressable onPress={imageUploadHandler}>
                <Text>Click to add Images</Text>
              </Pressable>
            )}
          </View>
          <Text style={{...styles.secondHeading, marginTop: height(3)}}>
            Tickets
          </Text>
          {addEventdata.ticketList.map((ticket, index) => (
            <>
              <TicketListContainer
                key={index + 53453}
                index={index}
                addEventdata={addEventdata}
                setaddEventdata={setaddEventdata}
              />
            </>
          ))}
          <Pressable
            style={{
              ...styles.addeventTabActive,
              width: width(80),
              alignSelf: 'center',
            }}
            onPress={() => {
              setaddEventdata({
                ...addEventdata,
                ticketList: [
                  ...addEventdata.ticketList,
                  {
                    categoryName: '',
                    quantity: '',
                    price: '',
                    salestartdate: '',
                    salestarttime: '',
                    salesenddate: '',
                    salesendtime: '',
                  },
                ],
              });
            }}>
            <Text
              style={{
                color: colors.white,
              }}>
              Add Additional Ticket Categories
            </Text>
          </Pressable>
          <View></View>
          <Text style={{...styles.secondHeading, marginTop: height(3)}}>
            Absorb Fees
          </Text>
          <View
            style={{
              width: width(95),
              paddingRight: width(9),
              marginVertical: height(1.5),
            }}>
            <CheckBoxWithLable
              isChecked={addEventdata.isChecked}
              onChange={() =>
                setaddEventdata({
                  ...addEventdata,
                  isChecked: !addEventdata.isChecked,
                })
              }
              label="I will pay for the platform fee on ticket purchase"
              // linkedLabel="Terms and Condition"
              // linkPress={() => handlePresentModalPress()}
            />
          </View>
          <Text style={{...styles.secondHeading, marginTop: height(3)}}>
            Special Message
          </Text>
          <Text style={styles.detailText}>
            Write down a special message which a seeker will receive with their
            ticket payment receipt.
          </Text>
          <View style={{width: width(100), alignItems: 'center'}}>
            <CustomInput
              placeholder="Special Message"
              value={addEventdata.message}
              onChangeText={value =>
                setaddEventdata({...addEventdata, message: value})
              }
              multiline={true}
              numberOfLines={10}
            />
          </View>
          <View style={{width: width(100), alignItems: 'center'}}>
            <CustomButton
              labeColor={colors.light}
              bgColor={colors.secondary}
              onPress={() => mutate(addEventdata)}
              label="Create Event"
              loading={createEventLoading}
            />
          </View>
          <View style={{height: height(7)}}></View>
        </ScrollView>
      )}
    </View>
  );
};

export default AddEvent;
