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
    TouchableOpacity
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
        title: 'Details'
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
        const firstName = name.toString().split(" ")[0];
        const lastName = name.toString().split(" ")[1];
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <Text style={styles.infoTitle}>First name: {firstName}</Text>
                    <Text style={styles.infoTitle}>Last name: {lastName}</Text>
                    <Text style={styles.infoTitle}>DoB: </Text>
                    <Text style={styles.infoTitle}>Small Talk:  Birthday is within 10 days</Text>
                </View>
                {/*<View style={{flex: 1}}>*/}
                    {/*<View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>*/}
                        {/*<RkChoice rkType='radio star' style={styles.radio}/>*/}
                        {/*<Text style={styles.statusTitle}>Prepare for Check In</Text>*/}
                    {/*</View>*/}
                    {/**/}
                {/*</View>*/}
                <View style={{flex: 1, marginLeft: 30}}>
                        <RkChoiceGroup rkType='bordered' style={styles.statusButtonStyle}>
                            <TouchableOpacity choiceTrigger>
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                    <RkChoice rkType='posNeg' style={styles.radio}/>
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
                                    <RkChoice rkType='posNeg' style={styles.radio}/>
                                    <Text style={styles.statusTitle}>Check In</Text>
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
