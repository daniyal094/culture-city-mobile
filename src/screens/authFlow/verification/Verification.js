import {View, Text, Image, TouchableOpacity, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './Styles';
import forgotImg from '.././../../assets/images/forgotImg.png';
import CustomInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';
import {colors} from '../../../utils/constants/colors';
import {useNavigation} from '@react-navigation/native';
import {routes} from '../../../utils/constants/routes';
import {getAsyncStorage} from '../../../utils/helper/functions';
import useAuthApi from '../../../utils/api/auth.api';
const Verification = () => {
  const [code, setCode] = useState('');
  const [user, setuser] = useState('');
  const {useHandleResendVerificationCodeApi, useHandleEmailVerificationApi} =
    useAuthApi();
  const {isLoading: isVerifyLoading, mutate: Verifymutate} =
    useHandleEmailVerificationApi();
  const {isLoading: isResendLoading, mutate} =
    useHandleResendVerificationCodeApi();
  const navigation = useNavigation();

  useEffect(() => {
    getAsyncStorage('user').then(res => setuser(res.user));
  }, []);

  const resendHandler = () => {
    mutate(user?._id);
  };

  const verifyHandler = () => {
    const apiData = {
      verificationCode: code.toString(),
      id : user?._id
    };
    Verifymutate(apiData);
  };
  return (
    <View style={styles.wraper}>
      <View style={styles.bodyContainer}>
        <Image source={forgotImg} resizeMode="contain" />
        <Text style={styles.heading}>Verifiy Account</Text>
        <Text style={styles.subHeading}>
          Provide the verification code from {user?.email}.
        </Text>

        <CustomInput
          placeholder="zRcsO6DJ"
          value={code}
          onChangeText={setCode}
        />
        <Pressable>
          <Text style={styles.resendLink} onPress={resendHandler}>
            Resend?
          </Text>
        </Pressable>
        <CustomButton
          labeColor={colors.light}
          bgColor={colors.secondary}
          onPress={verifyHandler}
          label="verify"
        />
      </View>
    </View>
  );
};

export default Verification;
