import { StatusBar } from 'expo-status-bar';
import SignUp from './containers/SignUp';
// import ValidationComponent from 'react-native-form-validator'
import { StyleSheet, Image, View, Dimensions, Text } from "react-native";
const { width, height } = Dimensions.get("window");
import Verify from "./Verify";

const App = () => {
  return (
    <View>
    {/* <View style={styles.SignUp}> */}
      {/* <Text style={styles.text}>This is Healthify!</Text> */}
    {/* <SignUp/> */}
      <StatusBar style="auto" />
    {/* </View> */}
    <Verify email = "examplemail@gmail.com"/>
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
    fontSize: 20,
    color: "#99dfb2",
  },
  logo: {
    width: 0.8 * width,
    height: 0.8 * width,
  },
  text:{
    fontSize: 30,
    color: '#99dfb2',
  },
  SignUp: {
    flex: 1,
    backgroundColor: '#2dcca4',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 60,
    paddingRight: 60 
  }
});

export default App;
