import { StatusBar } from "expo-status-bar";
import { StyleSheet, Image, View, Dimensions,Text} from "react-native";
import { Button } from "react-native-elements";
var { height, width } = Dimensions.get("window");

export default function FirstScreen() {
  return (
    <View style={styles.container}>
      {/* <Text style ={styles.text}>
        Healthify
      </Text> */}
      <Image
        source={require("./assets/first_screen.png")}
        style={{flex:0.6,resizeMode: "contain", width: width, height: height, marginTop: height/6}}
      />
      <Button title="Continue" buttonStyle={styles.button} onPress={()=>{console.log("Pressed")}}>
      </Button>
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
  // text: {
  //   fontSize: 30,
  //   color: "#00B0FF",
  //   fontFamily: "sans-serif",
  //   fontWeight: "100",
  // },
  button: {
    backgroundColor: "#00B0FF",
    borderRadius: 0.2 * width,
    width: 0.7 * width,
    marginTop: height/5,
    alignItems: "center",
    justifyContent: "center",
  },
});
