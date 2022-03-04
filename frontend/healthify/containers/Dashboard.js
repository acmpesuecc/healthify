import { StyleSheet, View, Dimensions, LogBox } from "react-native";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/MaterialIcons";
import React, { useEffect } from "react";
var { height, width } = Dimensions.get("window");

export default function Dashboard() {
  useEffect(() => {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
  }, []);
  return (
    <View style={styles.container}>
      <ActionButton
        buttonColor={(active) => (active ? "#99dfb2" : "#99dfb2")}
        size={0.15 * width}
        renderIcon={(active) =>
          active ? (
            <Icon name="add" style={styles.actionButtonIcon} />
          ) : (
            <Icon name="search" style={styles.actionButtonIcon} />
          )
        }
      >
        <ActionButton.Item
          buttonColor="#99dfb2"
          title="Scan the name of the medicine"
          onPress={() => console.log("Scan")}
        >
          <Icon name="camera-alt" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#99dfb2"
          title="Type in the name of the medicine"
          onPress={() => console.log("Type")}
        >
          <Icon name="keyboard" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    color: "#99dfb2",
  },
  actionButtonIcon: {
    fontSize: 0.03 * height,
    height: 22,
    color: "white",
  },
});
