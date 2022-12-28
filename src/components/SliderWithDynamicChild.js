import {Dimensions, FlatList, View, Animated} from 'react-native';
import React, {useEffect, useId, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
const {width} = Dimensions.get('window');

function SliderWithDynamicChild({
  data,
  RenderItem,
  containerHeight = 100,
  containerWidth = '100%',
}) {
  const [dataList, setdataList] = useState(data);
  const ref = useRef('');
  const scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, width);
  const id = useId();

  useEffect(() => {
    setdataList(data);
    const numberofData = dataList.length;
    let scrollValue = 0,
      scrolled = 0;

    var sliderInterval = setInterval(() => {
      scrolled++;
      if (scrolled < numberofData) {
        scrollValue = scrollValue + width;
      } else {
        (scrollValue = 0), (scrolled = 0);
      }
      ref.current.scrollToOffset({animated: true, offset: scrollValue});
    }, 8000);
    return () => {
      clearInterval(sliderInterval);
    };
  });

  if (data && data.length) {
    return (
      <>
        <View style={{height: containerHeight, width: containerWidth}}>
          <FlatList
            numColumns={1}
            data={dataList}
            ref={flatList => (ref.current = flatList)}
            renderItem={({item, idx}) => <RenderItem item={item} key={id} />}
            horizontal={true}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            snapToAlignment={'center'}
            scrollEventThrottle={16}
            decelerationRate="fast"
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
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
}

export default SliderWithDynamicChild;

const styles = StyleSheet.create({
  dotView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
