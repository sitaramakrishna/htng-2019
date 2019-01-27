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
    Button,
    ActivityIndicator
} from 'react-native';

import {
    RkText,
    RkStyleSheet,
    RkTheme,
    RkTabView,
    RkButton,
    RkChoice,
    RkCalendar,
    RkBadge,
    RkCard
} from 'react-native-ui-kitten';
import CalendarPicker from 'react-native-calendar-picker';
import {GradientButton} from '../gradientButton/index';
import {scaleVertical, scale} from "../utils/scale";
import LinearGradient from 'react-native-linear-gradient';
import _ from 'lodash';


export default class Home extends React.Component {
    static navigationOptions = {
        title: 'Reservations',
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedStartDate: null,
            guestsList: ["John", "Mike", "Krishna"],
            nearbyCustomer: 0,
        };
        this.onDateChange = this.onDateChange.bind(this);
        this.guestsList = ["John", "Mike", "Krishna", "Jerry", 'Michael', 'Barry'];
    }

    onDateChange(date) {
        let a = [];
        for (let i = this.guestsList.length - 1; i > 2; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            if(a.indexOf(this.guestsList[j]) === -1) {
                a.push(this.guestsList[j]);
            }
        }
        this.setState({
            selectedStartDate: date,
            guestsList: a
        });
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({nearbyCustomer: 1});
        }, 5000);
        setTimeout(() => {
            this.setState({nearbyCustomer: 2});
        }, 10000);
    }
    shuffleGuests(guests) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
    render() {
        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <RkCard rkType='shadowed' style={{borderRadius: 15, marginTop: 15}}>
                    <View style={styles.calendar}>
                        <CalendarPicker
                            onDateChange={this.onDateChange}
                            selectedDayColor="#D8AAF3"
                            textStyle={styles.textStyle}
                            todayBackgroundColor='#7aadff'
                        />

                        {/*<View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'space-between'}}>
                            <Text style={styles.textStyle}>SELECTED DATE: </Text>
                            <Text style={styles.textStyle}>{ startDate }</Text>
                        </View>*/}
                    </View>
                    <View style={{flex: 1}}>
                        {this.state.guestsList.map((data, index) => {
                            return (
                                <RkButton rkType='user' key={index}
                                          onPress={() => this.props.navigation.navigate('Details', {
                                              name: data
                                          })}
                                          style={{marginTop: 10}}
                                >
                                    <LinearGradient colors={['#7C79F7', '#7C79F7']} style={styles.linearGradient}>
                                        <Text style={styles.buttonText}>
                                            {data}'s Reservation
                                        </Text>
                                    </LinearGradient>
                                    {this.state.nearbyCustomer === 1 && index === 0 ? <ActivityIndicator size="small" color="#8f8f8f" />
                                        : null
                                    }
                                    {this.state.nearbyCustomer === 2 && index === 0 ? <RkChoice selected rkType='posNeg' style={styles.radio}/>
                                        : null
                                    }
                                </RkButton>
                            )
                        })}
                    </View>
                </RkCard>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    calendar: {
        flex: 0.9,
        backgroundColor: 'white',
        marginTop: 5,
        height: 150,
        borderRadius: 15
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
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 2,
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
    width: Dimensions.get('window').width - 50,
    //borderRadius: 10,
    backgroundColor: 'transparent',
});
