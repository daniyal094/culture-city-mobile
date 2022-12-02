import {View, Text, ImageBackground, ToastAndroid} from 'react-native';
import React, {useState} from 'react';
import styles from './Styles';
import authBanner from '../../../assets/images/authBanner.png';
import SignUpForm from './SignUpForm';
import SignUpType from './SignUpType';
import {ACCESS_TYPE} from '../../../utils/constants/enums';
import SimpleToast from 'react-native-simple-toast';
const SignUp = () => {
  const [slectUserType, setslectUserType] = useState(null);
  const {useHandleSignUpApi} = useAuthApi();
  const {isLoading: isSignUpLoading,mutate} = useHandleSignUpApi();
  const userTypeHandler = type => {
    setslectUserType(type);
  };

  const registerUser = (userInputDetails, termsChecked) => {
    if (termsChecked) {
      if (userInputDetails.password === userInputDetails.confirmPass) {
        const apiData = {
          ...userInputDetails,
          role: slectUserType,
          accessType: ACCESS_TYPE.INTERNAL,
          accessToken: '',
        };
        console.log(apiData);
        mutate(apiData);
      } else {
        SimpleToast.show('Password Does not match');
      }
    } else {
      SimpleToast.show('Please Check Terms And Condition');
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

      {slectUserType === null ? (
        <SignUpType userTypeHandler={userTypeHandler} />
      ) : (
        <SignUpForm
          registerUser={registerUser}
          isSignUpLoading={isSignUpLoading}
          slectUserType={slectUserType}
        />
      )}
    </View>
  );
};

export default SignUp;
