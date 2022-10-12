import {StyleSheet} from 'react-native';
import {colors} from '../../../utils/constants/colors';

const styles = StyleSheet.create({
  wraper: {
    flex: 1,
  },
  bgContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    fontWeight: '700',
    letterSpacing: 3,
    color: colors.white,
  },
  btnContainer: {
    position: 'absolute',
    bottom: '5%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
});

export default styles;
