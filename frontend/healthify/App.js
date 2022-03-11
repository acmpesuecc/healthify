import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignUp from './containers/SignUp';
// import ValidationComponent from 'react-native-form-validator'

export default function App() {
  return (
    <View style={styles.SignUp}>
      {/* <Text style={styles.text}>This is Healthify!</Text> */}
    <SignUp/>
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
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

