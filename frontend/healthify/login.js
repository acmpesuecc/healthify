import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    setErrorMessage("");
  }, [email, password]);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("./assets/login.png")} />

      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
      <View style={{ marginBottom: 20 }}>
        <Text>
          {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={async () => {
          await axios
            .post(
              "http://192.168.1.18:3001/login",
              { email: email, password: password },
              {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json;charset=UTF-8",
                },
              }
            )
            .then((response) => {
              console.log(response.status);
              console.log(response.data.token);
            })
            .catch((error) => {
              setErrorMessage(error.response.data);
              console.log(errorMessage);
            });
        }}
      >
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    marginBottom: 40,
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },

  inputView: {
    backgroundColor: "#f2f2f2",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },

  TextInput: {
    flex: 1,
    textAlign: "left",
  },

  forgot_button: {
    marginBottom: 70,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    backgroundColor: "#00B0FF",
  },
  error: {
    color: "red",
    fontSize: 16,
  },
});
