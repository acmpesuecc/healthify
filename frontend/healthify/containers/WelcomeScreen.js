
import { StyleSheet, Image, View, Dimensions, TouchableOpacity , Text} from "react-native";
import { Button, Card } from "react-native-elements";
var { height, width } = Dimensions.get("window");

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>

      <Text style={styles.text}>
        Welcome to Healthify
      </Text>
      <Image
        source={require("./assets/hi.gif")}
        style={{
          resizeMode: "contain",
          width: 1.2*width,
          height: 0.8*height,
          marginTop:0.3*height,
        }}
      />
          <Button
          title="Get Started"
          buttonStyle={styles.button}
          onPress={() => {
            console.log("Pressed");
          }}
        />
      {/* <Text style={{fontSize: 0.03*height,fontWeight:"bold",color:"#1d2366",}}>
        Compare Medicine Prices 
      </Text> */}


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d3f4fb",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    position:"absolute", 
    top:0.1*height,
    fontSize: 30,
    color: "#2d3b6c",
    fontFamily: "sans-serif",
    fontWeight: "100",
  },
  button: {
    backgroundColor: "#2d3b6c",
    borderRadius: 0.2 * width,
    width: 0.7 * width,
    marginBottom: 0.3*height,
    // position:"absolute",
    // alignItems: "center",
    // justifyContent: "center",
  },
  bottomCard:{
    backgroundColor: "white",
    width : width,
    height: 0.4*height,
    borderRadius: 0.1 * width,
    alignItems: "center",
    position: "absolute",
    bottom: -0.5 * height,

  }
});
