import {StyleSheet} from 'react-native';
import {height, totalSize, width} from 'react-native-dimension';
import {colors} from '../../../utils/constants/colors';
const styles = StyleSheet.create({
  wraper: {
    flex: 1,
    backgroundColor: colors.white,
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
    justifyContent: 'center',
    paddingRight: width(4),
    marginTop: height(4),
    borderRadius: totalSize(2),
    paddingVertical:height(2)
  },
  listContainer: {
    height: height(80),
    paddingBottom: height(5),
    marginTop: height(2),
  },
  searchHeading: {
    color: colors.black,
    fontWeight: '500',
    fontSize: totalSize(2),
    textAlign: 'center',
  },
});
export default styles;
