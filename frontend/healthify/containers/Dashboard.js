import {
  StyleSheet,
  View,
  Dimensions,
  LogBox,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
} from "react-native";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/MaterialIcons";
import Autocomplete from "react-native-autocomplete-input";
import React, { useEffect, useState } from "react";
import SearchBar from "./searchBar";
var { height, width } = Dimensions.get("window");

export default function Dashboard() {
  //meds
  const [meds, setMeds] = useState([]);
  // For Filtered Data
  const [filteredFilms, setFilteredFilms] = useState([]);
  // For Selected Data
  const [selectedValue, setSelectedValue] = useState({});
  useEffect(() => {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
  }, []);
  return (
    <View style={styles.container}>
      {/* <Autocomplete
        style={styles.search}
        autoCapitalize="none"
        autoCorrect={false}
        containerStyle={styles.autocompleteContainer}
        // Data to show in suggestion
      /> */}
      {/* <TextInput style={styles.search}></TextInput> */}
      <SearchBar />
      <TouchableOpacity disabled style={styles.recentCard}>
        <Text style={styles.heading}>You have no search history</Text>
        <Text style={styles.subHeading}>
          You can search for medicine prices by clicking on the search button on
          the bottom right corner
        </Text>
        <Image source={require("../assets/wait.png")} style={styles.image} />
      </TouchableOpacity>
      <ActionButton
        buttonColor="#2d3b6c"
        size={0.15 * width}
        renderIcon={() => (
          <Icon name="camera-alt" style={styles.actionButtonIcon} />
        )}
        style={styles.actionButton}
      >
        {/* <ActionButton.Item
          buttonColor="#2d3b6c"
          title="Scan the name of the medicine"
          onPress={() => console.log("Scan")}
        >
          <Icon name="camera-alt" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#2d3b6c"
          title="Type in the name of the medicine"
          onPress={() => console.log("Type")}
        >
          <Icon name="keyboard" style={styles.actionButtonIcon} />
        </ActionButton.Item> */}
      </ActionButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#85b8cb",
    alignItems: "center",
    justifyContent: "center",
  },
  search: {
    height: 40,
    width: width * 0.7,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  text: {
    fontSize: 30,
    color: "#99dfb2",
  },
  heading: {
    fontSize: 0.03 * height,
    fontWeight: "bold",
    marginTop: 0.05 * height,
    color: "#2d3c6c",
  },
  subHeading: {
    fontSize: 0.015 * height,
    color: "#5b7792",
    justifyContent: "center",
    textAlign: "center",
    padding: 0.05 * height,
  },
  actionButtonIcon: {
    fontSize: 0.03 * height,
    height: 22,
    color: "white",
  },
  recentCard: {
    flex: 0.6,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.9,
    borderRadius: 0.05 * width,
  },
  image: {
    flex: 0.8,
    resizeMode: "contain",
    width: width * 0.9,
    height: height,
  },
});
