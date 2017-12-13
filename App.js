import React, { Component } from "react";
import {
  AppRegistry,
  View,
  Text,
  ListView,
  DeviceEventEmitter
} from "react-native";
import Beacons from "react-native-beacons-manager";

/**
 * @type {String} uuid
 */
const UUID = "01234567-0123-0123-0123-012345678910";

const IDENTIFIER = "123456";

export default class BeaconsDemo extends Component {
  // will be set as a reference to "beaconsDidRange" event:
  beaconsDidRangeEvent = null;

  state = {
    // region information
    uuid: UUID,
    identifier: IDENTIFIER
  };

  componentWillMount() {
    const { identifier, uuid } = this.state;

    Beacons.requestAlwaysAuthorization();

    const region = { identifier, uuid };

    // Range for beacons inside the region
    Beacons.startRangingBeaconsInRegion(region)
      .then(() => console.log("Beacons ranging started succesfully"))
      .catch(error =>
        console.log(`Beacons ranging not started, error: ${error}`)
      );

    // update location to ba able to monitor:
    Beacons.startUpdatingLocation();
  }

  componentDidMount() {
    //
    // component state aware here - attach events
    //

    // Ranging: Listen for beacon changes
    this.beaconsDidRangeEvent = DeviceEventEmitter.addListener(
      "beaconsDidRange",
      data => {
        console.log("beaconsDidRange data: ", data);
      }
    );
  }

  componentWillUnMount() {
    const { identifier, uuid } = this.state;

    const region = { identifier, uuid };

    // stop ranging beacons:
    Beacons.stopRangingBeaconsInRegion(region)
      .then(() => console.log("Beacons ranging stopped succesfully"))
      .catch(error =>
        console.log(`Beacons ranging not stopped, error: ${error}`)
      );

    // remove ranging event we registered at componentDidMount
    this.beaconsDidRangeEvent.remove();
  }

  render() {
    return (
      <View>
        <Text>ranging beacons</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent("BeaconsDemo", () => BeaconsDemo);
