import {StyleSheet} from 'react-native';
import {height, width} from 'react-native-dimension';
import {colors} from '../../../utils/constants/colors';
const styles = StyleSheet.create({
  wraper: {
    backgroundColor: colors.lightGray,
    flex: 1,
    paddingHorizontal: width(7),
  },
  heading: {
    fontSize: 28,
    color: colors.black,
    textAlign: 'center',
    marginTop: height(10),
    letterSpacing: 1,
  },
  boorderBtm: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    marginTop: height(3),
  },
  subHeading: {
    fontSize: 25,
    letterSpacing: 1,
    textAlign: 'left',
    color: colors.black,
  },
  tileRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
});
export default styles;
