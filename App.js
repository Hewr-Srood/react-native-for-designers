import React from "react";
import AllReducers from "./Redux/reducers/AllReducers";
import { createStore } from "redux";
import { Provider } from "react-redux";
import AppNavigator from "./navigator/AppNavigator";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { StatusBar } from "react-native";

const myStore = createStore(AllReducers);
console.reportErrorsAsExceptions = false;
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://graphql.contentful.com/content/v1/spaces/yk83xashtump",
  credentials: "same-origin",
  headers: {
    Authorization: `Bearer lRWeme1lzT5dbssBx0_IH9Z6vF0-0guflEslRcFsjL0`,
  },
});

export default function App() {

  return (
    <Provider store={myStore}>
      <ApolloProvider client={client}>
        <StatusBar backgroundColor={"#f0f3f5"} barStyle="dark-content" />
        <AppNavigator />
      </ApolloProvider>
    </Provider>
  );
}
