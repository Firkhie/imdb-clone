import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";

const GET_MOVIE_BY_ID = gql`
  query GetMovieById($findMovieByIdId: ID!) {
    findMovieById(id: $findMovieByIdId) {
      id
      title
      releaseYear
      imgUrl
      Genre {
        name
      }
      synopsis
      rating
      User {
        username
      }
      Casts {
        name
        profilePict
      }
    }
  }
`;

export default function DetailNew({ route }) {
  const { id } = route.params;
  // const [data, setData] = useState(moviesData);

  const { loading, error, data } = useQuery(GET_MOVIE_BY_ID, {
    variables: { findMovieByIdId: id },
  });
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error : {error.message}</Text>;

  return (
    <View style={styles.container}>
      {data ? (
        <View style={styles.content} key={data.findMovieById.id}>
          {/* IMDb Image */}
          <Image style={styles.imdbImage} source={{ uri: "https://st.depositphotos.com/22265358/60547/i/600/depositphotos_605472014-stock-photo-september-2-2022-brazil-in.jpg" }} />

          {/* Header */}
          <View style={styles.header}>
            <View style={{ flex: 0.35, position: "relative" }}>
              <Image style={styles.movieImage} source={{ uri: data.findMovieById.imgUrl }} />
            </View>
            <View style={{ flex: 0.65, paddingLeft: 30, paddingRight: 20, alignSelf: "flex-start", marginTop: 5 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>{data.findMovieById.title}</Text>
              <Text style={{ fontSize: 15 }}>{data.findMovieById.releaseYear}</Text>
              <Text style={{ fontSize: 15 }}>Rating: {data.findMovieById.rating}</Text>
              <View style={{ fontSize: 12, marginTop: 12, flexDirection: "row" }}>
                <Text style={{ fontWeight: "bold" }}>Directed By</Text>
                <Text> Test{data.findMovieById.User.username}</Text>
              </View>
            </View>
          </View>

          {/* Synopsis */}
          <View style={{ fontSize: 15, paddingHorizontal: 15, marginTop: -55 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 5 }}>Synopsis</Text>
            <Text style={{ textAlign: "justify" }}>{data.findMovieById.synopsis}</Text>
          </View>

          {/* Casts */}
          <View style={{ fontSize: 15, paddingHorizontal: 15, marginTop: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Top Cast</Text>
            <View style={styles.card}>
              {data.findMovieById.Casts ? (
                data.findMovieById.Casts.map((cast, index) => {
                  return <Image style={styles.castImage} source={{ uri: cast.profilePict }} key={index} />;
                })
              ) : (
                <Text>Loading...</Text>
              )}
            </View>
          </View>
        </View>
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
  },
  content: {
    width: "100%",
    flexDirection: "column",
    flexWrap: "wrap",
  },
  imdbImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  header: {
    width: "100%",
    height: 220,
    position: "relative",
    flexDirection: "row",
  },
  movieImage: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
    position: "absolute",
    top: -70,
    left: 20,
    borderRadius: 5,
    overflow: "hidden",
  },
  card: {
    marginTop: 5,
    width: "33.3%",
    height: 125,
    padding: 5,
    flexDirection: "row",
    gap: 10,
  },
  castImage: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
    borderRadius: 100,
  },
});
