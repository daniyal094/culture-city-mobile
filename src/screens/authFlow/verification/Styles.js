import {StyleSheet} from 'react-native';
import {height, width} from 'react-native-dimension';
import {colors} from '../../../utils/constants/colors';
const styles = StyleSheet.create({
  wraper: {
    flex: 1,
    backgroundColor: colors.light,
    alignItems: 'center',
  },
  bodyContainer: {
    width: width(90),
    backgroundColor: colors.white,
    borderRadius: 15,
    marginTop: height(12),
    paddingVertical: height(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontWeight: '600',
    fontSize: 28,
    color: colors.black,
    letterSpacing: 1,
    marginTop: height(3),
  },
  subHeading: {
    color: colors.black,
    fontWeight: '400',
    fontSize: 15,
    textAlign: 'center',
    paddingHorizontal: width(3),
    marginVertical: height(2),
  },
  resendLink: {
    textAlign: 'right',
    width: width(100),
    marginRight: width(20),
    fontWeight: '700',
    color: 'black',
    marginTop: 5,
  },
});
export default styles;
