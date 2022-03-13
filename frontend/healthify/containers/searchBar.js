import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
  Button,
  Dimensions,
} from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import axios from "axios";
var { height, width } = Dimensions.get("window");

const SearchBar = () => {
  const [text, setText] = useState("");
  const [meds, setMeds] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const loadMeds = async () => {
      const response = await axios.get(
        `https://www.mims.com/autocomplete?countryCode=IN&query=${text}`
      );
      setMeds(response.data.suggestions.slice(0, 5));
      // console.log(meds[0].value);
    };
    loadMeds();
  });

  const onChangeHandler = (text) => {
    setText(text);
  };

  return (
    <View>
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
          {/* {meds && meds.map((med, i) => <View key={i}>{med.value}</View>)} */}
        </View>
      </View>
      {meds != null
        ? meds.map((med, i) => (
            <Text key={i} style={styles.suggestions}>
              {med.value}
            </Text>
          ))
        : null}
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
  suggestions: {
    flexDirection: "column",
    padding: 5,
  },
});
