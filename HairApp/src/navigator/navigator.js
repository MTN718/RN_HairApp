import React from 'react';
import {
  Platform
} from 'react-native';

import {translate,setI18nConfig} from '../common/translate_helper';


import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';

import SplashScreen from '../screens/splash'
import GreetingScreen from '../screens/greeting'
import GetStartScreen from '../screens/getstart'
import QuestionScreen from '../screens/question'
import MainScreen from '../screens/main'
import DetailScreen from '../screens/details'
import UpdateScreen from '../screens/update'
import Login from '../screens/login'
import TutorialScreen from '../screens/tutorial'
import TutoriallistScreen from '../screens/tutorial_list'


setI18nConfig();
const RootStack = createStackNavigator(
  {
    Splash:{
      screen: SplashScreen,
      navigationOptions: {
          header: null,
          gestureEnabled: false,
      }   
    },
    Greeting:{
      screen: GreetingScreen,
      navigationOptions: {
          header: null,
          gestureEnabled: false,
      }   
    },
    GetStart: {
      screen: GetStartScreen,
      navigationOptions: {
          header: null,
          gestureEnabled: false,
      }   
    },
    Question:{
      screen: QuestionScreen,
      navigationOptions: {
          header: null,
          gestureEnabled: false,
      }
    },
    Main:{
      screen: MainScreen,
      navigationOptions: {
          header: null,
          gestureEnabled: false,
      }
    },
    Details:{
      screen: DetailScreen,
      navigationOptions: {
          header: null,
          gestureEnabled: false,
      }
    },
    Update:{
      screen: UpdateScreen,
      navigationOptions: {
          header: null,
          gestureEnabled: false,
      }
    },
    Tutorial:{
      screen: TutorialScreen,
      navigationOptions: {
          header: null,
          gestureEnabled: false,
      }
    },
    TutorialList:{
      screen: TutoriallistScreen,
      navigationOptions: {
          header: null,
          gestureEnabled: false,
      }
    },
    Login:{
      screen: Login,
      navigationOptions: {
          header: null,
          gestureEnabled: false,
      }
    }
  }
);

const AppNavigator = createAppContainer(RootStack);
export default AppNavigator;

