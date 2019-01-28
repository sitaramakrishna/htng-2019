
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    NativeAppEventEmitter,
    NativeEventEmitter,
    NativeModules,
    Platform,
    PermissionsAndroid,
    ListView,
    ScrollView,
    AppState,
    Dimensions,
} from 'react-native';
import {
    Alert,
    Image,
    NetInfo,
    Button,
    ActivityIndicator,
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
import BleManager from 'react-native-ble-manager';
import Permissions from 'react-native-permissions';
import geolib from 'geolib';
import { StackNavigator } from 'react-navigation';



const window = Dimensions.get('window');
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
//const IOSWifiManager = NativeModules.IOSWifiManager;

//const wifiSettingsURL = IOSWifiManager.settingsURL;


export default class App extends Component {
    static navigationOptions = {
        title: 'Home'
    };

    constructor(){
        super();

        this.state = {
            scanning:false,
            peripherals: new Map(),
            appState: '',
            locationPermission: null,
            latitude: 0,
            longitude: 0,
            error: null,
            isConnected: false
        };

        this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
        this.handleStopScan = this.handleStopScan.bind(this);
        this.handleUpdateValueForCharacteristic = this.handleUpdateValueForCharacteristic.bind(this);
        this.handleDisconnectedPeripheral = this.handleDisconnectedPeripheral.bind(this);
        this.handleAppStateChange = this.handleAppStateChange.bind(this);
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({isConnected: true});
        }, 3000);

        AppState.addEventListener('change', this.handleAppStateChange);

        BleManager.start({showAlert: false});

        Permissions.check('location', { type: 'always' }).then(locationResponse => {
            if (locationResponse === 'undetermined') {
                Permissions.request('location', {type: 'always'}).then(response => {
                    this.setState({locationPermission: response})
                });
            }
        });

        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
        );

        //IOSWifiManager.currentSSID()
        //IOSWifiManager.connectToSSID(ssid)
        //IOSWifiManager.disconnectFromSSID(ssid)
        //IOSWifiManager.connectToProtectedSSID(ssid, password, isWep);

        this.handlerDiscover = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral );
        this.handlerStop = bleManagerEmitter.addListener('BleManagerStopScan', this.handleStopScan );
        this.handlerDisconnect = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', this.handleDisconnectedPeripheral );
        this.handlerConnect = bleManagerEmitter.addListener('BleManagerConnectPeripheral', this.handleConnectedPeripheral );
        this.handlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', this.handleUpdateValueForCharacteristic );



        if (Platform.OS === 'android' && Platform.Version >= 23) {
            PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                if (result) {
                    console.log("Permission is OK");
                } else {
                    PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                        if (result) {
                            console.log("User accept");
                        } else {
                            console.log("User refuse");
                        }
                    });
                }
            });
        }

        /*IOSWifiManager.currentSSID().then(function(name){
            console.log("***** IM HERE2 " + name);
        }).catch(function(error){
            console.log("****** IM HERE3 " + error);
        });*/

    }

    handleAppStateChange(nextAppState) {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            console.log('App has come to the foreground!');
            BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
                console.log('Connected peripherals: ' + peripheralsArray.length);
            });
        }
        this.setState({appState: nextAppState});
    }

    componentWillUnmount() {
        this.handlerDiscover.remove();
        this.handlerStop.remove();
        this.handlerDisconnect.remove();
        this.handlerConnect.remove();
        this.handlerUpdate.remove();
    }

    handleDisconnectedPeripheral(data) {
        let peripherals = this.state.peripherals;
        let peripheral = peripherals.get(data.peripheral);
        if (peripheral) {
            peripheral.connected = false;
            peripherals.set(peripheral.id, peripheral);
            this.setState({peripherals});
        }
        console.log('Disconnected from ' + data.peripheral);
    }

    handleConnectedPeripheral(data) {
        let peripherals = this.state.peripherals;
        let peripheral = peripherals.get(data.peripheral);
        if (peripheral) {
            peripheral.connected = true;
            peripherals.set(peripheral.id, peripheral);
            this.setState({peripherals});
        }
        console.log('Disconnected from ' + data.peripheral);
    }
    handleUpdateValueForCharacteristic(data) {
        console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
    }

    handleStopScan() {
        console.log('Scan is stopped');
        this.setState({ scanning: false });
    }

    startScan() {
        if (!this.state.scanning) {
            this.setState({peripherals: new Map()});
            BleManager.scan([], 3, true).then((results) => {
                console.log('Scanning...: ' + JSON.stringify(results));
                this.setState({scanning:true});
            });
        }
    }

    retrieveConnected(){
        BleManager.getConnectedPeripherals([]).then((results) => {
            if (results.length == 0) {
                console.log('No connected peripherals')
            }
            console.log(results);
            var peripherals = this.state.peripherals;
            for (var i = 0; i < results.length; i++) {
                var peripheral = results[i];
                peripheral.connected = true;
                peripherals.set(peripheral.id, peripheral);
                this.setState({ peripherals });
            }
        });
    }

    handleDiscoverPeripheral(peripheral){
        var peripherals = this.state.peripherals;
        if (!peripherals.has(peripheral.id)){
            console.log('Got ble peripheral', peripheral);
            peripherals.set(peripheral.id, peripheral);
            this.setState({ peripherals })
        }
    }

    test(peripheral) {
        if (peripheral){
            if (peripheral.connected){
                BleManager.disconnect(peripheral.id);
            }else{
                BleManager.connect(peripheral.id).then(() => {
                    let peripherals = this.state.peripherals;
                    let p = peripherals.get(peripheral.id);
                    if (p) {
                        p.connected = true;
                        peripherals.set(peripheral.id, p);
                        this.setState({peripherals});
                    }
                    console.log('Connected to ' + peripheral.id);


                    setTimeout(() => {

                        /* Test read current RSSI value
                        BleManager.retrieveServices(peripheral.id).then((peripheralData) => {
                          console.log('Retrieved peripheral services', peripheralData);
                          BleManager.readRSSI(peripheral.id).then((rssi) => {
                            console.log('Retrieved actual RSSI value', rssi);
                          });
                        });*/

                        // Test using bleno's pizza example
                        // https://github.com/sandeepmistry/bleno/tree/master/examples/pizza
                        BleManager.retrieveServices(peripheral.id).then((peripheralInfo) => {
                            console.log(peripheralInfo);
                            var service = '13333333-3333-3333-3333-333333333337';
                            var bakeCharacteristic = '13333333-3333-3333-3333-333333330003';
                            var crustCharacteristic = '13333333-3333-3333-3333-333333330001';

                            setTimeout(() => {
                                BleManager.startNotification(peripheral.id, service, bakeCharacteristic).then(() => {
                                    console.log('Started notification on ' + peripheral.id);
                                    setTimeout(() => {
                                        BleManager.write(peripheral.id, service, crustCharacteristic, [0]).then(() => {
                                            console.log('Writed NORMAL crust');
                                            BleManager.write(peripheral.id, service, bakeCharacteristic, [1,95]).then(() => {
                                                console.log('Writed 351 temperature, the pizza should be BAKED');
                                                /*
                                                var PizzaBakeResult = {
                                                  HALF_BAKED: 0,
                                                  BAKED:      1,
                                                  CRISPY:     2,
                                                  BURNT:      3,
                                                  ON_FIRE:    4
                                                };*/
                                            });
                                        });

                                    }, 500);
                                }).catch((error) => {
                                    console.log('Notification error', error);
                                });
                            }, 200);
                        });

                    }, 900);
                }).catch((error) => {
                    console.log('Connection error', error);
                });
            }
        }
    }

    render() {
        const list = Array.from(this.state.peripherals.values());

        const preferredDeviceList = list.filter(v => (v.name === 'C02VQ21LHTDD' || v.name === 'C02VQ1Y8HTDD' ))

        const dataSource = ds.cloneWithRows(preferredDeviceList);


        const chartBackgroundStyle = { backgroundColor: 'white' };

        const distance = this.state.latitude === 0 ? 0 : geolib.getDistance(
            {latitude: this.state.latitude, longitude: this.state.longitude},
            {latitude: 37.3837378, longitude: -122.01278769999998});

        const contents = preferredDeviceList.map(function (item) {
            if (item.name) {
                return (
                    <View style={{marginTop: 15}} key={item.id}>
                        <RkChoiceGroup rkType='bordered' style={styles.statusButtonStyle}>
                            <TouchableOpacity choiceTrigger>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <RkChoice disabled selected rkType='posNeg' style={styles.radio}/>
                                    <Text style={styles.connectedTitle}>BLE device with name:{item.name} & id:{item.id}</Text>
                                </View>
                            </TouchableOpacity>
                        </RkChoiceGroup>
                    </View>
                );
            } else {
                return (
                    <View style={{marginTop: 15}}>
                        <RkChoiceGroup rkType='bordered' style={styles.statusButtonStyle}>
                            <TouchableOpacity choiceTrigger>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <RkChoice disabled selected rkType='posNeg' style={styles.radio}/>
                                    <Text style={styles.connectedTitle}>BLE device with id: {item.id}</Text>
                                </View>
                            </TouchableOpacity>
                        </RkChoiceGroup>
                    </View>
                );
            }
        });
        if (contents.length === 0) {
            contents.push(<View style={{marginTop: 15}}>
                <TouchableOpacity choiceTrigger>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <RkChoice disabled rkType='posNeg' style={styles.radio}/>
                        <Text style={styles.connectedTitle}>No BLEs found</Text>
                    </View>
                </TouchableOpacity>
            </View>);
        }
        return (

            <ScrollView style={styles.screen} contentContainerStyle={{flex: 1, flexDirection: 'column', justifyContent: 'space-evenly'}}>
                <View style={[styles.cardBlock, chartBackgroundStyle]}>
                    <Text style={styles.infoTitle}>Location proximity</Text>
                    <View style={{marginTop: 15}}>
                        <RkChoiceGroup rkType='bordered' style={styles.statusButtonStyle}>
                            <TouchableOpacity choiceTrigger>
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                    {this.state.latitude !== 0
                                        ? <RkChoice disabled selected rkType='posNeg' style={styles.radio}/>
                                        : <ActivityIndicator size="small" color="#8f8f8f" />
                                    }
                                    <Text style={this.state.latitude !== 0 ? styles.connectedTitle : styles.statusTitle}>{this.state.latitude === 0 ? "Trying to compute proximity.." : "Customer is in nearby vicinity."}</Text>
                                </View>
                            </TouchableOpacity>
                        </RkChoiceGroup>
                    </View>
                    {this.state.latitude !== 0 ? <View style={{marginTop: 25}}>
                        <RkChoiceGroup rkType='bordered' style={styles.statusButtonStyle}>
                            <TouchableOpacity choiceTrigger>
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                    <RkChoice disabled selected rkType='posNeg' style={styles.radio}/>
                                    <Text style={styles.connectedTitle}>Customer is in vicinity of {distance.toString()} mts.</Text>
                                </View>
                            </TouchableOpacity>
                        </RkChoiceGroup>
                    </View> : <View/>}
                </View>
                <View style={[styles.cardBlock, chartBackgroundStyle]}>
                    <TouchableHighlight onPress={() => this.startScan() }>
                        <Text style={styles.infoTitle}>{list.length > 0 ? '': 'Find'} Nearby BLEs</Text>
                    </TouchableHighlight>
                    {contents}
                </View>
                <View style={[styles.cardBlock, chartBackgroundStyle]}>
                    <TouchableHighlight onPress={() => this.startScan() }>
                        <Text style={styles.infoTitle}>{this.state.isConnected ? 'Found WifiSpot: PnP-Events': 'Finding nearby WiFiSpots'}</Text>
                    </TouchableHighlight>
                    {this.state.isConnected ? <View style={{marginTop: 15}}>
                        <RkChoiceGroup rkType='bordered' style={styles.statusButtonStyle}>
                            <TouchableOpacity choiceTrigger>
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                    {this.state.isConnected  !== 0
                                        ? <RkChoice disabled selected rkType='posNeg' style={styles.radio}/>
                                        : <ActivityIndicator size="small" color="#8f8f8f" />
                                    }
                                    <Text style={styles.connectedTitle}>{"Connected to WifiSpot: PnP-Events securely"}</Text>
                                </View>
                            </TouchableOpacity>
                        </RkChoiceGroup>
                    </View>: <View/>}
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#f2f2f2',
        paddingHorizontal: 15,
    },
    cardBlock: {
        padding: 15,
        marginBottom: 0,
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
        fontSize: 15,
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
    },
    containernew: {
        flex: 1,
        backgroundColor: '#FFF',
        width: window.width,
        height: window.height
    },
    scroll: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        margin: 10,
    },
    row: {
        margin: 10
    },
});
