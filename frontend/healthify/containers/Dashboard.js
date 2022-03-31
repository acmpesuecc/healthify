import {
  StyleSheet,
  View,
  Dimensions,
  LogBox,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather, Entypo } from "@expo/vector-icons";
import axios from "axios";
import NoSearchHistoryCard from "./noSearchHistory";
var { height, width } = Dimensions.get("window");

export default function Dashboard() {
  //meds
  const [meds, setMeds] = useState([]);
  // For Filtered Data
  const [filteredFilms, setFilteredFilms] = useState([]);
  // For Selected Data
  const [selectedValue, setSelectedValue] = useState(null);
  useEffect(() => {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
  }, []);
  const [text, setText] = useState("");
  // const [search, setSearch] = useState([]);

  const loadMeds = async () => {
    const response = await axios.get(
      `https://www.mims.com/autocomplete?countryCode=IN&query=${text}`
    );
    setMeds(response.data.suggestions.slice(0, 10));
    // console.log(meds[0].value);
  };

  const onChangeHandler = (text) => {
    setText(text);
    loadMeds();
    if (text === "") {
      setMeds(null);

    }
  };

  // const show = () => {
  //   if (meds != null) {
  //     return meds.map((med, i) => (
  //       <View key={i} style={styles.suggestionsContainer}>
  //         <Text key={i} style={styles.suggestions}>
  //           {med.value}
  //         </Text>
  //       </View>
  //     ));
  //   } else return <NoSearchHistoryCard />;
  // };

  return (
    <SafeAreaView style={styles.container}>
      {/* <SearchBar /> */}
      <View style={styles.searchContainer}>
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
      {meds != null && text!=""
        ? meds.map((med, i) => (
            <TouchableOpacity
              key={i}
              style={{
                zIndex: 2,
                backgroundColor: selectedValue == med.value ? "#565656" : "#d9dbde",
                borderBottomColor: "white",
                width: width * 0.7,
                margin: 2,
                borderRadius: 10,
              }}
              onPress={() => {
                setSelectedValue(med.value);
                console.log(med.value);
              }}
            >
              <Text style={
                {
                  flexDirection: "column",
                  padding: 10,
                  textAlign: "center",
                  color: selectedValue == med.value ? "white" : "black",
                }
              }>{med.value}</Text>
            </TouchableOpacity>
          ))
        : null}
      {text == "" && <NoSearchHistoryCard />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#85b8cb",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 30 : 0,
  },
  search: {
    height: 40,
    width: width * 0.7,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  text: {
    fontSize: 30,
    color: "#99dfb2",
  },
  searchContainer: {
    // position: "absolute",
    justifyContent: "flex-start",
    alignItems: "center",
    // flexDirection: "row",
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
    padding: 10,
    textAlign: "center",
  },
  suggestionsContainer: {
    zIndex: 2,
    backgroundColor: "#d9dbde",
    borderBottomColor: "white",
    width: width * 0.7,
    margin: 2,
    borderRadius: 10,
  },
});
