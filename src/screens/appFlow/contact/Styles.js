import {StyleSheet} from 'react-native';
import {height, totalSize, width} from 'react-native-dimension';
import {colors} from '../../../utils/constants/colors';
const styles = StyleSheet.create({
  wraper: {
    flex: 1,
    backgroundColor: colors.white,
  },
  imgContainer: {
    width: width(100),
    height: height(30),
    marginBottom: height(2),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: height(5),
    left: width(2),
  },
  backLink: {
    color: colors.white,
    fontSize: totalSize(1.7),
    marginLeft: 2,
  },
  heading: {
    color: colors.white,
    fontSize: totalSize(3.2),
    fontWeight: '600',
    letterSpacing: 1,
    position: 'absolute',
    bottom: width(2),
    left: width(3),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: width(10),
    marginTop: height(2),
    width: width(70),
  },
  detailText: {
    color: colors.black,
    fontWeight: '400',
    fontSize: totalSize(1.7),
    marginLeft: 7,
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: height(3),
  },
});
export default styles;
