import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Keyboard,
  Button,
  Dimensions,
} from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
var { height, width } = Dimensions.get("window");

const SearchBar = () => {
  const [text, setText] = useState("");
  const [meds, setMeds] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const onChangeHandler = (text) => {
    setText(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        {/* search Icon */}
        <Feather
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 1 }}
        />
        {/* Input field */}
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={text}
          onChangeText={(text) => onChangeHandler(text)}
        />
      </View>
    </View>
  );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: width * 0.8,
  },
  searchBar: {
    padding: 10,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
  },

  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },
});
