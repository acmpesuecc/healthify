import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
var { height, width } = Dimensions.get("window");


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("./assets/login.png")} />
      {/* <StatusBar style="auto" /> */}
      <Text style={{fontSize:25, position:'absolute', fontWeight:"bold"}}>
        Login Now
      </Text>
      <Text style = {{fontSize:16 ,marginBottom:0.3*height, color:"#cfcfcf"}}>
        Please enter your details to continue.
      </Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.email}
          placeholder="Email."
          placeholderTextColor="black"
          onChangeText={(email) => setEmail(email)}
        />
        <TextInput
          style={styles.password}
          placeholder="Password."
          placeholderTextColor="black"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: width * 0.3,
          height: height * 0.08,
          marginBottom: 0.3 * height,
          marginTop:-0.3*height,
          marginLeft:0.5*width,
          // backgroundColor: "#2d3b6c",
        }}
      >
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn} onPress={()=>{
        console.log(email)
        console.log(password)
      }}>
        <Text style={styles.loginText}>LOGIN</Text>
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

  image: {
    width: "120%",
    resizeMode: "contain",
    position: "relative",
    top : 0.175*height,
  },

  email: {
    backgroundColor: "#f2f2f2",
    borderRadius: 0.02 * width,
    width: 0.8 * width,
    height: 0.06 * height,
    marginBottom: 0.25 * height,
    textAlign: "left",
    paddingLeft: 0.05 * width,
    justifyContent: "center",
    alignItems: "center",
  },
  password: {
    backgroundColor: "#f2f2f2",
    borderRadius: 0.02 * width,
    width:0.8*width,
    height: 0.06 * height,
    // marginBottom:  * height,
    marginTop: -0.225 * height,
    textAlign: "left",
    paddingLeft:0.05*width,
    justifyContent: "center",
    alignItems: "center",
  },
  inputView: {
    backgroundColor: "transparent",
    width: "110%",
    height: 0.2 * height,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 0.25 * height,
    marginTop: -0.3 * height,
  },

  forgot_button: {
    alignSelf: "flex-end",
    color:"#0080ff",
  },

  loginBtn: {
    width: "80%",
    borderRadius: 0.02*width,
    height: 0.06 * height,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 0.4*height,
    marginTop: -0.3*height,
    backgroundColor: "#00B0FF",
  },
  loginText: {
    color: "white",
  }
});
