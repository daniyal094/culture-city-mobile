import {StyleSheet} from 'react-native';
import {height, totalSize, width} from 'react-native-dimension';
import {colors} from '../../../utils/constants/colors';
const styles = StyleSheet.create({
  wraper: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height(7),
    marginHorizontal: width(5),
    marginBottom:height(2)
  },
  headerHeading: {
    color: colors.black,
    fontSize: totalSize(2.5),
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
});
export default styles;