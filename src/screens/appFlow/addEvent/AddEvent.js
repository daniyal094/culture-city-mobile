import {View, Text, Pressable, ScrollView} from 'react-native';
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
const AddEvent = () => {
  const [addEventdata, setaddEventdata] = useState({
    title: '',
    about: '',
    eventType: '',
    culture: '',
    cultureGroup: '',
    tags: '',
    startTime: '',
    endTime: '',
    timeZone: '',
  });
  const navigation = useNavigation();

  // Fetch All on Load Api Data
  const {useFetchEventTypesService} = useEventApi();
  const {data: eventTypeData} = useFetchEventTypesService();

  const {useFetchAllTimeZoneService} = useCultureApi();
  const {data: timeZoneData} = useFetchAllTimeZoneService();

  console.log(timeZoneData);

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
          />
          <DropDown
            list={getDropDownObj(eventTypeData)}
            setState={setaddEventdata}
            stateKey="culture"
            placeholder="Culture"
            extraData={addEventdata}
            newStyles={{marginVertical: height(1)}}
            zIndex={4000}
            zIndexInverse={2000}
          />
          <DropDown
            list={getDropDownObj(eventTypeData)}
            setState={setaddEventdata}
            stateKey="cultureGroup"
            placeholder="Culture Group"
            extraData={addEventdata}
            zIndex={3000}
            zIndexInverse={3000}
          />
        </View>
        <Text style={{...styles.secondHeading, marginTop: height(3)}}>
          Tags
        </Text>
        <Text style={styles.detailText}>
          Add tags relevant to the subject matter to improve discoverability of
          your event.
        </Text>
        <DropDown
          list={getDropDownObj(eventTypeData)}
          setState={setaddEventdata}
          stateKey="tags"
          placeholder="Tags"
          extraData={addEventdata}
          zIndex={2000}
          zIndexInverse={4000}
        />

        <Text style={{...styles.secondHeading, marginTop: height(3)}}>
          Date And Time
        </Text>
        <Text style={styles.detailText}>Event Start Date And Time</Text>
        <InputDatePicker
          value={addEventdata.startTime}
          setValue={setaddEventdata}
          extraData={addEventdata}
          stateName="startTime"
        />
        <Text style={{...styles.detailText, marginTop: height(2)}}>
          Event End Date And Time
        </Text>
        <InputDatePicker
          value={addEventdata.endTime}
          setValue={setaddEventdata}
          extraData={addEventdata}
          stateName="endTime"
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
        <View style={{height: height(7)}}></View>
      </ScrollView>
    </View>
  );
};

export default AddEvent;
