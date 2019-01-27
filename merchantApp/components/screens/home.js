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

export default class Home extends React.Component {
    static navigationOptions = {
        title: 'Reservations',
    };
    
    constructor(props) {
        super(props);
        this.state = {
            selectedStartDate: null,
        };
        this.onDateChange = this.onDateChange.bind(this);
    }
    
    onDateChange(date) {
        this.setState({
            selectedStartDate: date,
        });
    }

    render() {
        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        let guestList = ["Haoyang Li", "SRK", "Sandeep"];
        return (
            <View style={styles.container}>
                <View style={styles.calendar}>
                    <CalendarPicker
                        onDateChange={this.onDateChange}
                        selectedDayColor="#D8AAF3"
                        textStyle={styles.textStyle}
                        todayBackgroundColor='#7aadff'
                    />
                
                    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'space-between'}}>
                        <Text style={styles.textStyle}>SELECTED DATE: </Text>
                        <Text style={styles.textStyle}>{ startDate }</Text>
                    </View>
                </View>
                <View style={{flex: 1}}>
                    {guestList.map((data, index) => {
                        return (
                            <View style={{marginTop: 1}} key={index}>
                                <RkButton rkType='user'
                                    onPress={() => this.props.navigation.navigate('Details', {
                                        name: data,
                                    })}
                                >
                                    <LinearGradient colors={['#DEE8F8', '#B860ED', '#E5D4F1']} style={styles.linearGradient}>
                                        <Text style={styles.buttonText}>
                                            {data}
                                        </Text>
                                    </LinearGradient>
                                </RkButton>
                            </View>
                        )
                    })}
                </View>
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
    calendar: {
        flex: 0.9,
        backgroundColor: 'white',
        marginTop: 5,
        height: 150,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    user: {
        marginTop: 20,
    },
    button: {
        height: scaleVertical(70),
        width: scale(250),
    },
    linearGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: Dimensions.get('window').width - 50,
        borderRadius: 5
    },
    buttonText: {
        fontSize: 20,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
    textStyle: {
        fontFamily: 'Gill Sans',
    },
    rowStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    }
});

RkTheme.setType('RkButton', 'user', {
    height: 40,
    width: Dimensions.get('window').width - 50,
    borderRadius: 10,
    backgroundColor: 'transparent',
});
