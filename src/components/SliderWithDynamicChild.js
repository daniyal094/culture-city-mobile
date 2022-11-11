import {Dimensions, FlatList, View, Animated} from 'react-native';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
const {width} = Dimensions.get('window');

var flatList;
const infiniteLoop = dataList => {
  const numberofData = dataList.length;
  let scrollValue = 0,
    scrolled = 0;

  setInterval(() => {
    scrolled++;
    if (scrolled < numberofData) {
      scrollValue = scrollValue + width;
    } else {
      (scrollValue = 0), (scrolled = 0);
    }
    this.flatList.scrollToOffset({animated: true, offset: scrollValue});
  }, 4000);
};

const SliderWithDynamicChild = ({
  data,
  RenderItem,
  containerHeight = 100,
  containerWidth = '100%',
}) => {
  const [dataList, setdataList] = useState(data);
  const scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, width);

  useEffect(() => {
    setdataList(data);
    infiniteLoop(data);
  });
  if (data && data.length) {
    return (
      <>
        <View style={{height: containerHeight, width: containerWidth}}>
          <FlatList
            numColumns={1}
            data={dataList}
            ref={flatList => (this.flatList = flatList)}
            renderItem={({item,idx}) => <RenderItem item={item} key={idx + 1}/>}
            horizontal={true}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            snapToAlignment={'center'}
            scrollEventThrottle={16}
            decelerationRate="fast"
            onScroll={Animated.event([
              {nativeEvent: {contentOffset: {x: scrollX}}},
            ],
            {useNativeDriver: false},
            )}
          />
        </View>
        <View style={styles.dotView}>
          {dataList.map((_, i) => {
            let opacity = position.interpolate({
              inputRange: [i - 1, i, i + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={i}
                style={{
                  opacity: opacity,
                  height: 5,
                  width: 5,
                  backgroundColor: '#595959',
                  margin: 8,
                  borderRadius: 5,
                }}
              />
            );
          })}
        </View>
      </>
    );
  } else {
    console.log('Please Provide a valid data List');
    return null;
  }
};

export default SliderWithDynamicChild;

const styles = StyleSheet.create({
  dotView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
