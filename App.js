import {SafeAreaView, StatusBar} from 'react-native';
import React from 'react';
import Navigation from './src/navigation';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar translucent backgroundColor="transparent" />
      <Navigation />
    </SafeAreaView>
  );
};

export default App;
