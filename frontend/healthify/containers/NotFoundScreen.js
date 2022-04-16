import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { Button } from "react-native-elements";
var { height, width } = Dimensions.get("window");

export default function NotFoundScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={{ marginTop: -0.1 * height }}>
        <Image
          source={require("../assets/404.png")}
          style={{
            flex: 0.7,
            resizeMode: "contain",
            width: width * 1.1,
            height: height,
            marginTop: 0.25 * height,
          }}
        />
      </View>
      <TouchableOpacity style={styles.bottomCard} disabled>
        <Text
          style={{
            fontSize: 0.05 * height,
            fontWeight: "bold",
            marginTop: 0.05 * height,
            color: "#2d3c6c",
          }}
        >
          404
        </Text>
        <View style={{ alignItems: "center", padding: 10 }}>
          <Text
            style={{
              fontSize: 0.02 * height,
              fontWeight: "100",
              marginTop: 0.05 * height,
              color: "#5b7792",
              textAlign: "center",
            }}
          >
            We couldn't find what you were looking for
          </Text>
        </View>

        <Button
          title="Go Back"
          buttonStyle={styles.button}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#85b8cb",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#2d3c6c",
    borderRadius: 0.2 * width,
    width: 0.7 * width,
    marginTop: height / 20,
    marginBottom: height / 10,
  },
  bottomCard: {
    backgroundColor: "white",
    width: width,
    height: 0.4 * height,
    borderRadius: 0.1 * width,
    alignItems: "center",
    position: "absolute",
    bottom: -0.05 * height,
  },
});
