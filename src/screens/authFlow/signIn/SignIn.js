import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './Styles';
import authBanner from '../../../assets/images/authBanner.png';
import CustomInput from '../../../components/CustomInput';
import {height, width} from 'react-native-dimension';
import CustomButton from '../../../components/CustomButton';
import {colors} from '../../../utils/constants/colors';
import {useNavigation} from '@react-navigation/native';
import {routes} from '../../../utils/constants/routes';
import {ACCESS_TYPE} from '../../../utils/constants/enums';
import useAuthApi from '../../../utils/api/auth.api';
import FeatherIcons from 'react-native-vector-icons/Feather';
import {IsEmail} from '../../../utils/helper/functions';
import Toast from 'react-native-simple-toast';
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
const SignIn = () => {
  const navigation = useNavigation();
  const [loginData, setloginData] = useState({
    email: '',
    password: '',
    rememberMe: true,
    accessType: ACCESS_TYPE.INTERNAL,
    accessToken: '',
    isAdmin: false,
  });
  const [showPass, setshowPass] = useState(true);
  const {useHandleLoginApi} = useAuthApi();

  const {isLoading: isLoginLoading, mutate, isSuccess} = useHandleLoginApi();
  const handleLoginSubmit = () => {
    if (IsEmail(loginData.email)) {
      mutate(loginData);
    } else {
      Toast.show('Email is not Correct');
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '428562224901-faas9fkjq18usvsff6jllmskjkvljosc.apps.googleusercontent.com',
      offlineAccess: false,
      // forceCodeForRefreshToken: true,
    });
  }, []);
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('statusCodes.SIGN_IN_CANCELLED');
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('statusCodes.IN_PROGRESS');

        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('statusCodes.PLAY_SERVICES_NOT_AVAILABLE');
      } else {
        console.log(error, 'Some other error'); // some other error happened
      }
    }
  };
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
            <View
              style={{
                flexDirection: 'row',
                width: width(100),
                marginBottom: height(2),
              }}>
              <View style={{width: width(50), alignItems: 'center'}}>
                <TouchableOpacity>
                  <Text style={{color: colors.coal}}>Login</Text>
                </TouchableOpacity>
              </View>
              <View style={{width: width(50), alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => navigation.navigate(routes.signup)}>
                  <Text style={{color: colors.coal}}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
            <CustomInput
              placeholder="Example@example.com"
              onChangeText={value => setloginData({...loginData, email: value})}
            />
            <CustomInput
              icon={
                showPass ? (
                  <FeatherIcons name="eye-off" color={colors.black} />
                ) : (
                  <FeatherIcons name="eye" color={colors.black} />
                )
              }
              placeholder="Password"
              secureTextEntry={showPass}
              iconPressHandler={() => setshowPass(!showPass)}
              onChangeText={value =>
                setloginData({...loginData, password: value})
              }
            />
            <View style={styles.forgetRow}>
              {/* <Text>Remember Me</Text> */}
              <TouchableOpacity
                onPress={() => navigation.navigate(routes.forgotPass)}>
                <Text style={{fontWeight: '600', color: 'black'}}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
            <CustomButton
              labeColor={colors.light}
              bgColor={colors.secondary}
              onPress={handleLoginSubmit}
              label="Sign In"
              loading={isLoginLoading}
            />
          </View>
          <Text style={{textAlign: 'center'}}>OR Sign in with</Text>
          <View
            style={{
              width: width(100),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <GoogleSigninButton
              style={{width: width(85), height: 48, borderRadius:10,marginTop:5}}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Light}
              onPress={signIn}
              // disabled={this.state.isSigninInProgress}
            />
            
            {/* <CustomButton
              labeColor={colors.white}
              bgColor={colors.primary}
              onPress={() => alert('Pressed')}
              label="Sign In with Facebook"
            /> */}
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
              <TouchableOpacity onPress={() => navigation.navigate(routes.app)}>
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
