import {ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './Styles';
import CustomButton from '../../../components/CustomButton';
import {colors} from '../../../utils/constants/colors';
import useUserApi from '../../../utils/api/user.api';
import {height} from 'react-native-dimension';
import DropDown from '../../../components/DropDown';
import {countries} from '../../../utils/constants/countries';
import CustomInput from '../../../components/CustomInput';
const ProfileEdit = ({userData, setisEdit}) => {
  const [profileData, setprofileData] = useState({
    firstName: userData?.firstName,
    lastName: userData?.lastName,
    bio: userData?.bio,
    organization: userData?.organization || '',
    country: userData?.country,
    latitude: 24.8999964,
    longitude: 67.083333,
  });
  const {useChangeUserInforService} = useUserApi();
  const {
    isLoading: isProfileLoading,
    mutate,
    isSuccess,
  } = useChangeUserInforService();
  const profileChangeHandler = () => {
    mutate({...profileData, id: userData._id});
  };
  useEffect(() => {
    if (isSuccess) {
      setisEdit(false);
    }
  }, [isSuccess]);

  return (
    <ScrollView>
      <View style={styles.editProfileContainer}>
        <CustomInput
          value={profileData.firstName}
          onChangeText={value =>
            setprofileData({...profileData, firstName: value})
          }
        />
        <CustomInput
          value={profileData.lastName}
          onChangeText={value =>
            setprofileData({...profileData, lastName: value})
          }
        />
        {userData?.role === 'organization' && (
          <CustomInput
            value={profileData.organization}
            onChangeText={value =>
              setprofileData({...profileData, organization: value})
            }
          />
        )}
        <DropDown
          list={countries?.map(item => {
            return {label: item?.name, value: item?._id};
          })}
          extraData={profileData}
          setState={setprofileData}
          stateKey="country"
          defaultVlue={profileData.country}
        />
        <CustomInput
          style={{...styles.editInput, minHeight: height(10)}}
          value={profileData.bio}
          multiline={true}
          numberOfLines={3}
          onChangeText={value => setprofileData({...profileData, bio: value})}
        />
        <CustomButton
          labeColor={colors.light}
          bgColor={colors.secondary}
          onPress={profileChangeHandler}
          label="Save Changes"
          loading={isProfileLoading}
        />
      </View>
    </ScrollView>
  );
};

export default ProfileEdit;
