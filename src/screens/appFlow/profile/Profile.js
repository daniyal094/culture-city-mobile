import {View, Text, Pressable, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import styles from './Styles';
import TabBar from '../../../components/TabBar';
import AntIcon from 'react-native-vector-icons/dist/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import {totalSize} from 'react-native-dimension';
import {colors} from '../../../utils/constants/colors';
import {useNavigation} from '@react-navigation/native';
import Evenet from '../../../assets/images/Evenet.png';
import ProfileView from './ProfileView';
import ProfileEdit from './ProfileEdit';
const Profile = () => {
  const navigation = useNavigation();
  const [isEdit, setisEdit] = useState(false);
  const backHandler = () => {
    if (!isEdit) {
      navigation.goBack();
    } else {
      setisEdit(!isEdit);
    }
  };
  return (
    <>
      <View style={styles.wraper}>
        <ScrollView>
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
              source={Evenet}
              resizeMode="cover"
              style={styles.profilePicture}
            />
            {!isEdit && <Text style={styles.heading}>Liz Bautista User</Text>}
          </View>
          {!isEdit ? <ProfileView /> : <ProfileEdit />}
        </ScrollView>
      </View>
      <TabBar selectedTab={'Profile'} />
    </>
  );
};

export default Profile;
