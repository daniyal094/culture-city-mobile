import {View, Text, Image,  Pressable, ScrollView} from 'react-native';
import React, { useState} from 'react';
import styles from './Styles';
import forgotImg from '.././../../assets/images/forgotImg.png';
import CustomInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';
import {colors} from '../../../utils/constants/colors';
import {useNavigation} from '@react-navigation/native';
import useAuthApi from '../../../utils/api/auth.api';
import { useUser } from '../../../utils/context/UserContenxt';
const Verification = () => {
  const [code, setCode] = useState('');
  const userData = useUser()
  const user = userData?.user
  const {useHandleResendVerificationCodeApi, useHandleEmailVerificationApi} =
    useAuthApi();
  const {isLoading: isVerifyLoading, mutate: Verifymutate} =
    useHandleEmailVerificationApi();
  const {isLoading: isResendLoading, mutate} =
    useHandleResendVerificationCodeApi();
  const navigation = useNavigation();



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
      <ScrollView>

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
      </ScrollView>
    </View>
  );
};

export default Verification;
