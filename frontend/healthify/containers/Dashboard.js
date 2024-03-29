import {
  StyleSheet,
  View,
  Dimensions,
  LogBox,
  Image,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import NoSearchHistoryCard from "./noSearchHistory";

import FloatingButton from "./FloatingButton";


var { height, width } = Dimensions.get("window");
let meds_array = [];

export default function Dashboard({ navigation }) {
  const [loading, setLoading] = useState(false);
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
  async function searchMed(medicine, navigation) {
    const res = await axios.get(
      `http://192.168.0.116:3001/getMeds?medicine=${medicine}`
    );
    meds_array = res.data;
    setLoading(false);
    console.log(meds_array);
    // console.log(navigation);
    if (meds_array.length > 0) {
      navigation.navigate("SearchResults", { data: meds_array });
    } else {
      navigation.navigate("NotFoundScreen");
    }
  }

  const loadMeds = async () => {
    const response = await axios.get(
      `https://www.mims.com/autocomplete?countryCode=IN&query=${text}`
    );
    //filter the data to not show a tag with href
    const data = response.data.suggestions.filter((item) => {
      return item.value.indexOf("href") == -1;
    });
    setMeds(data.slice(0, 10));
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
      {loading && (
        <View style={styles.spin_container}>
          <Text style={{ color: "white" }}>
            Please wait while we get the best prices from popular sources..
          </Text>
          <ActivityIndicator size="large" color="white" />
        </View>
      )}
      {/* <SearchBar /> */}
      <>
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            {/* search Icon */}
            <TouchableOpacity
              onPress={() => {
                setSelectedValue(text);
                console.log(text);
                setLoading(true);
                searchMed(text, navigation);
              }}
            >
              <Feather
                name="search"
                size={20}
                color="black"
                style={{ marginLeft: 1 }}
              />
            </TouchableOpacity>
            {/* Input field */}
            <TextInput
              style={styles.input}
              placeholder="Search"
              value={text}
              onChangeText={(text) => onChangeHandler(text)}
            />
          </View>
        </View>
      </>
      {meds != null && text != ""
        ? meds.map((med, i) => (
            <TouchableOpacity
              key={i}
              style={{
                zIndex: 2,
                backgroundColor:
                  selectedValue == med.value ? "#565656" : "#d9dbde",
                borderBottomColor: "white",
                width: width * 0.7,
                margin: 2,
                borderRadius: 10,
              }}
              onPress={() => {
                setSelectedValue(med.value);
                console.log(med.value);
                setLoading(true);

                searchMed(med.value, navigation);
              }}
            >
              <Text
                style={{
                  flexDirection: "column",
                  padding: 10,
                  textAlign: "center",
                  color: selectedValue == med.value ? "white" : "black",
                }}
              >
                {med.value}
              </Text>
            </TouchableOpacity>
          ))
        : null}
      {text == "" && <NoSearchHistoryCard />}
                {/* <FloatingButton/> */}
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
  spin_container: {
    padding: 30,
  },
});
