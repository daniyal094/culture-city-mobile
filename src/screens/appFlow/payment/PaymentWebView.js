import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {WebView} from 'react-native-webview';
import styles from './Styles';
import AntIcon from 'react-native-vector-icons/dist/AntDesign';
import {height, totalSize, width} from 'react-native-dimension';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../../utils/constants/colors';
import {routes} from '../../../utils/constants/routes';
import SimpleToast from 'react-native-simple-toast';

const PaymentWebView = props => {
  const navigation = useNavigation();
  const propsData = props.route.params;
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          backgroundColor: colors.white,
          zIndex: 999,
          width: width(100),
          height: height(10),
          display: 'flex',
          justifyContent: 'space-around',
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: height(5),
        }}>
        <Pressable onPress={() => navigation.goBack()} style={styles.row}>
          <AntIcon name="arrowleft" size={totalSize(2)} color={colors.black} />
          <Text style={styles.backLink}>Back</Text>
        </Pressable>
        <Text style={styles.headerHeading}>{propsData?.heading}</Text>
        <View></View>
      </View>
      <WebView
        source={{uri: propsData.link}}
        style={{marginTop: height(3)}}
        onNavigationStateChange={navState => {
        //   console.log('navState', navState);
          if (
            navState.url ===
            'https://cultureinyourcity.vercel.app/?stripe-response=success'
          ) {
            if (propsData?.heading === 'Purchase Event') {
              navigation.navigate(routes.bookingSuccess);
              
            }else{

              navigation.navigate(routes.home);
            }
            SimpleToast.show('Success');
          } else if (
            navState.url ===
            'https://cultureinyourcity.vercel.app/?stripe-response=error'
          ) {
            navigation.navigate(routes.home);
            SimpleToast.show('Something went wrong');
          }
        }}
      />
    </View>
  );
};

export default PaymentWebView;
