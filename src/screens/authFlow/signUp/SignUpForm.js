import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import CustomInput from '../../../components/CustomInput';
import Eye from '../../../assets/icons/Eye.png';
import {height, width} from 'react-native-dimension';
import CustomButton from '../../../components/CustomButton';
import {colors} from '../../../utils/constants/colors';
import CheckBoxWithLable from '../../../components/CheckBoxWithLable';
import styles from './Styles';
import {routes} from '../../../utils/constants/routes';
import {useNavigation} from '@react-navigation/native';
import FeatherIcons from 'react-native-vector-icons/Feather';
import DropDown from '../../../components/DropDown';
import {countries} from '../../../utils/constants/countries';
import TermsAndCondition from '../../../components/TermsAndCondition';

const SignUpForm = ({isSignUpLoading, slectUserType, registerUser}) => {
  console.log(slectUserType);
  const [isChecked, setisChecked] = useState(false);
  const [showPass, setshowPass] = useState(true);
  const [registerData, setregisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPass: '',
    country: '',
    organization:  '',
  });
  const bottomSheetModalRef = useRef(null);

  const navigation = useNavigation();

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
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
              <TouchableOpacity
                onPress={() => navigation.navigate(routes.signin)}>
                <Text>Login</Text>
              </TouchableOpacity>
            </View>
            <View style={{width: width(50), alignItems: 'center'}}>
              <TouchableOpacity>
                <Text>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
          <CustomInput
            placeholder="First Name"
            value={registerData.firstName}
            onChangeText={value =>
              setregisterData({...registerData, firstName: value})
            }
          />
          <CustomInput
            placeholder="Last Name"
            value={registerData.lastName}
            onChangeText={value =>
              setregisterData({...registerData, lastName: value})
            }
          />
          <CustomInput
            placeholder="Example@example.com"
            value={registerData.email}
            onChangeText={value =>
              setregisterData({...registerData, email: value})
            }
          />
       
          <DropDown
            list={countries?.map(item => {
              return {label: item?.name, value: item?._id};
            })}
            extraData={registerData}
            setState={setregisterData}
            stateKey="country"
            placeholder='country'
          />
          {slectUserType === 'Organizer' && (
            <CustomInput
              placeholder="Organization"
              value={registerData.organization}
              onChangeText={value =>
                setregisterData({...registerData, organization: value})
              }
            />
          )}
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
            value={registerData.password}
            onChangeText={value =>
              setregisterData({...registerData, password: value})
            }
          />
          <CustomInput
            placeholder="Password Confirm"
            secureTextEntry={showPass}
            value={registerData.confirmPass}
            onChangeText={value =>
              setregisterData({...registerData, confirmPass: value})
            }
          />

          <View
            style={{
              marginVertical: height(2),
              flexDirection: 'row',
              alignSelf: 'flex-start',
              marginLeft: width(7),
            }}>
            <CheckBoxWithLable
              isChecked={isChecked}
              onChange={() => setisChecked(!isChecked)}
              label="I agree to the"
              linkedLabel="Terms and Condition"
              linkPress={() => handlePresentModalPress()}
            />
          </View>

          <CustomButton
            labeColor={colors.light}
            bgColor={colors.secondary}
            onPress={() => registerUser(registerData, isChecked)}
            label="Sign Up"
            loading={isSignUpLoading}
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
      <TermsAndCondition bottomSheetModalRef={bottomSheetModalRef} />
    </View>
  );
};

export default SignUpForm;
