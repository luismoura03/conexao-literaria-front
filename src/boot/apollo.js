import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";

import { provideApolloClient } from "@vue/apollo-composable";

const httpLink = createHttpLink({
  uri: "http://localhost:3000/",
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

export default async () => {
  provideApolloClient(apolloClient);
};
