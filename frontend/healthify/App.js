<<<<<<< HEAD
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignUp from './containers/SignUp';
// import ValidationComponent from 'react-native-form-validator'
=======
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Image, View, Dimensions, Text } from "react-native";
const { width, height } = Dimensions.get("window");
import Verify from "./Verify";
>>>>>>> ab606debf190555ec657f577e1ad1172ec4d1410

const App = () => {
  return (
<<<<<<< HEAD
    <View style={styles.SignUp}>
      {/* <Text style={styles.text}>This is Healthify!</Text> */}
    <SignUp/>
      <StatusBar style="auto" />
    </View>
=======
    <Verify email = "examplemail@gmail.com"/>
>>>>>>> ab606debf190555ec657f577e1ad1172ec4d1410
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
<<<<<<< HEAD
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

=======
});
export default App;
>>>>>>> ab606debf190555ec657f577e1ad1172ec4d1410
