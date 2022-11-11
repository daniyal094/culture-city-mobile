import {
  View,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './Styles';
import banner1 from '../../../assets/images/slide1.jpg';
import banner2 from '../../../assets/images/slide2.jpg';
import banner3 from '../../../assets/images/slide3.jpg';
import banner4 from '../../../assets/images/slide4.jpg';

import {height, totalSize, width} from 'react-native-dimension';
import FestivalCardBg from '../../../components/FestivalCardBg';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import NearFestivalCard from '../../../components/NearFestivalCard';
import festival from '../../../assets/images/festival.png';
import TabBar from '../../../components/TabBar';
import SliderWithDynamicChild from '../../../components/SliderWithDynamicChild';
import useEventApi from '../../../utils/api/event.api';
import {colors} from '../../../utils/constants/colors';
import {useNavigation} from '@react-navigation/native';
import {routes} from '../../../utils/constants/routes';
const Dashboard = () => {
  const {useFetchHomeEventsService, useFetchNearByEventsService} =
    useEventApi();
  const {isLoading: isLoadingHomeEvent, data: homeEvents} =
    useFetchHomeEventsService();
  const {isLoading: isLoadingNearByEvent, data: nearByEvents} =
    useFetchNearByEventsService();
  const [selectedtab, setselectedtab] = useState('Featured');
  const [tabData, settabData] = useState(['One']);

  const navigation = useNavigation();
  const dataList = [
    {
      id: 0,
      heading: 'CULTURE IN YOUR BACKYARD',
      description:
        'Ethnic Events is your one-stop shop for all things cultural in Chicago.',
      img: banner1,
    },
    {
      id: 1,
      heading: 'CULTURE IN YOUR BACKYARD',
      description:
        'Ethnic Events is your one-stop shop for all things cultural in Chicago.',
      img: banner2,
    },
    {
      id: 2,
      heading: 'CULTURE IN YOUR BACKYARD',
      description:
        'Ethnic Events is your one-stop shop for all things cultural in Chicago.',
      img: banner3,
    },
    {
      id: 3,
      heading: 'CULTURE IN YOUR BACKYARD',
      description:
        'Ethnic Events is your one-stop shop for all things cultural in Chicago.',
      img: banner4,
    },
  ];
  console.log('homeEvents', homeEvents);
  console.log('nearByEvents', nearByEvents);
  useEffect(() => {
    settabData(nearByEvents);
  }, [isLoadingHomeEvent]);

  const tabChageHandler = tabName => {
    setselectedtab(tabName);
    if (tabName === 'Featured') {
      // settabData(homeEvents?.featuredEvents);
      settabData(nearByEvents);
    }
    if (tabName === 'Populer') {
      settabData(homeEvents?.popularEvents);
    }
    if (tabName === 'Upcoming') {
      settabData(homeEvents?.upcomingEvents);
    }
  };
  const RenderItem = ({item}) => {
    return (
      <ImageBackground
        source={item?.img}
        style={{width: width(100), height: height(30)}}
        resizeMode="cover">
        <View
          style={{
            position: 'absolute',
            bottom: height(6),
            width: width(70),
            paddingHorizontal: width(5),
          }}>
          <Text style={styles.bannerHeading}>CULTURE IN YOUR BACKYARD</Text>
          <Text style={styles.bannerDetail}>
            Ethnic Events is your one-stop shop for all things cultural in
            Chicago.
          </Text>
          <TouchableOpacity>
            <Text style={styles.bannerReadLink}>Read more</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  };

  return (
    <>
      <View style={styles.wraper}>
        <ScrollView>
          <SliderWithDynamicChild
            data={dataList}
            RenderItem={RenderItem}
            containerHeight={height(30)}
            containerWidth={width(100)}
          />
          {isLoadingHomeEvent ? (
            <View
              style={{
                height: height(60),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size={'large'} color={colors.secondary} />
            </View>
          ) : (
            <>
              <View style={styles.secondSection}>
                {/* Tabs List */}
                <View style={styles.tabListContainer}>
                  {['Featured', 'Populer', 'Upcoming'].map((item, idx) => (
                    <TouchableOpacity
                      style={styles.tabListItem}
                      onPress={() => tabChageHandler(item)}>
                      <Text
                        style={{
                          fontWeight: selectedtab === item ? '700' : '400',
                          color:
                            selectedtab === item
                              ? colors.black
                              : colors.disableColor,
                        }}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <FlatList
                  numColumns={1}
                  data={tabData || []}
                  renderItem={({item, idx}) => (
                    <FestivalCardBg data={item} key={idx + 1} />
                  )}
                  horizontal={true}
                  keyExtractor={item => item.id}
                  showsHorizontalScrollIndicator={false}
                  style={{marginTop: height(2)}}
                />
                {tabData?.length < 1 && (
                  <View
                    style={{
                      width: width(100),
                      height: height(20),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: totalSize(2),
                        color: colors.disableColor,
                        fontWeight: '600',
                        letterSpacing: 1,
                      }}>
                      Comming Soon
                    </Text>
                  </View>
                )}
                <TouchableOpacity
                  onPress={() => navigation.navigate(routes.eventList)}>
                  <Text style={styles.Link}>See All </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.secondSection}>
                <Text style={styles.heading}>Get Inspired</Text>

                <ImageBackground
                  source={festival}
                  resizeMode="cover"
                  style={{
                    width: width(90),
                    height: height(25),
                    alignSelf: 'center',
                    marginTop: 10,
                  }}
                  imageStyle={{borderRadius: 10}}></ImageBackground>
              </View>
              <Text style={styles.heading}>Events near you </Text>
              <View style={{marginLeft: width(4), marginBottom: height(10)}}>
                {/* <NearFestivalCard /> */}
                <FlatList
                  numColumns={1}
                  data={nearByEvents || {}}
                  renderItem={({item, idx}) => (
                    <NearFestivalCard item={item} key={idx + 1} />
                  )}
                  horizontal={true}
                  keyExtractor={item => item.id}
                  showsHorizontalScrollIndicator={false}
                  style={{marginTop: height(2)}}
                />
              </View>
            </>
          )}
        </ScrollView>
        <TabBar selectedTab={'Home'} />
      </View>
    </>
  );
};

export default Dashboard;
