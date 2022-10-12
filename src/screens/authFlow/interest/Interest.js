import {View, Text} from 'react-native';
import React from 'react';
import styles from './Styles';
import CheckBoxTile from '../../../components/CheckBoxTile';
import CustomButton from '../../../components/CustomButton';
import {colors} from '../../../utils/constants/colors';
import {useNavigation} from '@react-navigation/native';
import {routes} from '../../../utils/constants/routes';
const Interest = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.wraper}>
      <Text style={styles.heading}>Select your interest</Text>
      <View style={styles.boorderBtm}>
        <Text style={styles.subHeading}>Asia</Text>
      </View>
      <View style={styles.tileRow}>
        <CheckBoxTile label={'Chinese'} />
        <CheckBoxTile label={'Indian'} />
        <CheckBoxTile label={'Filipino'} />
        <CheckBoxTile label={'Indonesian'} />
      </View>

      <View style={styles.boorderBtm}>
        <Text style={styles.subHeading}>Europe</Text>
      </View>
      <View style={styles.tileRow}>
        <CheckBoxTile label={'German'} />
        <CheckBoxTile label={'French'} />
        <CheckBoxTile label={'Italian'} />
        <CheckBoxTile label={'Swedish'} />
      </View>

      <View style={styles.boorderBtm}>
        <Text style={styles.subHeading}>Americas</Text>
      </View>
      <View style={styles.tileRow}>
        <CheckBoxTile label={'Brazilian'} />
        <CheckBoxTile label={'Canadian'} />
        <CheckBoxTile label={'American'} />
        <CheckBoxTile label={'Argentinian'} />
      </View>

      <View style={{alignItems: 'center', width: '100%', marginTop: 30}}>
        <CustomButton
          labeColor={colors.light}
          bgColor={colors.secondary}
          onPress={() => navigation.navigate(routes.app)}
          label="Continue"
        />
      </View>
    </View>
  );
};

export default Interest;
