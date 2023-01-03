import {StyleSheet} from 'react-native';
import {height, totalSize, width} from 'react-native-dimension';
import {colors} from '../../../utils/constants/colors';
const styles = StyleSheet.create({
  wraper: {
    backgroundColor: colors.white,
  },
  img: {
    width: width(100),
    height: height(30),
  },
  bodyWrapper: {
    paddingHorizontal: width(8),
    marginVertical: height(2),
  },
  ownerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profilePicture: {
    width: width(19),
    height: height(9),
    borderRadius: 50,
  },
  profileHeading: {
    color: colors.black,
    fontSize: totalSize(2.5),
    fontWeight: '500',
  },
  locationIcon: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    paddingHorizontal: width(2.4),
    paddingVertical: height(1),
    marginRight: width(2),
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
  discription: {
    textAlign: 'justify',
    paddingHorizontal: width(8),
    marginVertical: height(2),
    lineHeight: 20,
    color:colors.coal
  },
  btnContainer: {
    marginTop: height(1),
    width: width(100),
    alignItems: 'center',
    marginBottom:height(2)
  },
  backLink: {
    fontSize: totalSize(2),
    color: colors.white,
    marginLeft: 3,
  },
  emptyCardAlert: {
    backgroundColor: colors.sky,
    borderRadius: 7,
    paddingVertical: height(2),
    paddingHorizontal: width(1),
    width:width(96),
    justifyContent:'center',
    alignItems:'center',
  },
});
export default styles;
