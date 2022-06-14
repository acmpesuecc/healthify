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
import CameraTrial from "./CameraTrial";

var { height, width } = Dimensions.get("window");
import React, { useState } from "react";

export default function NoSearchHistoryCard() {
  const [camOpen, setCamOpen] = useState(false);
  return (
    <>
      <View style={styles.container}>
      <TouchableOpacity disabled style={styles.recentCard}>
        <Text style={styles.heading}>You have no search history</Text>
        <Text style={styles.subHeading}>
          You can search for medicine prices by clicking on the search button on
          the bottom right corner
        </Text>
        <Image source={require("../assets/wait.png")} style={styles.image} />
      </TouchableOpacity>

    </View>

      <ActionButton
        buttonColor="#2d3b6c"
        size={0.15 * width}
        renderIcon={() => (
          <Icon name="camera-alt" style={styles.actionButtonIcon} />
        )}
        onPress={() => {
          setCamOpen(!camOpen);
        }}
        style={styles.actionButton}
      ></ActionButton>
      {camOpen && <CameraTrial />}
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    color: "#99dfb2",
  },
  container: {
    flex: 1,
    backgroundColor: "#85b8cb",
    alignItems: "center",
    justifyContent: "center",
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
