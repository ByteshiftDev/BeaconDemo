import React, { Component } from "react";
import { AppRegistry, Text, View, DeviceEventEmitter } from "react-native";
import Beacons from "react-native-beacons-manager";

export default class App extends Component {
  componentWillMount() {
    Beacons.requestWhenInUseAuthorization();
    Beacons.requestAlwaysAuthorization();

    // Monitoring
    try {
      const myRegion = {
        identifier: "Test",
        uuid: "01234567-0123-0123-0123-012345678910"
      };

      Beacons.startRangingBeaconsinRegion(myRegion);
      Beacons.startUpdatingLocation();

      console.log("YAY Beacons monitoring started successfully");
    } catch (err) {
      console.log("Beacons monitoring not started, error: ${err}");
    }
  }

  componentDidMount() {
    // monitoring:

    this.beaconsDidRangeEvent = DeviceEventEmitter.addListener(
      "beaconsDidRange",
      ({ uuid }) => {
        console.log("ranging - regionDidEnter data: ", { uuid });
      }
    );
  }

  componentWillUnmount() {
    Beacons.stopRangingBeaconsInRegion(myRegion);
    Beacons.stopUpdatingLocation();
    this.beaconsDidRangeEvent.remove();
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
