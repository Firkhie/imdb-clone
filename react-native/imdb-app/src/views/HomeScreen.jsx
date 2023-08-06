import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import Header from "../components/Header";
import MovieCard from "../components/MovieCard";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Header />
        <MovieCard navigation={navigation} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1D1D'
  },
});
