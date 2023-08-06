import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search movie ..."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 13
  },
  searchInput: {
    width: '94%',
    height: 45,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 14
  }
});
