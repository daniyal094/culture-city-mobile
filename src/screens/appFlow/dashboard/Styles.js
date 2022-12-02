import {StyleSheet} from 'react-native';
import {height, width} from 'react-native-dimension';
import {colors} from '../../../utils/constants/colors';
const styles = StyleSheet.create({
  wraper: {
    flex: 1,
    backgroundColor: colors.light,
  },
  bannerContainer: {
    width: width(90),
    marginHorizontal: width(4),
    height: height(20),
    backgroundColor: colors.white,
  },
  bannerHeading: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.white,
    letterSpacing: 1,
  },
  bannerDetail: {
    fontSize: 11,
    color: colors.white,
    marginTop: 5,
    width: width(50),
  },
  bannerReadLink: {
    fontSize: 11,
    color: colors.camel,
    marginTop: 5,
  },
  secondSection: {
    backgroundColor: colors.white,
    marginVertical: height(1),
    width: width(100),
    paddingVertical: height(1),
  },
  tabListContainer: {
    flexDirection: 'row',
    paddingLeft: width(8),
    marginBottom: height(2),
    alignItems: 'center',
  },
  tabListItem: {
    marginHorizontal: width(2),
  },
  Link: {
    alignSelf: 'flex-end',
    marginRight: width(5),
    color: colors.lightBlue,
    fontWeight: '500',
    fontSize: 15,
    marginTop:height(2)
  },
  heading:{
    color:colors.black,
    fontWeight:'600',
    fontSize:16,
    marginHorizontal:width(5),
    marginTop:height(2),
    marginBottom:height(1)
  }
});
export default styles;
