import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import styles from './Styles';
import Header from '../../../components/Header';
import useEventApi from '../../../utils/api/event.api';
import {useUser} from '../../../utils/context/UserContenxt';
import {totalSize} from 'react-native-dimension';
import {colors} from '../../../utils/constants/colors';
import CustomTable from '../../../components/CustomTable';
const TicketOrders = () => {
  const userData = useUser();
  const user = userData.user;
  const {useFetchOrganizerTicketOrdersService} = useEventApi();
  const {isLoading, data} = useFetchOrganizerTicketOrdersService(user?._id);
  return (
    <View style={styles.wraper}>
      {isLoading ? (<>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} color={colors.secondary} />
        </View>
      </>) : (
        <>
        <Header heading={'Ticket Orders'} />
        {data?.length > 0 ? (
          <>
            <CustomTable
              tableHead={[
                // 'Order#',
                'Event',
                'Buyer',
                'Start Date',
                'Status',
                'Total',
              ]}
              tableData={data?.map(item => {
                return [
                  // idx + 1,
                  item.event.title,
                  item?.seeker?.firstName + ' ' + item?.seeker?.lastName,
                  item.event.startDateTime.split('T')[0],
                  item.isConfirmed ? 'Booking Confirmed' : 'Pending',
                  item.tickets + ' for ' + item.totalAmount,
                ];
              })}
            />
          </>
        ) : (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: totalSize(2),
                color: colors.disableColor,
                fontWeight: '600',
                letterSpacing: 1,
              }}>
              No Order Yet
            </Text>
          </View>
        )}
        </>
      )}
    </View>
  );
};

export default TicketOrders;
