import {SafeAreaView, StatusBar} from 'react-native';
import React from 'react';
import Navigation from './src/navigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const App = () => {
  const queryClient = new QueryClient();
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <QueryClientProvider client={queryClient}>
          <StatusBar translucent backgroundColor="transparent" />
          <Navigation />
        </QueryClientProvider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default App;
