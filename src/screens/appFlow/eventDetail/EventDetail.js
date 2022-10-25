import {View, Text, Image, ScrollView, Pressable} from 'react-native';
import React, {useCallback, useRef} from 'react';
import styles from './Styles';
import eventDetail from '../../../assets/images/eventDetail.png';
import Evenet from '../../../assets/images/Evenet.png';
import {colors} from '../../../utils/constants/colors';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import {height, totalSize, width} from 'react-native-dimension';
// import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import CustomButton from '../../../components/CustomButton';
import BookEventModal from '../../../components/BookEventModal';
import AntIcon from 'react-native-vector-icons/dist/AntDesign';
import {useNavigation} from '@react-navigation/native';
const EventDetail = () => {
  const navigation = useNavigation();
  const bottomSheetModalRef = useRef(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  return (
    <>
      <View style={styles.wraper}>
        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',
            top: height(5),
            left: width(2),
            zIndex:99,
          }}
          onPress={() => navigation.goBack()}>
          <AntIcon name="arrowleft" size={totalSize(2.5)} color={colors.white} />
          <Text style={styles.backLink}>Back</Text>
        </Pressable>
        <ScrollView>
          <Image source={eventDetail} resizeMode="cover" style={styles.img} />
          <View style={styles.bodyWrapper}>
            <View style={styles.ownerContainer}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={Evenet}
                  resizeMode="cover"
                  style={styles.profilePicture}
                />
                <View style={{marginLeft: 10}}>
                  <Text style={styles.profileHeading}>Liz Bautista</Text>
                  <Text style={{color: colors.disableColor}}>
                    Viva Films Co.
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={styles.locationIcon}>
                  <FontAwesome
                    name="location-arrow"
                    color="#fff"
                    size={totalSize(2)}
                  />
                </View>
                {/* <Ionicons
                name="ios-chatbox-ellipses-outline"
                color={colors.primary}
                size={totalSize(3)}
              /> */}
              </View>
            </View>
            <Text style={styles.EventHeading}>Makulay Festival</Text>
            <View style={styles.flexRow}>
              <Entypo
                name="location-pin"
                color={colors.coal}
                size={totalSize(2)}
              />
              <Text style={{color: colors.disableColor}}>
                Pilar Bataan Phillipines |{' '}
              </Text>
              <Text style={{color: colors.secondary}}>Get Direction </Text>
            </View>
            <View style={{...styles.flexRow, marginTop: height(1)}}>
              <Text style={{color: colors.black, fontWeight: '500'}}>
                Start date:
              </Text>
              <Text style={{color: colors.disableColor, marginLeft: width(2)}}>
                September 11, 2021 at 12:30 pm
              </Text>
            </View>
            <View style={{...styles.flexRow, marginTop: height(0.5)}}>
              <Text style={{color: colors.black, fontWeight: '500'}}>
                End date:
              </Text>
              <Text
                style={{color: colors.disableColor, marginLeft: width(3.3)}}>
                September 11, 2021 at 1:30 pm
              </Text>
            </View>
          </View>
          <View
            style={{
              width: width(100),
              borderTopWidth: 0.2,
              borderTopColor: colors.disableColor,
            }}></View>

          <Text style={styles.discription}>
            “Established in 1995, Tiffin Indian Kitchen is famously known for
            authentic savory Indian food, stunning decor, full service bar, and
            upscale service. Our Tiffin “Wallallahs” (head chef, and staff) lead
            you on an exotic journey of tastes in a beautiful setting.” Menu:
            https://tiffinchicago.com/menu Also known as Little India, Devon
            prides itself in its South Asian influences that attract both
            tourists and Chicago natives. Critics call Tiffin Indian Kitchen the
            best Indian food in Chicago – let’s find out if they’re right! With
            a buffet-style lunch, you’ll be able to design your own plate. Come
            join our group of American Explorers as we mingle, network, and try
            authentic Indian food together. Are you ready to explore this hidden
            Chicago gem?
          </Text>
          <View style={styles.btnContainer}>
            <CustomButton
              labeColor={colors.light}
              bgColor={colors.secondary}
              onPress={() => {
                handlePresentModalPress();
              }}
              label="Book this Event"
              // loading={isLoginLoading}
            />
          </View>
        </ScrollView>
      </View>
      <BookEventModal bottomSheetModalRef={bottomSheetModalRef} />
    </>
  );
};

export default EventDetail;
