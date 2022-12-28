import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import styles from './Styles';
import {useCart, useCartUpdate} from '../../../utils/context/CartContext';
import AntIcon from 'react-native-vector-icons/dist/AntDesign';
import {totalSize, width} from 'react-native-dimension';
import {colors} from '../../../utils/constants/colors';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../../components/CustomButton';
import {setAsyncStorage} from '../../../utils/helper/functions';
import TicketCounter from '../../../components/TicketCounter';
import {routes} from '../../../utils/constants/routes';
import userApi from '../../../utils/api/user.api';

const Cart = () => {
  const cartData = useCart();
  const navigation = useNavigation();
  const CartUpdate = useCartUpdate();
  const {useFetchComisionService} = userApi();
  const {loading, data} = useFetchComisionService();
  const [canproceed, setcanproceed] = useState(false);
  const clearCartHandler = () => {
    setAsyncStorage('cartData', {
      organizerId: '',
      cartItems: [],
    });
    CartUpdate({
      organizerId: '',
      cartItems: [],
    });
  };
  return (
    <View style={styles.wraper}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.row}>
          <AntIcon name="arrowleft" size={totalSize(2)} color={colors.black} />
          <Text style={styles.backLink}>Back</Text>
        </Pressable>
        <Text style={styles.headerHeading}>Cart</Text>
        <View></View>
      </View>

      {cartData?.cartItems?.length > 0 ? (
        <>
          {cartData?.cartItems.map((item, idx) => (
            <>
              <View style={styles.cartContainerBox} key={idx + 871623}>
                <Text style={styles.cartItemHeading}>{item?.eventName}</Text>
                {item.ticketList.map((ticket, tidx) => (
                  <>
                    <View
                      style={{
                        width: width(95),
                      }}
                      key={tidx + 12983791}>
                      <TicketCounter
                        data={{
                          ...ticket,
                          name: ticket.ticketType.name,
                          saleEndDateTime: ticket?.ticketType?.saleEndDateTime,
                          limit: ticket?.ticketType?.limit,
                          count: ticket.ticketCount,
                          _id: ticket?.ticketType?._id,
                        }}
                        eventId={item.eventId}
                        organizerId={cartData?.organizerId}
                        eventName={item?.eventName}
                      />
                    </View>
                  </>
                ))}
                <Text
                  style={{
                    color: colors.disableColor,
                    fontSize: totalSize(1),
                    marginLeft: width(3),
                  }}>
                  You will pay the platform fees.
                </Text>
              </View>
            </>
          ))}

          <View style={{alignItems: 'center'}}>
            <CustomButton
              label={'Clear Cart'}
              bgColor={colors.primary}
              onPress={clearCartHandler}
              labeColor={colors.white}
            />
            <CustomButton
              label={'Proceed to Checkout'}
              labeColor={colors.light}
              bgColor={colors.secondary}
              onPress={() => {
                if (
                  cartData?.cartItems?.map(item =>
                    item?.ticketList?.filter(ticket => ticket?.ticketCount < 1),
                  )[0].length < 1
                ) {
                  navigation.navigate(routes.bill, {data: data});
                } else {
                  alert('Ticket can not be zero');
                }
              }}
            />
          </View>
        </>
      ) : (
        <>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: totalSize(2),
                color: colors.disableColor,
                fontWeight: '600',
                letterSpacing: 1,
              }}>
              Cart is Empty
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

export default Cart;
