import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import styles from './Styles';
import authBanner from '../../../assets/images/authBanner.png';
import CustomInput from '../../../components/CustomInput';
import Eye from '../../../assets/icons/Eye.png';
import {height, width} from 'react-native-dimension';
import CustomButton from '../../../components/CustomButton';
import {colors} from '../../../utils/constants/colors';
import { useNavigation } from '@react-navigation/native';
import { routes } from '../../../utils/constants/routes';
const SignIn = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.wrapper}>
      <ImageBackground
        source={authBanner}
        resizeMode="cover"
        style={styles.header}>
        <Text style={styles.heading}>
          Cultural Exploration Possible Wherever, Whenever
        </Text>
      </ImageBackground>
      <View style={styles.bodyContainer}>
        <ScrollView>
          <View style={styles.firstBlock}>
            <View style={{flexDirection: 'row', width: width(100),marginBottom:height(2)}}>
              <View style={{width: width(50), alignItems: 'center'}}>
                <TouchableOpacity>
                  <Text>Login</Text>
                </TouchableOpacity>
              </View>
              <View style={{width: width(50), alignItems: 'center'}}>
                <TouchableOpacity onPress={() => navigation.navigate(routes.signup)}>
                  <Text>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
            <CustomInput placeholder="Example@example.com" />
            <CustomInput icon={Eye} placeholder="Password" secureTextEntry={true}/>
            <View style={styles.forgetRow}>
              <Text>Remember Me</Text>
              <TouchableOpacity onPress={() => navigation.navigate(routes.forgotPass)}>
                <Text style={{fontWeight: '600', color: 'black'}}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
            <CustomButton
              labeColor={colors.light}
              bgColor={colors.secondary}
              onPress={() => navigation.navigate(routes.app)}
              label="Sign In"
            />
          </View>
          <Text style={{textAlign: 'center'}}>OR Sign in with</Text>
          <View
            style={{
              width: width(100),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CustomButton
              labeColor={colors.black}
              bgColor={colors.white}
              onPress={() => alert('Pressed')}
              label="Sign In with Google"
            />
            <CustomButton
              labeColor={colors.white}
              bgColor={colors.primary}
              onPress={() => alert('Pressed')}
              label="Sign In with Facebook"
            />
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
                Continue as
              </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    fontWeight: '700',
                    color: colors.black,
                    marginLeft: 5,
                  }}>
                  Guest
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default SignIn;
