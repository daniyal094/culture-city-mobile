import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../utils/constants/colors';
import {height, totalSize, width} from 'react-native-dimension';
import AntIcon from 'react-native-vector-icons/dist/AntDesign';
import {useCart, useCartUpdate} from '../utils/context/CartContext';

const TicketCounter = ({
  data,
  eventId,
  organizerId,
  eventName,
  isCart = true,
}) => {
  const updateCart = useCartUpdate();
  const cartData = useCart();
  const [counter, setcounter] = useState(data?.count || 0);

  useEffect(() => {
    if (!isCart) {
      if (cartData?.cartItems.length > 0) {
        cartData?.cartItems?.map((i, idx) => {
          if (i.eventId === eventId) {
            i.ticketList.map(j => {
              if (j.ticketType._id === data._id) {
                setcounter(j.ticketCount);
              }
            });
          }
        });
      }
    }
  }, []);

  // Event Sale End Time
  const saleValid = new Date() < new Date(data.saleEndDateTime);
  // Ticket Count Handler
  const countHandler = type => {
    if (type === 'plus') {
      setcounter(counter + 1);
      // Check if Cart has any Items
      if (cartData.cartItems.length > 0) {
        // Check if the cart has an same event
        const hasEventIdx = cartData.cartItems.findIndex(
          item => item.eventId === eventId,
        );
        if (hasEventIdx === -1) {
          let obj = {...cartData};
          obj = {
            ...obj,
            cartItems: obj.cartItems,
          };
          obj.cartItems[obj.cartItems.length] = {
            eventId: eventId,
            eventName: eventName,
            ticketList: [
              {
                ticketCount: counter + 1,
                ticketType: data,
              },
            ],
          };
          updateCart(obj);
        } else {
          const hasTicketType = cartData.cartItems[
            hasEventIdx
          ].ticketList.findIndex(item => item.ticketType._id === data._id);
          // Cart Has Same Event But Not Same Ticket Type
          if (hasTicketType === -1) {
            let obj = {...cartData};
            obj.cartItems[hasEventIdx].ticketList.push({
              ticketCount: counter + 1,
              ticketType: data,
            });
            updateCart(obj);
          } else {
            // Cart Has Same Event And Same Ticket Type
            let obj = {...cartData};
            obj.cartItems[hasEventIdx].ticketList[hasTicketType] = {
              ...obj.cartItems[hasEventIdx].ticketList[hasTicketType],
              ticketCount:
                obj.cartItems[hasEventIdx].ticketList[hasTicketType]
                  .ticketCount + 1,
            };
            updateCart(obj);
          }
        }
      } else {
        // push to cart
        updateCart({
          organizerId: organizerId,
          cartItems: [
            {
              eventId: eventId,
              eventName: eventName,
              ticketList: [
                {
                  ticketCount: counter + 1,
                  ticketType: data,
                },
              ],
            },
          ],
        });
      }
    }
    if (type === 'minus' && counter > 0) {
      const hasEventIdx = cartData.cartItems.findIndex(
        item => item.eventId === eventId,
      );
      const hasTicketType = cartData.cartItems[
        hasEventIdx
      ].ticketList.findIndex(item => item.ticketType._id === data._id);
      let obj = {...cartData};
      obj.cartItems[hasEventIdx].ticketList[hasTicketType] = {
        ...obj.cartItems[hasEventIdx].ticketList[hasTicketType],
        ticketCount:
          obj.cartItems[hasEventIdx].ticketList[hasTicketType].ticketCount - 1,
      };
      updateCart(obj);
      setcounter(counter - 1);
      // console.log(obj.cartItems[hasEventIdx],hasTicketType);
      // setcounter(counter - 1);
      //   data = {
      //     ...data,
      //     counter: data.counter - 1,
      //   };
    }
  };

  return (
    <View style={styles.ticketContainer}>
      <Text
        style={{
          color: colors.coal,
          fontWeight: '500',
          fontSize: totalSize(2),
        }}>
        {data?.name}
      </Text>
      {data?.limit > 0 && saleValid ? (
        <View style={{...styles.flexRow, alignItems: 'center'}}>
          <Pressable
            style={styles.counterBox}
            onPress={() => countHandler('minus')}>
            <AntIcon name="minus" color={colors.black} size={totalSize(1.3)} />
          </Pressable>
          <Text style={{color: colors.black, marginHorizontal: width(1)}}>
            {counter} /{' '}
            <Text style={{fontWeight: '600', color: colors.black}}>
              {data?.limit < 10 ? '0' + data?.limit : data?.limit}
            </Text>
          </Text>
          <Pressable
            style={styles.counterBox}
            onPress={() => countHandler('plus')}>
            <AntIcon name="plus" color={colors.black} size={totalSize(1.3)} />
          </Pressable>
        </View>
      ) : (
        <>
          <View style={styles.sellEndContainer}>
            <Text style={styles.sellEndedText}>Sale Ended</Text>
          </View>
        </>
      )}
    </View>
  );
};

export default TicketCounter;

const styles = StyleSheet.create({
  counterBox: {
    padding: totalSize(1),
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    marginHorizontal: width(2),
  },
  flexRow: {
    flexDirection: 'row',
  },
  ticketContainer: {
    paddingHorizontal: width(7),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: height(1),
  },
  sellEndContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: totalSize(1),
    backgroundColor: colors.skin,
    borderRadius: 7,
  },
  sellEndedText: {
    color: colors.disableColor,
  },
});
