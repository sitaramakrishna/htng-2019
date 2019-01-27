/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import Home from './components/screens/home';
import { StackNavigator } from 'react-navigation';

const AppNavigator = StackNavigator({
    Home: { screen: Home }
});

type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <AppNavigator/>
        );
    }
}
