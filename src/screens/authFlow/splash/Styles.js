import {StyleSheet} from 'react-native';
import {colors} from '../../../utils/constants/colors';
const styles = StyleSheet.create({
  wraper: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  text: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: '60%',
    fontSize: 40,
    fontWeight: '700',
    letterSpacing: 3,
    color: colors.white,
  },
  patternImg: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
  },
});
export default styles;
