import {StyleSheet} from 'react-native';
import {height, totalSize, width} from 'react-native-dimension';
import {colors} from '../../../utils/constants/colors';
const styles = StyleSheet.create({
  wraper: {
    flex: 1,
    backgroundColor: colors.light,
    justifyContent: 'flex-start',
  },
  successText: {
    textAlign: 'center',
    color: colors.coal,
    fontWeight: '500',
    fontSize: totalSize(3),
    letterSpacing: 1,
    marginVertical: height(2),
  },
  moreEventContainer: {
    width: width(100),
    paddingLeft: width(7),
    marginBottom: height(5),
    flex: 1,
  },
});
export default styles;
