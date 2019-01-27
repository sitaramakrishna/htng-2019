/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {RkButton, RkCalendar} from 'react-native-ui-kitten';
import Home from './components/screens/home';
import Details from './components/screens/details';
import { StackNavigator } from 'react-navigation';


const AppNavigator = StackNavigator({
    Home: { screen: Home },
    Details: { screen: Details }
});

type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <AppNavigator/>
        );
    }
}
