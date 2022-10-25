import {
  View,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import styles from './Styles';
import banner1 from '../../../assets/images/banner1.png';
import {height, width} from 'react-native-dimension';
import FestivalCardBg from '../../../components/FestivalCardBg';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import NearFestivalCard from '../../../components/NearFestivalCard';
import festival from '../../../assets/images/festival.png';
import footer from '../../../assets/images/footer.png';
import TabBar from '../../../components/TabBar';

const Dashboard = () => {
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
      img: banner1,
    },
    {
      id: 2,
      heading: 'CULTURE IN YOUR BACKYARD',
      description:
        'Ethnic Events is your one-stop shop for all things cultural in Chicago.',
      img: banner1,
    },
    {
      id: 3,
      heading: 'CULTURE IN YOUR BACKYARD',
      description:
        'Ethnic Events is your one-stop shop for all things cultural in Chicago.',
      img: banner1,
    },
  ];

  const renderItem = ({item}) => {
    return (
      <ImageBackground
        source={item?.img}
        style={{width: width(100)}}
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
          <View style={{height: height(30), width: width(100)}}>
            <FlatList
              numColumns={1}
              data={dataList}
              renderItem={renderItem}
              horizontal={true}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View style={styles.secondSection}>
            {/* Tabs List */}
            <View style={styles.tabListContainer}>
              <TouchableOpacity style={styles.tabListItem}>
                <Text style={{fontWeight: '700', color: 'black'}}>
                  Recomended
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tabListItem}>
                <Text>Trending</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tabListItem}>
                <Text>Design</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tabListItem}>
                <Icon name="arrow-forward-ios" size={14} color="#9BA1AF" />
              </TouchableOpacity>
            </View>
            <FlatList
              numColumns={1}
              data={dataList}
              renderItem={FestivalCardBg}
              horizontal={true}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
              style={{marginTop: height(2)}}
            />
            <TouchableOpacity>
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
          <View style={{marginLeft: width(4)}}>
            {/* <NearFestivalCard /> */}
            <FlatList
              numColumns={1}
              data={dataList}
              renderItem={NearFestivalCard}
              horizontal={true}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
              style={{marginTop: height(2)}}
            />
          </View>

          <ImageBackground
            source={footer}
            resizeMode="cover"
            style={{
              width: width(100),
              height: height(25),
              alignSelf: 'center',
              marginTop: 10,
              marginBottom: 20,
            }}></ImageBackground>
        </ScrollView>
        <TabBar selectedTab={'Home'} />
      </View>
    </>
  );
};

export default Dashboard;
