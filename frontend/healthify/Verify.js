import { StatusBar } from "expo-status-bar";
import { StyleSheet, Image, View, Dimensions, Text, TouchableOpacity } from "react-native";
const { width, height } = Dimensions.get("window");

const Verify = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Verify your email</Text>
      <Text style={styles.text}>A Verification email has been sent to </Text>
      <Text style={styles.email}>{props.email}</Text>
      <Image source={require("./assets/email.gif")} style={styles.logo} />
      {/* <StatusBar style="auto" /> */}
      <TouchableOpacity style={styles.continue} onPress={()=>console.log("Now go to Login")}>
        <Text style={{fontSize:16,color:"white"}}>Continue</Text>
      </TouchableOpacity>
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
    fontSize: 18,
    color: "#bfc0c2",
  },
  heading: {
    fontSize: 0.03 * height,
    fontWeight: "bold",
    color: "#2d3c6c",
    marginBottom: 0.05 * height,
  },
  continue:{
    backgroundColor: "#2d3c6c",
    width: 0.8 * width,
    height: 0.05 * height,
    borderRadius: 0.05 * height,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0.1 * height,
  },
  email: {
    fontSize: 16,
    color: "#bfc0c2",
  },
  logo: {
    width: 0.8 * width,
    height: 0.4 * height,

  },
});

export default Verify;