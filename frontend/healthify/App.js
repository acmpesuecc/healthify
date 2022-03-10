import { StatusBar } from "expo-status-bar";
import { StyleSheet, Image, View, Dimensions, Text } from "react-native";
const { width, height } = Dimensions.get("window");
import Verify from "./Verify";

const App = () => {
  return (
    <Verify email = "examplemail@gmail.com"/>
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
    fontSize: 20,
    color: "#99dfb2",
  },
  logo: {
    width: 0.8 * width,
    height: 0.8 * width,
  },
});
export default App;
