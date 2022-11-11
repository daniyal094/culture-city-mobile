import {View, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './Styles';
import CustomButton from '../../../components/CustomButton';
import {colors} from '../../../utils/constants/colors';
import useEventApi from '../../../utils/api/user.api';
import { height } from 'react-native-dimension';
const ProfileEdit = ({userData, setisEdit}) => {
  const [profileData, setprofileData] = useState({
    firstName: userData?.firstName,
    lastName: userData?.lastName,
    email: userData?.email,
    bio:userData?.bio
  });
  const {useChangeUserInforService} = useEventApi();

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
    <View style={styles.editProfileContainer}>
      <TextInput
        style={styles.editInput}
        value={profileData.firstName}
        onChangeText={value =>
          setprofileData({...profileData, firstName: value})
        }
      />
      <TextInput
        style={styles.editInput}
        value={profileData.lastName}
        onChangeText={value =>
          setprofileData({...profileData, lastName: value})
        }
      />
      <TextInput
        style={styles.editInput}
        value={profileData.email}
        onChangeText={value => setprofileData({...profileData, email: value})}
      />
      <TextInput
        style={{...styles.editInput,minHeight:height(10)}}
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
  );
};

export default ProfileEdit;
