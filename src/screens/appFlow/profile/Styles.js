import {StyleSheet} from 'react-native';
import {height, totalSize, width} from 'react-native-dimension';
import {colors} from '../../../utils/constants/colors';
const styles = StyleSheet.create({
  wraper: {
    backgroundColor: colors.white,
    flex: 1,
  },
  backLink: {
    fontSize: totalSize(1.8),
    color: colors.coal,
    marginLeft: 3,
  },
  headerContainer: {
    width: width(100),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width(7),
    marginTop: height(6),
  },
  profilePicture: {
    width: width(30),
    height: height(15),
    borderRadius: 100,
    marginBottom: height(2),
  },
  profilePictureContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height(4),
  },
  heading: {
    fontSize: totalSize(2),
    color: colors.black,
    fontWeight: '600',
    letterSpacing: 1,
  },
  profileDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: height(2),
    paddingHorizontal: width(4),
  },
  profileDetailHeading: {
    color: colors.secondary,
    fontWeight: '700',
    fontSize: totalSize(1.5),
    textAlign: 'center',
  },
  profileDetailInfo: {
    color: colors.coal,
    fontWeight: '500',
    fontSize: totalSize(1.3),
    textAlign: 'center',
  },
  tagHeading: {
    color: colors.black,
    fontWeight: '500',
    fontSize: totalSize(1.8),
    paddingHorizontal: width(10),
    marginTop: height(1),
  },
  tileContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: width(8),
    marginTop: height(1),
  },
  historyContainer: {
    backgroundColor: colors.primary,
    paddingVertical: height(2),
    paddingLeft: width(8),
    marginTop: height(2),
    marginBottom: height(5),
    flex:1
  },
  historyHeading: {
    color: colors.white,
    fontWeight: '600',
    fontSize: totalSize(1.7),
    marginVertical: height(2),
  },
  editBtn: {
    backgroundColor: colors.primary,
    padding: totalSize(1),
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editProfileContainer: {
    paddingHorizontal: width(7),
    paddingVertical: height(3),
    alignItems: 'center',
    height: height(70),
  },
  editInput: {
    height: height(7),
    borderWidth: 1,
    width: width(85),
    borderColor: colors.coal,
    paddingLeft: width(2),
    borderRadius: 20,
    marginVertical: height(2),
  },
});
export default styles;
