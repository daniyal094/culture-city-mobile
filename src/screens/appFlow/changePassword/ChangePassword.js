import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, { useState} from 'react';
import styles from './Styles';
import changePass from '.././../../assets/images/changePass.png';
import CustomInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';
import {colors} from '../../../utils/constants/colors';
import {height} from 'react-native-dimension';
import {useNavigation} from '@react-navigation/native';
import useAuthApi from '../../../utils/api/auth.api';
import FeatherIcons from 'react-native-vector-icons/Feather';
import {useUser} from '../../../utils/context/UserContenxt';
const ChangePassword = () => {
  const user = useUser();
  const [inputData, setinputData] = useState({
    oldPassword: '',
    newPassword: '',
  });
  const [showPass, setshowPass] = useState(true);
  const navigation = useNavigation();
  const {useHandleChangePasswordApi} = useAuthApi();
  const {isLoading: isChangePassLoading, mutate} = useHandleChangePasswordApi();

  const changePasswordHandler = () => {
    const apiData = {
      id: user?.user?._id,
      ...inputData,
    };
    mutate(apiData);
  };
  return (
    <View style={styles.wraper}>
      <View style={styles.bodyContainer}>
        <Image source={changePass} resizeMode="contain" />
        <Text style={styles.heading}>Change Password</Text>
        <CustomInput
          icon={
            showPass ? (
              <FeatherIcons name="eye-off" color={colors.black} />
            ) : (
              <FeatherIcons name="eye" color={colors.black} />
            )
          }
          iconPressHandler={() => setshowPass(!showPass)}
          placeholder="Old Password"
          value={inputData.oldPassword}
          secureTextEntry={showPass}
          onChangeText={value => {
            setinputData({...inputData, oldPassword: value});
          }}
        />
        <CustomInput
          placeholder="New Password"
          value={inputData.newPassword}
          secureTextEntry={showPass}
          onChangeText={value => {
            setinputData({...inputData, newPassword: value});
          }}
        />
        <CustomButton
          labeColor={colors.light}
          bgColor={colors.secondary}
          onPress={changePasswordHandler}
          label="Submit"
          loading={isChangePassLoading}
        />
      </View>
      <View
        style={{
          marginVertical: height(2),
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: colors.black,
          }}>
          Go
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text
            style={{
              fontWeight: '700',
              color: colors.black,
              marginLeft: 5,
            }}>
            Back
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChangePassword;
