import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './Styles';
import forgotImg from '.././../../assets/images/forgotImg.png';
import CustomInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';
import {colors} from '../../../utils/constants/colors';
import { height } from 'react-native-dimension';
import { useNavigation } from '@react-navigation/native';
import { routes } from '../../../utils/constants/routes';
const ForgotPassword = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.wraper}>
      <View style={styles.bodyContainer}>
        <Image source={forgotImg} resizeMode="contain" />
        <Text style={styles.heading}>Forgot Password</Text>
        <Text style={styles.subHeading}>
          We have sent a Reset password link to your email account.
        </Text>
        <CustomInput placeholder="Example@example.com" />
        <CustomButton
          labeColor={colors.light}
          bgColor={colors.secondary}
          onPress={() => navigation.navigate(routes.errorForgotPass)}
          label="Submit"
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
