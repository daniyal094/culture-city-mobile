import {Image, ImageBackground, Text, View} from 'react-native';
import React from 'react';
import styles from './Styles';
import splashBg from '../../../assets/images/splashBg.png';
import splashPattern from '../../../assets/images/splashPattern.png';

const Splash = () => {
  return (
    <View style={styles.wraper}>
      <ImageBackground source={splashBg} resizeMode="cover" style={{flex: 1}}>
        <Text style={styles.text}>
          Culture <Text style={{fontWeight: '300'}}>City</Text>
        </Text>
        <Image
          source={splashPattern}
          resizeMode="cover"
          style={styles.patternImg}
        />
      </ImageBackground>
    </View>
  );
};

export default Splash;
