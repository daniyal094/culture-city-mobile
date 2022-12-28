import {StyleSheet} from 'react-native';
import {height, totalSize, width} from 'react-native-dimension';
import {colors} from '../../../utils/constants/colors';
const styles = StyleSheet.create({
  wraper: {
    flex: 1,
    backgroundColor: colors.light,
    justifyContent: 'flex-start',
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height(7),
    marginHorizontal: width(5),
    marginBottom:height(2.5)
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartContainerBox: {
    borderRadius:10,
    borderWidth : 1,
    borderColor: colors.secondary,
    backgroundColor: colors.white,
    elevation : 3,
    margin:totalSize(1),
    paddingVertical:height(1),
    marginHorizontal:width(5),
  },
  cartItemHeading:{
    fontWeight:'600',
    color:colors.black,
    fontSize:totalSize(1.5),
    letterSpacing:1,
    marginVertical:5,
    marginLeft:width(2)
  }
});
export default styles;
