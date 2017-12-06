import React, { Component } from "react";
import { AppRegistry, Text, View, DeviceEventEmitter } from "react-native";
import Beacons from "react-native-beacons-manager";

export default class App extends Component {
  componentWillMount() {
    Beacons.requestAlwaysAuthorization();

    // Monitoring
    try {
      const myRegion = {
        identifier: "Test",
        uuid: "01234567-0123-0123-0123-012345678910"
      };

      Beacons.startMonitoringForRegion(myRegion);
      Beacons.startUpdatingLocation();

      console.log("YAY Beacons monitoring started successfully");
    } catch (err) {
      console.log("Beacons monitoring not started, error: ${err}");
    }
  }

  componentDidMount() {
    // monitoring:

    this.regionDidEnterEvent = DeviceEventEmitter.addListener(
      "regionDidEnter",
      ({ identifier, uuid }) => {
        console.log("monitoring - regionDidEnter data: ", { identifier, uuid });
      }
    );

    this.regionDidExitEvent = DeviceEventEmitter.addListener(
      "regionDidExit",
      ({ identifier, uuid }) => {
        console.log("monitoring - regionDidExit data: ", { identifier, uuid });
      }
    );
  }

  componentWillUnmount() {
    Beacons.stopMonitoringForRegion(myRegion);
    Beacons.stopUpdatingLocation();
    this.regionDidEnterEvent.remove();
    this.regionDidExitEvent.remove();
  }

  render() {
    return (
      <View>
        <Text>Test</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent("App", () => App);
