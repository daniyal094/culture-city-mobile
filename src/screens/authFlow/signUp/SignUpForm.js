import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../../../components/CustomInput';
import Eye from '../../../assets/icons/Eye.png';
import {height, width} from 'react-native-dimension';
import CustomButton from '../../../components/CustomButton';
import {colors} from '../../../utils/constants/colors';
import CheckBoxWithLable from '../../../components/CheckBoxWithLable';
import styles from './Styles';
import { routes } from '../../../utils/constants/routes';
import { useNavigation } from '@react-navigation/native';

const SignUpForm = () => {
  const [isChecked, setisChecked] = useState(false);
  const navigation = useNavigation()
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
              <TouchableOpacity>
                <Text>Login</Text>
              </TouchableOpacity>
            </View>
            <View style={{width: width(50), alignItems: 'center'}}>
              <TouchableOpacity>
                <Text>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
          <CustomInput placeholder="Full Name" />
          <CustomInput placeholder="Example@example.com" />
          <CustomInput icon={Eye} placeholder="Password" />
          <CustomInput placeholder="Password Confirm" />

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
              linkPress={() => alert('ENTER')}
            />
          </View>

          <CustomButton
            labeColor={colors.light}
            bgColor={colors.secondary}
            onPress={() => navigation.navigate(routes.profileInterest)}
            label="Sign Up"
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
  );
};

export default SignUpForm;
