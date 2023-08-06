import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import DetailNew from './src/views/DetailNew';
import HomeScreen from './src/views/HomeScreen';

const client = new ApolloClient({
  uri: 'https://imdb-server.firkhiep2c1server.site',
  cache: new InMemoryCache(),
});

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="IMDb - Clone"
          screenOptions={{
            headerStyle: { backgroundColor: "#131313" },
            headerTintColor: "#F5C518",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        >
          <Stack.Screen name="IMDb - Clone" component={HomeScreen} />
          <Stack.Screen name="Detail" component={DetailNew} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
