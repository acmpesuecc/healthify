import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Dashboard from "./containers/Dashboard";
import SignUp from "./containers/SignUp";
// import ValidationComponent from 'react-native-form-validator'

const App = () => {
  return (
    <View style={styles.SignUp}>
      {/* <Text style={styles.text}>This is Healthify!</Text> */}
      {/* <SignUp /> */}
      <Dashboard />
      <StatusBar style="auto" />
    </View>
  );
};

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
    width: 0.8,
    height: 0.8,
  },
  text: {
    fontSize: 30,
    color: "#99dfb2",
  },
  SignUp: {
    flex: 1,
    backgroundColor: "#2dcca4",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 60,
    paddingRight: 60,
  },
});

export default App;
