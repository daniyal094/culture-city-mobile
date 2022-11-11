import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import styles from './Styles';
import forgotImg from '.././../../assets/images/forgotImg.png';
import CustomInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';
import {colors} from '../../../utils/constants/colors';
import {height} from 'react-native-dimension';
import {useNavigation} from '@react-navigation/native';
import useAuthApi from '../../../utils/api/auth.api';
const NewPass = (props) => {
  const [code, setcode] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const {useHandleForgotNewPasswordApi} = useAuthApi();
  const {isLoading: isNewPassLoading, mutate} = useHandleForgotNewPasswordApi();
  const propsData = props.route.params;
  const forgotPasswordHandler = () => {
    const apiData = {
      email: propsData.email,
      verificationCode: code,
      password: password,
    };
    mutate(apiData);
  };
  return (
    <View style={styles.wraper}>
      <View style={styles.bodyContainer}>
        <Image source={forgotImg} resizeMode="contain" />
        <Text style={styles.heading}>Change Password</Text>
        <Text style={styles.subHeading}>
          We have sent a Reset password code to your email account.
        </Text>
        <CustomInput
          placeholder="Verification code"
          value={code}
          onChangeText={setcode}
        />
        <CustomInput
          placeholder="New Password"
          value={password}
          onChangeText={setPassword}
        />
        <CustomButton
          labeColor={colors.light}
          bgColor={colors.secondary}
          onPress={forgotPasswordHandler}
          label="Change Password"
          loading={isNewPassLoading}
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

export default NewPass;
