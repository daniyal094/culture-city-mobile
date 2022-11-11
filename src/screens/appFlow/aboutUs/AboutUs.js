import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import styles from './Styles';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import AntIcon from 'react-native-vector-icons/dist/AntDesign';
import {totalSize, width} from 'react-native-dimension';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../../utils/constants/colors';
import AboutUsCard from '../../../components/AboutUsCard';
import about1 from '../../../assets/images/about1.png';
import about2 from '../../../assets/images/about2.png';
import about3 from '../../../assets/images/about3.png';

const AboutUs = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.wraper}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.row}>
          <AntIcon name="arrowleft" size={totalSize(2)} color={colors.black} />
          <Text style={styles.backLink}>Back</Text>
        </Pressable>
        <Text style={styles.headerHeading}>About Us</Text>
        <View></View>
      </View>
      <ScrollView>
        <Text style={styles.welcomHeading}>Welcome!</Text>
        <Text style={styles.detailText}>
          We are a Chicago based company. We started with the focus of making
          cultural exploration possible wherever we are.
        </Text>
        <Text style={styles.detailText}>
          We are committed to global diversity and awareness. More specifically
          we want to facilitate the opportunity for everyone to engage in
          experiences from various cultures that collectively represent the
          people of the USA.{' '}
        </Text>
        <Text style={styles.detailText}>
          We want people to be able to travel internationally right here in
          their cities in the USA and experience a different culture without
          having to get on a plane… We also want it to be easier for people to
          share their events and communities with others who may not normally
          have access.
        </Text>
        <Text style={styles.secondHeading}>WHO ARE WE</Text>
        <View style={{width: width(100), alignItems: 'center'}}>
          <AboutUsCard
            name={'Dr. Nitha Fiona Nagubadi'}
            designation="Founder"
            detail={
              'Doctorate in business psychology with research on foreign culture and creativity. 15 years experience managing international teams and projects for ecommerce programs for global brands. Passion for and extensive experience with organizing cultural events '
            }
            img={about1}
          />
          <AboutUsCard
            name={'Raven Palmer'}
            designation="Chief Technology Officer"
            detail={
              'Recent grad from Columbia College Chicago with a bachelor’s degree in Public Relations. Even though I’m not a marketing major, I’ve always been interested in learning more about it. I believe combining my PR skills with my new marketing skills'
            }
            img={about2}
          />
          <AboutUsCard
            name={'Karey Powell'}
            designation="Marketing Manager"
            detail={
              'Karey is the Head of Technology at Ethnic.events. A Software Engineer with over 10 years of experience in hands-on web and mobile app development, distributed systems, cloud infrastructure, testing, performance, scalability, and infrastructure security. '
            }
            img={about3}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AboutUs;
