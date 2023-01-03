import {StyleSheet} from 'react-native';
import {height, totalSize, width} from 'react-native-dimension';
import {colors} from '../../../utils/constants/colors';
const styles = StyleSheet.create({
  wraper: {
    flex: 1,
    backgroundColor: colors.light,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height(7),
    marginHorizontal: width(5),
    marginBottom:height(2)
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

  btnContainer: {
    width: width(100),
    alignItems: 'center',
    marginBottom:height(5)
  },


  mapContainer: {
    height: height(35),
    width: width(100),
  },
  map: {
    height: height(35),
    width: width(100),
  },
  EventHeading: {
    fontSize: totalSize(4),
    color: colors.black,
    fontWeight: '500',
    // letterSpacing:1,
    marginTop: height(2),
  },
  flexRow: {
    flexDirection: 'row',
  },
});
export default styles;
