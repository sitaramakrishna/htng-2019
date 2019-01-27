import React from 'react';
import {
    Alert,
    View,
    Text,
    Image,
    ScrollView,
    Dimensions,
    AppState,
    StyleSheet,
    NetInfo,
    Button
} from 'react-native';

import {
    RkText,
    RkStyleSheet,
    RkTheme,
    RkTabView,
    RkButton,
    RkCalendar,
    RkBadge
} from 'react-native-ui-kitten';
import CalendarPicker from 'react-native-calendar-picker';
import {GradientButton} from '../gradientButton/index';
import {scaleVertical, scale} from "../utils/scale";
import LinearGradient from 'react-native-linear-gradient';

export default class Details extends React.Component {
    static navigationOptions = {
        title: '',
    };
    constructor(props) {
        super(props);
        this.state = {
            selectedStartDate: null,
        };
    }
    
    render() {
        const { navigation } = this.props;
        const name = navigation.getParam('name', 'Guest');
        
        return (
            <View style={styles.container}>
                <Text>{name}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    textStyle: {
        fontFamily: 'Gill Sans',
    }
});

RkTheme.setType('RkButton', 'user', {
    height: 70,
    width: Dimensions.get('window').width - 50,
    borderRadius: 10,
    backgroundColor: 'transparent',
});
