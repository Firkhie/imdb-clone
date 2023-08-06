import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useQuery, gql } from "@apollo/client";

const GET_MOVIES = gql`
  query GetMovies {
    findMovies {
      id
      imgUrl
    }
  }
`;

export default function MovieCard({ navigation }) {
  // const [data, setData] = useState(moviesData);
  const { loading, error, data } = useQuery(GET_MOVIES);

  function toDetailPage(id) {
    navigation.navigate("Detail", { id });
  }

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error : {error.message}</Text>;

  return (
    <View style={styles.container}>
      {data ? (
        data.findMovies.map(({ id, imgUrl }) => {
          return (
            <TouchableOpacity style={styles.card} key={id} onPress={() => toDetailPage(id)}>
              <Image style={styles.movieImage} source={{ uri: imgUrl }} />
            </TouchableOpacity>
          );
        })
      ) : (
        <View>
          <Text>Loading...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 5,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  card: {
    width: "50%",
    height: 350,
    paddingHorizontal: 7,
    paddingVertical: 7,
  },
  movieImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 10,
    overflow: "hidden",
  },
});
