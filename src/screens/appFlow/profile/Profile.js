import {View, Text, Pressable, Image, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './Styles';
import TabBar from '../../../components/TabBar';
import AntIcon from 'react-native-vector-icons/dist/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import {totalSize} from 'react-native-dimension';
import {colors} from '../../../utils/constants/colors';
import {useNavigation} from '@react-navigation/native';
import ProfileView from './ProfileView';
import ProfileEdit from './ProfileEdit';
import {getAsyncStorage} from '../../../utils/helper/functions';
import { MEDIA_BASE_URL } from '../../../utils/constants/enums';
import useEventApi from '../../../utils/api/auth.api'
const Profile = () => {
  const [user, setuser] = useState('');
  const [isEdit, setisEdit] = useState(false);
  const navigation = useNavigation();

  console.log(user);
  const backHandler = () => {
    if (!isEdit) {
      navigation.goBack();
    } else {
      setisEdit(!isEdit);
    }
  };
  useEffect(() => {
    //get user from async storage
    getAsyncStorage('user').then(res => setuser(res.user));
  }, []);
  const imgSrc = !user?.profilePicture?.isCompleteUrl
    ? `${MEDIA_BASE_URL}${user?.profilePicture?.url}`
    : user?.profilePicture?.url;

  return (
    <>
      <View style={styles.wraper}>
        {/* <ScrollView> */}
          <View style={styles.headerContainer}>
            <Pressable
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={backHandler}>
              <AntIcon
                name="arrowleft"
                size={totalSize(2)}
                color={colors.coal}
              />
              <Text style={styles.backLink}>Back</Text>
            </Pressable>
            {!isEdit && (
              <Pressable
                style={styles.editBtn}
                onPress={() => setisEdit(!isEdit)}>
                <FontAwesome5
                  name="pencil-alt"
                  size={totalSize(2)}
                  color={colors.white}
                />
              </Pressable>
            )}
          </View>

          <View style={styles.profilePictureContainer}>
            <Image
              source={{uri: imgSrc}}
              resizeMode="cover"
              style={styles.profilePicture}
            />
            {!isEdit && (
              <Text style={styles.heading}>
                {user.firstName + ' ' + user.lastName}
              </Text>
            )}
          </View>
          {!isEdit ? (
            <ProfileView userData={user} />
          ) : (
            <ProfileEdit
              userData={user}
              setisEdit={value => setisEdit(value)}
            />
          )}
        {/* </ScrollView> */}
      </View>
      <TabBar selectedTab={'Profile'} />
    </>
  );
};

export default Profile;
