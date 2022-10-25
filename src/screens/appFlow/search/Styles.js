import {StyleSheet} from 'react-native';
import {height, totalSize, width} from 'react-native-dimension';
import {colors} from '../../../utils/constants/colors';
const styles = StyleSheet.create({
  wraper: {
  flex:1,
    backgroundColor: colors.lightGray,
  },
  headerContainer: {
    backgroundColor: colors.primary,
    height: height(15),
    width: width(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchFieldContainer: {
    backgroundColor: colors.white,
    width: width(90),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width(4),
    marginTop: height(4),
    borderRadius: totalSize(2),
  },
});
export default styles;