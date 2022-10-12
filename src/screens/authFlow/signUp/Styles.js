import {StyleSheet} from 'react-native';
import {colors} from '../../../utils/constants/colors';
import {height, width} from 'react-native-dimension';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
  },
  heading: {
    margin: 20,
    fontSize: 25,
    fontWeight: '500',
    color: colors.light,
    letterSpacing: 3,
  },
  bodyContainer: {
    flex: 3,
    backgroundColor: colors.light,
  },
  firstBlock: {
    borderRadius: 15,
    backgroundColor: colors.white,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height(4),
    marginBottom: height(2),
    paddingVertical: height(5),
  },
  forgetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: width(5),
    paddingVertical: height(3),
  },
  box: {
    borderColor: '#D5D5D5',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    elevation: 4,
    width: width(70),
    marginTop: height(5),
    paddingHorizontal: width(5.5),
    paddingVertical: height(5),
    backgroundColor:colors.white
  },
  boxHeading: {
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 2,
    fontSize: 17,
    color: colors.black,
    marginTop: height(2),
  },
});
export default styles;
