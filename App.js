/* eslint-disable */

import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  ListView,
  DeviceEventEmitter
} from "react-native";
import Beacons from "react-native-beacons-manager";

/**
 * uuid of YOUR BEACON (change to yours)
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
    Beacons.startRangingBeaconsInRegion(region) // or like  < v1.0.7: .startRangingBeaconsInRegion(identifier, uuid)
      .then(() => console.log("Beacons ranging started succesfully"))
      .catch(error =>
        console.log(`Beacons ranging not started, error: ${error}`)
      );
    // Range for beacons inside the other region

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
      <View style={styles.container}>
        <Text style={styles.headline}>ranging beacons:</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    margin: 5,
    backgroundColor: "#F5FCFF"
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  btleConnectionStatus: {
    fontSize: 20,
    paddingTop: 20
  },
  headline: {
    fontSize: 20,
    paddingTop: 20,
    marginBottom: 20
  },
  row: {
    padding: 8,
    paddingBottom: 16
  },
  smallText: {
    fontSize: 11
  },
  rowSection: {
    fontWeight: "700"
  }
});

AppRegistry.registerComponent("BeaconsDemo", () => BeaconsDemo);
