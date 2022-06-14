import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  
} from "react-native";

export default function SearchResults({ navigation }) {
  //get meds from the props
  const meds_array = navigation.getParam("data");

  const cardGap = 16;
  const cardWidth = (Dimensions.get("window").width - cardGap * 3) / 2;

  return (
    // If no data then navigate to NotFoundScreen
    <ScrollView
      style={{
        backgroundColor: "#85b8cb",
        flex: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          backgroundColor: "#85b8cb",
          marginBottom: cardGap,
        }}
      >
        {meds_array.map((med, i) => {
          return (
            <View
              key={med.name}
              style={{
                marginTop: cardGap,
                marginLeft: i % 2 !== 0 ? cardGap : 0,
                width: cardWidth,
                height: 180,
                backgroundColor: "#fcfcfc",
                borderRadius: 16,
                shadowOpacity: 0.2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity>
                <Text style={{ padding: 5, alignSelf: "center" }}>
                  {med.name}
                </Text>
                <Text
                  style={{
                    color: med.source == "NetMeds" ? "blue" : "orange",
                    alignSelf: "center",
                    padding: 5,
                  }}
                >
                  {med.source}
                </Text>
                <Text style={{ alignSelf: "center", fontWeight: "bold" }}>
                  {med.price}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </ScrollView>
    // <Text>Search Results</Text>
  );
}
