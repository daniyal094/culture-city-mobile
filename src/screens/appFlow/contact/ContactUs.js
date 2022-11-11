import {View, Text, Pressable, ImageBackground} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './Styles';
import {totalSize} from 'react-native-dimension';
import AntIcon from 'react-native-vector-icons/dist/AntDesign';
import {colors} from '../../../utils/constants/colors';
import {useNavigation} from '@react-navigation/native';
import contactBanner from '../../../assets/images/contactBanner.png';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import CustomInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';
import {getAsyncStorage} from '../../../utils/helper/functions';
import useContactApi from '../../../utils/api/contact.api';
import DropDown from '../../../components/DropDown';
const ContactUs = () => {
  const navigation = useNavigation();
  const [user, setuser] = useState('');
  const [contactData, setcontactData] = useState({
    phone: '',
    reason: '',
    message: '',
  });

  const {useHandleContactUsService} = useContactApi();
  const {isLoading: isContactLoading, mutate} = useHandleContactUsService();

  useEffect(() => {
    //get user from async storage
    getAsyncStorage('user').then(res => setuser(res.user));
  }, []);

  const contactHandler = () => {
    const apiData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      ...contactData,
    };
    console.log(apiData);
    mutate(apiData);
  };
  return (
    <View style={styles.wraper}>
      <ImageBackground
        source={contactBanner}
        resizeMode="cover"
        style={styles.imgContainer}>
        <Pressable onPress={() => navigation.goBack()} style={styles.header}>
          <AntIcon
            name="arrowleft"
            size={totalSize(2.5)}
            color={colors.white}
          />
          <Text style={styles.backLink}>Back</Text>
        </Pressable>
        <Text style={styles.heading}>Contact Us</Text>
      </ImageBackground>
      <View style={styles.row}>
        <MaterialCommunityIcons
          name="email"
          size={totalSize(2.8)}
          color={colors.black}
        />
        <Text style={styles.detailText}>Dinfo@ethnic.events</Text>
      </View>
      <View style={styles.row}>
        <MaterialCommunityIcons
          name="phone"
          size={totalSize(2.8)}
          color={colors.black}
        />
        <Text style={styles.detailText}>773-315-9440</Text>
      </View>
      <View style={styles.row}>
        <MaterialIcons
          name="location-on"
          size={totalSize(2.8)}
          color={colors.black}
        />
        <Text style={styles.detailText}>
          1871 12th floor 222 W Merchandise Mart Plaza, Chicago, IL 60654
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <CustomInput
          placeholder="Phone Number"
          value={contactData.phone}
          onChangeText={value => setcontactData({...contactData, phone: value})}
        />
        {/* <CustomInput
          placeholder="Subject"
          value={contactData.reason}
          onChangeText={value =>
            setcontactData({...contactData, reason: value})
          }
        /> */}
        <DropDown
          list={[
            {label: 'Event Registration', value: 'Event Registration'},
            {label: 'Account Creation', value: 'Account Creation'},
            {label: 'Searching for event', value: 'Searching for event'},
            {label: 'Billing Issue', value: 'Billing Issue'},
            {label: 'Other', value: 'Other'},
          ]}
          extraData={contactData}
          setState={setcontactData}
          stateKey="reason"
        />
        <CustomInput
          placeholder="Message"
          value={contactData.message}
          onChangeText={value =>
            setcontactData({...contactData, message: value})
          }
          multiline={true}
          numberOfLines={10}
        />

        <CustomButton
          labeColor={colors.light}
          bgColor={colors.secondary}
          onPress={contactHandler}
          label="Sign In"
          loading={isContactLoading}
        />
      </View>
    </View>
  );
};

export default ContactUs;
