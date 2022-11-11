/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import setup from './src/utils/config/axios-interceptors';

AppRegistry.registerComponent(appName, () => App);
setup();