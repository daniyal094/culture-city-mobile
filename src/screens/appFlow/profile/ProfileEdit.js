import {View, Text, TextInput} from 'react-native';
import React from 'react';
import styles from './Styles';

const ProfileEdit = () => {
  return (
    <View style={styles.editProfileContainer}>
      <TextInput style={styles.editInput} />
      <TextInput style={styles.editInput} />
      <TextInput style={styles.editInput} />
    </View>
  );
};

export default ProfileEdit;
