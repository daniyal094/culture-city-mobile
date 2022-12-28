import {StyleSheet} from 'react-native';
import {height, totalSize, width} from 'react-native-dimension';
import {colors} from '../../../utils/constants/colors';
const styles = StyleSheet.create({
  wraper: {
    flex: 1,
    backgroundColor: colors.lightGray,
    justifyContent: 'flex-start',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkoutContainer: {
    borderRadius: 10,
    backgroundColor: colors.white,
    marginVertical: height(2),
    width: width(95),
    paddingVertical: height(2),
    paddingHorizontal: width(3),
    alignSelf:'center'
  },
  checkoutHeading:{
    color: colors.disableColor,
    fontSize: totalSize(2.4),
    fontWeight: '600',
    letterSpacing: 1,
  },
  checkoutEventHeading:{
    color: colors.black,
    fontSize: totalSize(1.8),
    fontWeight:'500',
    marginVertical:height(1)
  }
});
export default styles;
