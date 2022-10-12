import {View, Text, ImageBackground, Image} from 'react-native';
import React from 'react';
import styles from './Styles';
import landingBg from '../../../assets/images/landingBg.png';
import landingLogo from '../../../assets/images/landingLogo.png';
import CustomButton from '../../../components/CustomButton';
import {colors} from '../../../utils/constants/colors';

const Landing = () => {
  return (
    <View style={styles.wraper}>
      <ImageBackground
        source={landingBg}
        resizeMode="cover"
        style={styles.bgContainer}>
        <View style={styles.textRow}>
          <Image source={landingLogo} />
          <Text style={styles.text}>
            Culture <Text style={{fontWeight: '300'}}>City</Text>
          </Text>
        </View>
        <View style={styles.btnContainer}>
          <CustomButton
            labeColor={colors.light}
            bgColor={colors.secondary}
            onPress={() => alert('Pressed')}
            label="Browse Events"
          />
          <CustomButton
            labeColor={colors.black}
            bgColor={colors.light}
            onPress={() => alert('Pressed')}
            label="Login/Create account "
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default Landing;
