import React, { Component } from 'react'
import { AppRegistry, Text, View, DeviceEventEmitter } from 'react-native';
import Beacons from 'react-native-beacons-manager';


class App extends Component {
  render() {
    return (
      <View>
        <Text>Test</Text>
      </View>
    );
  }
}

componentWillMount() {
  Beacons.requestWhenInUseAuthorization();
  Beacons.detectIBeacons();

  // Monitoring
  try {
    const myRegion = {
    identifier: 'Test',
    uuid: '01234567-0123-0123-0123-012345678910',
  };  

  Beacons.startMonitoringForRegion(myRegion);

  console.log('Beacons monitoring started successfully');
  } catch (err) {
  console.log('Beacons monitoring not started, error: ${err}');
  }
}

componentDidMount() {
  // monitoring:
  DeviceEventEmitter.addListener(
    'regionDidEnter',
    ({ identifier, uuid }) => {
      console.log('monitoring - regionDidEnter data: ', { identifier, uuid });
    }
  );

  DeviceEventEmitter.addListener(
    'regionDidExit',
    ({ identifier, uuid }) => {
      console.log('monitoring - regionDidExit data: ', { identifier, uuid });
    }
  );
  
}

AppRegistry.registerComponent(
  'App',
  () => App
);