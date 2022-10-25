import {View, Text, FlatList} from 'react-native';
import React from 'react';
import NearFestivalCard from '../../../components/NearFestivalCard';
import styles from './Styles';
import Tile from '../../../components/Tile';

const ProfileView = () => {
  return (
    <>
      <View style={styles.profileDetailContainer}>
        <View>
          <Text style={styles.profileDetailHeading}>Culture</Text>
          <Text style={styles.profileDetailInfo}>Ifugaw</Text>
        </View>
        <View>
          <Text style={styles.profileDetailHeading}>Locatation</Text>
          <Text style={styles.profileDetailInfo}>Bataan </Text>
        </View>
        <View>
          <Text style={styles.profileDetailHeading}>Member Since</Text>
          <Text style={styles.profileDetailInfo}>Yesterday</Text>
        </View>
      </View>
      <Text style={styles.tagHeading}>Cultures</Text>
      <View style={styles.tileContainer}>
        <Tile label={'Canadian'} />
        <Tile label={'Argentinian'} />
        <Tile label={'Italian'} />
        <Tile label={'Canadian'} />
        <Tile label={'Italian'} />
      </View>

      <View style={styles.historyContainer}>
        <Text style={styles.historyHeading}>Event History </Text>
        <FlatList
          numColumns={1}
          data={[1, 2, 3, 4, 5, 6, 7, 8]}
          renderItem={NearFestivalCard}
          horizontal={true}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </>
  );
};

export default ProfileView;
