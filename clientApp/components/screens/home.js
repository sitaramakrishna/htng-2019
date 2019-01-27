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

export default class Home extends React.Component {
    static navigationOptions = {
        title: 'Home'
    };
    
    constructor(props) {
        super(props);
        this.state = {
            isConnected: false
        };
    }
    
    componentDidMount(){
        setTimeout(() => {
            this.setState({isConnected: true});
        }, 3000);
    }
    
    render() {
        const chartBackgroundStyle = { backgroundColor: 'white' };
        return (
            <ScrollView style={styles.screen} contentContainerStyle={{flex: 1, flexDirection: 'column', justifyContent: 'space-evenly'}}>
                <View style={[styles.cardBlock, chartBackgroundStyle]}>
                    <Text style={styles.infoTitle}>GEO</Text>
                    <View style={{marginTop: 25}}>
                        <RkChoiceGroup rkType='bordered' style={styles.statusButtonStyle}>
                            <TouchableOpacity choiceTrigger>
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                    {this.state.isConnected 
                                        ? <RkChoice disabled selected rkType='posNeg' style={styles.radio}/>
                                        : <ActivityIndicator size="small" color="#8f8f8f" />
                                    }
                                    <Text style={this.state.isConnected ? styles.connectedTitle : styles.statusTitle}>{this.state.isConnected ? "Connected Now" : "Tracking Device......"}</Text>
                                </View>
                            </TouchableOpacity>
                        </RkChoiceGroup>
                    </View>
                </View>
    
                <View style={[styles.cardBlock, chartBackgroundStyle]}>
                    <Text style={styles.infoTitle}>BLE</Text>
                    <View style={{marginTop: 25}}>
                        <RkChoiceGroup rkType='bordered' style={styles.statusButtonStyle}>
                            <TouchableOpacity choiceTrigger>
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                    {this.state.isConnected
                                        ? <RkChoice disabled selected rkType='posNeg' style={styles.radio}/>
                                        : <ActivityIndicator size="small" color="#8f8f8f" />
                                    }
                                    <Text style={this.state.isConnected ? styles.connectedTitle : styles.statusTitle}>{this.state.isConnected ? "Connected Now" : "Tracking Device......"}</Text>
                                </View>
                            </TouchableOpacity>
                        </RkChoiceGroup>
                    </View>
                </View>
    
                <View style={[styles.cardBlock, chartBackgroundStyle]}>
                    <Text style={styles.infoTitle}>WIFI</Text>
                    <View style={{marginTop: 25}}>
                        <RkChoiceGroup rkType='bordered' style={styles.statusButtonStyle}>
                            <TouchableOpacity choiceTrigger>
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                    {this.state.isConnected
                                        ? <RkChoice disabled selected rkType='posNeg' style={styles.radio}/>
                                        : <ActivityIndicator size="small" color="#8f8f8f" />
                                    }
                                    <Text style={this.state.isConnected ? styles.connectedTitle : styles.statusTitle}>{this.state.isConnected ? "Connected Now" : "Tracking Device......"}</Text>
                                </View>
                            </TouchableOpacity>
                        </RkChoiceGroup>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#f2f2f2',
        paddingHorizontal: 15,
    },
    cardBlock: {
        padding: 15,
        marginBottom: 15,
        justifyContent: 'center',
        borderColor: 'transparent',
        borderWidth: 1,
        borderRadius: 15,
        marginTop: 15
    },
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
        fontSize: 25,
        paddingTop: 5
    },
    statusTitle: {
        fontFamily: 'Gill Sans',
        fontSize: 20,
        paddingTop: 10,
        marginLeft: 20,
        color: '#999999'
    },
    connectedTitle: {
        fontFamily: 'Gill Sans',
        fontSize: 20,
        paddingTop: 10,
        marginLeft: 20,
        color: '#41abe1',
    },
    radio: {
        marginTop: 5,
    },
    statusButtonStyle: {
        width: Dimensions.get('window').width - 60,
        marginRight: 20,
        marginTop: 3,
        marginBottom: 15,
        borderRadius: 15
    }
});
