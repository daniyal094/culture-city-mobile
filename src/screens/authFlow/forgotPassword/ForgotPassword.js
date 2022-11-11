import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './Styles';
import forgotImg from '.././../../assets/images/forgotImg.png';
import CustomInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';
import {colors} from '../../../utils/constants/colors';
import {height} from 'react-native-dimension';
import {useNavigation} from '@react-navigation/native';
import useAuthApi from '../../../utils/api/auth.api';
import {routes} from '../../../utils/constants/routes';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const {useHandleForgotPasswordApi} = useAuthApi();
  const {
    isLoading: isForgotLoading,
    mutate,
    isSuccess,
  } = useHandleForgotPasswordApi();
  useEffect(() => {
    if (isSuccess) {
      navigation.navigate(routes.newPass, {
        email: email,
      });
    }
  }, [isSuccess]);
  const forgotPasswordHandler = () => {
    const apiData = {
      email: email,
    };
    mutate(apiData);
  };
  return (
    <View style={styles.wraper}>
      <View style={styles.bodyContainer}>
        <Image source={forgotImg} resizeMode="contain" />
        <Text style={styles.heading}>Forgot Password</Text>
        <Text style={styles.subHeading}>
          We have sent a Reset password link to your email account.
        </Text>
        <CustomInput
          placeholder="Example@example.com"
          value={email}
          onChangeText={setEmail}
        />
        <CustomButton
          labeColor={colors.light}
          bgColor={colors.secondary}
          onPress={forgotPasswordHandler}
          label="Submit"
          loading={isForgotLoading}
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

export default ForgotPassword;
