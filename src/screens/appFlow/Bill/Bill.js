import {View, Text, Pressable, ScrollView} from 'react-native';
import React from 'react';
import styles from './Styles';
import AntIcon from 'react-native-vector-icons/dist/AntDesign';
import {height, totalSize, width} from 'react-native-dimension';
import {colors} from '../../../utils/constants/colors';
import {useNavigation} from '@react-navigation/native';
import {useCart} from '../../../utils/context/CartContext';
import {useUser} from '../../../utils/context/UserContenxt';
import useEventApi from '../../../utils/api/event.api';
import CustomButton from '../../../components/CustomButton';
import Header from '../../../components/Header';
const Bill = props => {
  const propsData = props.route.params;
  const data = propsData.data;
  const userData = useUser();
  const user = userData?.user;
  const navigation = useNavigation();
  const cartData = useCart();
  let totalAmount = 0;
  const {useHandlePurchaseEventService} = useEventApi();
  const {isLoading, mutate} = useHandlePurchaseEventService(
    user._id,
    cartData?.organizerId,
  );

  const reservationHandler = () => {
    const purchase = cartData.cartItems.map(item => {
      return {
        eventId: item.eventId,
        cartData: item.ticketList.map(ticket => {
          return {
            boughtQuantity: ticket.ticketCount,
            categoryId: ticket.ticketType._id,
          };
        }),
      };
    });

    const apiData = {
      purchase: purchase,
    };
    if (!isLoading) {
      mutate(apiData);
    }
  };

  return (
    <>
      <View style={styles.wraper}>
        <Header heading={'Checkout'} />

        <View style={styles.checkoutContainer}>
          <ScrollView>
            <Text style={styles.checkoutHeading}>Order Summary</Text>
            {cartData.cartItems.map((item, index) => {
              return (
                <View key={index}>
                  <Text style={styles.checkoutEventHeading}>
                    {item?.eventName}
                  </Text>
                  {item?.ticketList?.map((ticket, index) => {
                    let plateformFee;
                    let stripeFee;
                    if (ticket?.ticketCount > 0) {
                      plateformFee =
                        ticket?.ticketType?.price <= 101
                          ? ticket?.ticketType?.price *
                            (data.length && data[0].percent / 100)
                          : ticket?.ticketType?.price *
                            (data.length && data[1].percent / 100);

                      stripeFee = ticket?.ticketType?.price * (3 / 100);
                      totalAmount +=
                        plateformFee +
                        stripeFee +
                        ticket?.ticketCount * ticket?.ticketType?.price;
                    }
                    return (
                      <View
                        key={index}
                        style={{
                          ...styles.row,
                          justifyContent: 'space-between',
                          marginVertical: height(1),
                        }}>
                        <View>
                          <Text
                            style={{
                              color: colors.disableColor,
                              fontSize: totalSize(1.8),
                              fontWeight: '600',
                            }}>
                            {ticket?.ticketType?.name} x {ticket?.ticketCount}
                          </Text>
                          <Text
                            style={{
                              color: colors.disableColor,
                              fontSize: totalSize(1.3),
                              fontWeight: '500',
                            }}>
                            Per Ticket ${ticket?.ticketType?.price}
                          </Text>
                          <Text
                            style={{
                              color: colors.disableColor,
                              fontSize: totalSize(1.3),
                              fontWeight: '500',
                            }}>
                            Platform Fees: ${plateformFee}
                          </Text>
                          <Text
                            style={{
                              color: colors.disableColor,
                              fontSize: totalSize(1.3),
                              fontWeight: '500',
                            }}>
                            Stripe Fees: ${stripeFee}
                          </Text>
                        </View>
                        <Text
                          style={{
                            color: colors.disableColor,
                            fontSize: totalSize(1.5),
                            fontWeight: '500',
                            marginRight: width(3),
                          }}>
                          $
                          {ticket?.ticketCount > 0
                            ? ticket?.ticketCount * ticket?.ticketType?.price +
                              plateformFee +
                              stripeFee
                            : 0}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              );
            })}
            <View
              style={{
                ...styles.row,
                justifyContent: 'space-between',
                marginVertical: height(1),
              }}>
              <Text
                style={{
                  color: colors.disableColor,
                  fontSize: totalSize(1.8),
                  fontWeight: '600',
                }}>
                Grand Total
              </Text>
              <Text
                style={{
                  color: colors.disableColor,
                  fontSize: totalSize(1.8),
                  fontWeight: '600',
                }}>
                {totalAmount}
              </Text>
            </View>
            <View style={{alignItems: 'center', width: width(90)}}>
              <CustomButton
                label={'Proceed'}
                labeColor={colors.light}
                bgColor={colors.secondary}
                onPress={reservationHandler}
                loading={isLoading}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default Bill;
