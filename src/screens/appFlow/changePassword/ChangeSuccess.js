import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './Styles';
import tick from '../../../assets/icons/tick.png'
import CustomButton from '../../../components/CustomButton';
import {colors} from '../../../utils/constants/colors';
import { useNavigation } from '@react-navigation/native';
import { routes } from '../../../utils/constants/routes';


const ChangeSuccess = () => {
    const navigation = useNavigation()
  return (
   <>
     <View style={styles.wraper}>
      <View style={styles.bodyContainer}>
        <Image source={tick} resizeMode="contain" />
        <Text style={styles.heading}>Password Changed!</Text>
        <Text style={styles.subHeading}>
        Your password has been changed successfully
        </Text>
       
        <CustomButton
          labeColor={colors.light}
          bgColor={colors.secondary}
          onPress={() => navigation.navigate(routes.home)}
          label="Continue"
        />
      </View>
  
    </View>
   </>
  )
}

export default ChangeSuccess