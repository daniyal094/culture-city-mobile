import {StyleSheet, Text, View} from 'react-native';
import {height, totalSize, width} from 'react-native-dimension';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {colors} from '../utils/constants/colors';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import FontIcon from 'react-native-vector-icons/dist/FontAwesome';
import {useCallback, useRef} from 'react';
import CustomBottomSheet from './CustomBottomSheet';
import {useNavigation} from '@react-navigation/native';
import {routes} from '../utils/constants/routes';
import SearchBottomSheet from './SearchBottomSheet';

const TabBar = ({selectedTab}) => {
  const navigation = useNavigation();
  const bottomSheetModalRef = useRef(null);
  const searchSheetModalRef = useRef(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handlePresentSearchModalPress = useCallback(() => {
    searchSheetModalRef.current?.present();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Pressable onPress={() => navigation.navigate(routes.home)}>
          <View
            style={{
              ...styles.rowContainer,
              borderBottomWidth: 4,
              borderBottomColor:
                selectedTab === 'Home' ? colors.lightBlue : colors.transparent,
            }}>
            <Icon
              name="home"
              size={totalSize(2.5)}
              color={selectedTab === 'Home' ? colors.lightBlue : colors.coal}
            />
            <Text
              style={{
                color: selectedTab === 'Home' ? colors.lightBlue : colors.coal,
                fontSize: totalSize(1.4),
              }}>
              Home
            </Text>
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate(routes.eventList)}>
          <View
            style={{
              ...styles.rowContainer,
              borderBottomWidth: 4,
              borderBottomColor:
                selectedTab === 'Event' ? colors.lightBlue : colors.transparent,
            }}>
            <Icon
              name="event"
              size={totalSize(2.5)}
              color={selectedTab === 'Event' ? colors.lightBlue : colors.coal}
            />
            <Text
              style={{
                color: selectedTab === 'Event' ? colors.lightBlue : colors.coal,
                fontSize: totalSize(1.4),
              }}>
              Event
            </Text>
          </View>
        </Pressable>
        <Pressable onPress={handlePresentSearchModalPress}>
          <View
            style={{
              ...styles.rowContainer,
              borderBottomWidth: 4,
              borderBottomColor:
                selectedTab === 'Search'
                  ? colors.lightBlue
                  : colors.transparent,
            }}>
            <Icon
              name="search"
              size={totalSize(2.5)}
              color={selectedTab === 'Search' ? colors.lightBlue : colors.coal}
            />
            <Text
              style={{
                color:
                  selectedTab === 'Search' ? colors.lightBlue : colors.coal,
                fontSize: totalSize(1.4),
              }}>
              Search
            </Text>
          </View>
        </Pressable>
        <Pressable onPress={handlePresentModalPress}>
          <View
            style={{
              ...styles.rowContainer,
              borderBottomWidth: 4,
              borderBottomColor:
                selectedTab === 'Menu' ? colors.lightBlue : colors.transparent,
            }}>
            <Icon
              name="menu"
              size={totalSize(2.5)}
              color={selectedTab === 'Menu' ? colors.lightBlue : colors.coal}
            />
            <Text
              style={{
                color: selectedTab === 'Menu' ? colors.lightBlue : colors.coal,
                fontSize: totalSize(1.4),
              }}>
              Menu
            </Text>
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate(routes.profile)}>
          <View
            style={{
              ...styles.rowContainer,
              borderBottomWidth: 4,
              borderBottomColor:
                selectedTab === 'Profile'
                  ? colors.lightBlue
                  : colors.transparent,
            }}>
            <FontIcon
              name="user"
              size={totalSize(2.5)}
              color={selectedTab === 'Profile' ? colors.lightBlue : colors.coal}
            />
            <Text
              style={{
                color:
                  selectedTab === 'Profile' ? colors.lightBlue : colors.coal,
                fontSize: totalSize(1.4),
              }}>
              Profile
            </Text>
          </View>
        </Pressable>
      </View>
      <SearchBottomSheet searchSheetModalRef={searchSheetModalRef}/>
      <CustomBottomSheet bottomSheetModalRef={bottomSheetModalRef} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGray,
    width: width(100),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: width(6),
    paddingBottom: height(1),
    paddingTop: height(0.5),
    alignSelf: 'center',
    elevation: 4,
    position: 'absolute',
    bottom: 0,
    zIndex:999
  },
  rowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: height(0.5),
    width: width(12),
  },
});
export default TabBar;
