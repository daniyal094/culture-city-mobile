import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import styles from './Styles';
import eventSeeker from '../../../assets/icons/eventSeeker.png';
import eventCreator from '../../../assets/icons/eventCreator.png';

import {colors} from '../../../utils/constants/colors';
import {height} from 'react-native-dimension';
import {useNavigation} from '@react-navigation/native';
import {routes} from '../../../utils/constants/routes';
const SignUpType = ({userTypeHandler}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.bodyContainer}>
      <ScrollView>
        <View style={styles.box}>
          <Image source={eventSeeker} resizeMode="contain" />
          <Text style={styles.boxHeading}>
            Are you looking for culture in your city?
          </Text>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text>Sign up as an </Text>
            <TouchableOpacity onPress={() => userTypeHandler('Seeker')}>
              <Text style={{color: colors.secondary}}>Event Seeker</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.box}>
          <Image source={eventCreator} resizeMode="contain" />
          <Text style={styles.boxHeading}>Bring culture to your city!</Text>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text>Sign up as an </Text>
            <TouchableOpacity onPress={() => userTypeHandler('Organizer')}>
              <Text style={{color: colors.secondary}}>Organizer</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            marginVertical: height(5),
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
      </ScrollView>
    </View>
  );
};

export default SignUpType;
