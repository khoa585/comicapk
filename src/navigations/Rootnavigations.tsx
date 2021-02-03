import React from 'react';
import { createStackNavigator, StackNavigationOptions, TransitionPresets } from '@react-navigation/stack';
const Stack = createStackNavigator();
import { navigationRef } from './NavigationService';
import { NavigationContainer } from '@react-navigation/native';
import * as screen from '../constants/ScreenTypes'
import MainHome from '../screens/MainHome';
import Search from '../screens/Search';
import AuthStack from './AuthStack';
import DetailChap from '../screens/DetailChap';
import ReadComic from '../screens/ReadComic';


const navigationOptions: StackNavigationOptions = {
    headerShown: false,
    gestureEnabled: false
}

export default () => {
    return (
        <NavigationContainer ref={navigationRef} >
            <Stack.Navigator screenOptions={navigationOptions} initialRouteName={screen.MAIN_HOME_SCREEN} >
                <Stack.Screen name={screen.MAIN_HOME_SCREEN} component={AuthStack} />
                <Stack.Screen name={screen.SEARCH_SCREEN} component={Search} />
                <Stack.Screen name={screen.DETIAL_COMIC_SCREEN} component={DetailChap} />
                <Stack.Screen name={screen.DETIAL_CHAPTER} component={ReadComic} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

