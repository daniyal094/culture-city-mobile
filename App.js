import {SafeAreaView} from 'react-native';
import React from 'react';
import Navigation from './src/navigation';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Navigation />
    </SafeAreaView>
  );
};

export default App;
