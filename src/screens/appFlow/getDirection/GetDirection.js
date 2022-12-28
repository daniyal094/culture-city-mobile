import {View, Text, FlatList, Pressable, Image} from 'react-native';
import React, {useCallback, useRef} from 'react';
import {height, totalSize, width} from 'react-native-dimension';
import MapView, {Marker} from 'react-native-maps';
import {PROVIDER_GOOGLE} from 'react-native-maps';
import AntIcon from 'react-native-vector-icons/dist/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../../utils/constants/colors';
import styles from './Styles';
import BookEventModal from '../../../components/BookEventModal';
import CustomButton from '../../../components/CustomButton';
import {MEDIA_BASE_URL} from '../../../utils/constants/enums';
import {useUser} from '../../../utils/context/UserContenxt';
import SimpleToast from 'react-native-simple-toast';
import logo from '../../../assets/images/logo.png';
const GetDirection = props => {
  const navigation = useNavigation();
  const propsData = props.route.params;
  const data = propsData?.data;
  const bottomSheetModalRef = useRef(null);
  const userData = useUser();

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  return (
    <>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{...styles.flexRow, alignItems: 'center'}}>
          <AntIcon name="arrowleft" size={totalSize(2)} color={colors.black} />
          <Text style={styles.backLink}>Back</Text>
        </Pressable>
        <Text style={styles.headerHeading}>Get Direction</Text>
        <View></View>
      </View>
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: data?.location?.coordinates[1] || 24.8607,
            longitude: data?.location?.coordinates[0] || 67.0011,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          <Marker
            coordinate={{
              latitude: data?.location?.coordinates[1],
              longitude: data?.location?.coordinates[0],
            }}>
            <Image
              source={logo}
              style={{width: width(10), height: height(5),borderRadius:50}}
              resizeMode="contain"
            />
          </Marker>
        </MapView>
      </View> 
      <View style={{marginLeft: width(4)}}>
        <Text style={styles.EventHeading}>{data?.title}</Text>
        <View style={{...styles.flexRow, marginTop: height(1)}}>
          <Text style={{color: colors.black, fontWeight: '500'}}>
            Start date:
          </Text>
          <Text style={{color: colors.disableColor, marginLeft: width(2)}}>
            {data?.startDateTime}
          </Text>
        </View>
        <View style={{...styles.flexRow, marginTop: height(0.5)}}>
          <Text style={{color: colors.black, fontWeight: '500'}}>
            End date:
          </Text>
          <Text
            style={{
              color: colors.disableColor,
              marginLeft: width(3.3),
            }}>
            {data?.endDateTime}
          </Text>
        </View>
      </View>
      {data?.media?.length > 0 && (
        <FlatList
          numColumns={1}
          data={data?.media || []}
          pagingEnabled={true}
          snapToAlignment={'center'}
          renderItem={({item, idx}) => (
            <Image
              source={{uri: `${MEDIA_BASE_URL}${item}`}}
              resizeMode="cover"
              key={idx + 1}
              style={{
                width: width(80),
                height: height(20),
                borderRadius: 20,
                marginHorizontal: width(10),
                padding: 0,
              }}
            />
          )}
          horizontal={true}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          style={{marginTop: height(2)}}
        />
      )}

      <View style={styles.btnContainer}>
        <CustomButton
          labeColor={colors.light}
          bgColor={
            userData.role === '' ? colors.disableColor : colors.secondary
          }
          onPress={() => {
            if (userData?.role) {
              handlePresentModalPress();
            } else {
              SimpleToast.show('Please Login First');
            }
          }}
          label="Book this Event"
          // loading={isLoginLoading}
        />
      </View>
      <BookEventModal bottomSheetModalRef={bottomSheetModalRef} data={data} />
    </>
  );
};

export default GetDirection;
