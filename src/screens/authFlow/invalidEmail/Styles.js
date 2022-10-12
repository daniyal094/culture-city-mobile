import {StyleSheet} from 'react-native';
import {height, width} from 'react-native-dimension';
import {colors} from '../../../utils/constants/colors';
const styles = StyleSheet.create({
  wraper: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },

  heading: {
    fontWeight: '600',
    fontSize: 30,
    color: colors.black,
    letterSpacing: 1,
    marginTop: height(3),
  },
  error: {
    color: colors.secondary,
    fontWeight: '600',
    fontSize: 25,
    textAlign: 'center',
    paddingHorizontal: width(3),
    marginVertical: height(2),
  },
});
export default styles;
