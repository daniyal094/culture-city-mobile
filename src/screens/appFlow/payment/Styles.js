import {StyleSheet} from 'react-native';
import {height, totalSize, width} from 'react-native-dimension';
import {colors} from '../../../utils/constants/colors';
const styles = StyleSheet.create({
  wraper: {
    flex: 1,
    backgroundColor: colors.light,
    justifyContent: 'flex-start',
  },
  cardDetailContainer: {
    position: 'absolute',
    bottom: 0,
    right: 50,
    paddingHorizontal: width(11),
  },
  cardNum: {
    color: colors.gray,
    fontSize: totalSize(1.5),
    marginBottom: height(2),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: height(7),
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
  historyContainer: {
    backgroundColor: '#416DAB',
    paddingVertical: height(4.5),
    paddingLeft: width(8),
    marginTop: height(2),
  },
  historyHeading: {
    color: colors.white,
    fontWeight: '600',
    fontSize: totalSize(1.7),
    marginVertical: height(2),
  },
  debitBtn: {
    position: 'absolute',
    right: 15,
    bottom: height(17.5),
  },
  iconContainer: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: totalSize(0.5),
  },
});
export default styles;
