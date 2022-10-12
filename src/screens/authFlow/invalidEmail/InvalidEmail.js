import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import invalidEmailImg from '../../../assets/images/invalidEmailImg.png';
import styles from './Styles';
import CustomButton from '../../../components/CustomButton';
import {colors} from '../../../utils/constants/colors';
import {height} from 'react-native-dimension';
import { useNavigation } from '@react-navigation/native';
import { routes } from '../../../utils/constants/routes';
const InvalidEmail = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.wraper}>
      <Image source={invalidEmailImg} resizeMode="contain" />
      <Text style={styles.heading}>An error occured</Text>
      <Text style={styles.error}>Invalid Email, does’t exist </Text>
      <CustomButton
        labeColor={colors.light}
        bgColor={colors.secondary}
        onPress={() => navigation.goBack()}
        label="Go Back"
      />
      <View
        style={{
          position: 'absolute',
          bottom: height(7),
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: colors.black,
          }}>
          Already Have An Account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate(routes.signin)}>
          <Text
            style={{
              fontWeight: '600',
              color: colors.secondary,
              marginLeft: 5,
            }}>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InvalidEmail;
