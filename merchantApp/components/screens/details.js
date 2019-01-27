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
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';

import {
    RkText,
    RkStyleSheet,
    RkTheme,
    RkTabView,
    RkButton,
    RkCalendar,
    RkBadge,
    RkChoice,
    RkCard,
    RkChoiceGroup
} from 'react-native-ui-kitten';
import CalendarPicker from 'react-native-calendar-picker';
import {GradientButton} from '../gradientButton/index';
import {scaleVertical, scale} from "../utils/scale";
import LinearGradient from 'react-native-linear-gradient';

export default class Details extends React.Component {
    static navigationOptions = {
        title: 'Reservation details'
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedStartDate: null,
            prepareCheckIn: false,
            generateKeys: false,
            verifyIdentity: false,
            activateKeys: false,
        };
        //this.navigationOptions.title = this.props.navigation.state.params.name;
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({prepareCheckIn: true});
        }, 3000);

        setTimeout(() => {
            this.setState({generateKeys: true});
        }, 6000);
    }

    render() {
        const { navigation } = this.props;
        const name = navigation.getParam('name', 'Guest');
        const firstName = name.toString().split(" ")[0];
        const lastName = name.toString().split(" ")[1];
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <Text style={styles.infoTitle}>Name: {firstName}</Text>
                    <Text style={styles.infoTitle}>DoB: Feb 6th</Text>
                    <Text style={styles.infoTitle}>Small Talk: This is his 5th visit</Text>
                    <Text style={styles.infoTitle}>Fun fact:  Birthday is within 10 days</Text>


                </View>
                <View style={{flex: 1, marginLeft: 30}}>
                        <RkChoiceGroup rkType='bordered' style={styles.statusButtonStyle}>
                            <TouchableOpacity choiceTrigger>
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                    {this.state.prepareCheckIn ? <RkChoice selected rkType='posNeg' style={styles.radio}/>
                                        : <ActivityIndicator size="small" color="#8f8f8f" />
                                    }
                                    <Text style={styles.statusTitle}>Prepare for Check In</Text>
                                </View>
                            </TouchableOpacity>
                        </RkChoiceGroup>

                    <View style={{marginTop: 20}}>
                        <RkChoiceGroup rkType='bordered' style={styles.statusButtonStyle}>
                            <TouchableOpacity choiceTrigger>
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                    <RkChoice rkType='posNeg' style={styles.radio}/>
                                    <Text style={styles.statusTitle}>Verify Identify</Text>
                                </View>
                            </TouchableOpacity>
                        </RkChoiceGroup>
                    </View>

                    <View style={{marginTop: 20}}>
                        <RkChoiceGroup rkType='bordered' style={styles.statusButtonStyle}>
                            <TouchableOpacity choiceTrigger>
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                    {this.state.generateKeys ? <RkChoice selected rkType='posNeg' style={styles.radio}/>
                                        : <ActivityIndicator size="small" color="#8f8f8f" />
                                    }
                                    <Text style={styles.statusTitle}>Generate Keys</Text>
                                </View>
                            </TouchableOpacity>
                        </RkChoiceGroup>
                    </View>
                    <View style={{marginTop: 20}}>
                        <RkChoiceGroup rkType='bordered' style={styles.statusButtonStyle}>
                            <TouchableOpacity choiceTrigger>
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                    {<RkChoice rkType='posNeg' style={styles.radio}/>
                                    }
                                    <Text style={styles.statusTitle}>Activate Keys</Text>
                                </View>
                            </TouchableOpacity>
                        </RkChoiceGroup>
                    </View>
                    <View style={{marginTop: 20}}>
                        <RkChoiceGroup rkType='bordered' style={styles.statusButtonStyle}>
                            <TouchableOpacity choiceTrigger>
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                    <RkChoice rkType='posNeg' style={styles.radio}/>
                                    <Text style={styles.statusTitle}>Check Out</Text>
                                </View>
                            </TouchableOpacity>
                        </RkChoiceGroup>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    textStyle: {
        fontFamily: 'Gill Sans',
    },
    top: {
        flex: 0.4,
        flexDirection: 'column',
        marginTop: 20,
        marginLeft: 30,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    infoTitle: {
        fontFamily: 'Gill Sans',
        fontSize: 20,
        paddingTop: 10
    },
    statusTitle: {
        fontFamily: 'Gill Sans',
        fontSize: 20,
        paddingTop: 10,
        marginLeft: 20
    },
    radio: {
        marginTop: 5,
    },
    statusButtonStyle: {
        width: Dimensions.get('window').width - 60,
        marginRight: 20,
        marginTop: 10
    }
});
