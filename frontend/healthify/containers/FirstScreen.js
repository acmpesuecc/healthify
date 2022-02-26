import { StatusBar } from "expo-status-bar";
import { StyleSheet, Image, View, Dimensions, TouchableOpacity , Text} from "react-native";
import { Button, Card } from "react-native-elements";
var { height, width } = Dimensions.get("window");

export default function FirstScreen() {
  return (
    <View style={styles.container}>
      {/* <Text style ={styles.text}>
        Healthify
      </Text> */}
      <View style= {{marginBottom:0.2*height}}>
      <Image
        source={require("./assets/new_screen.png")}
        style={{
          resizeMode: "contain",
          width: width*1.1,
          height: height,
          
        }}
      />
      </View>
      <TouchableOpacity style={styles.bottomCard} disabled>
      <Text style={{fontSize: 0.03*height,fontWeight:"bold",marginTop:0.05*height, color:"#1d2366",}}>
        Compare Medicine Prices 
      </Text>
      <View style = {{alignItems:"center", padding:10}}>
      <Text style={{fontSize: 0.02*height,fontWeight:"100",marginTop:0.05*height, color:"#aeaeae", textAlign:"center"}}>
        Select a medicine and get the best price available using our app!
      </Text>
      </View>

        <Button
          title="Get Started"
          buttonStyle={styles.button}
          onPress={() => {
            console.log("Pressed");
          }}
        />
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
  // text: {
  //   fontSize: 30,
  //   color: "#00B0FF",
  //   fontFamily: "sans-serif",
  //   fontWeight: "100",
  // },
  button: {
    backgroundColor: "#00cec8",
    borderRadius: 0.2 * width,
    width: 0.7 * width,
    marginTop: height /20,
    marginBottom: height / 10,
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
    bottom: -0.05 * height,

  }
});
