import {StyleSheet} from 'react-native';
import {height, totalSize, width} from 'react-native-dimension';
import {colors} from '../../../utils/constants/colors';
const styles = StyleSheet.create({
  wraper: {
    backgroundColor: colors.white,
    flex: 1
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height(7),
    marginHorizontal: width(5),
  },
  headerHeading: {
    color: colors.black,
    fontSize: totalSize(2),
    fontWeight: '600',
    letterSpacing: 1,
    marginRight: width(10),
  },
  backLink: {
    color: colors.black,
    fontSize: totalSize(1.5),
    fontWeight: '500',
    marginLeft: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcomHeading: {
    color: colors.black,
    fontWeight: '500',
    letterSpacing: 1,
    marginTop: height(3),
    marginBottom: height(1),
    fontSize: totalSize(2),
    marginHorizontal: width(5),
  },
  detailText: {
    color: colors.disableColor,
    fontWeight: '400',
    fontSize: totalSize(1.5),
    textAlign: 'justify',
    marginVertical: height(1),
    marginHorizontal: width(5),
  },
  secondHeading: {
    color: colors.black,
    fontWeight: '500',
    marginVertical: height(1),
    fontSize: totalSize(1.8),
    marginHorizontal: width(5),
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListText: {
    fontSize: totalSize(3),
    color: colors.disableColor,
    fontWeight: '600',
    letterSpacing: 1,
  },
});
export default styles;
