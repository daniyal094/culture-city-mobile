import {View, Text, ImageBackground} from 'react-native';
import React, {useState} from 'react';
import styles from './Styles';
import authBanner from '../../../assets/images/authBanner.png';
import SignUpForm from './SignUpForm';
import SignUpType from './SignUpType';
const SignUp = () => {
  const [slectUserType, setslectUserType] = useState(null);

  const userTypeHandler = type => {
    alert(type);
    setslectUserType(type);
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
        <SignUpForm />
      )}
    </View>
  );
};

export default SignUp;
