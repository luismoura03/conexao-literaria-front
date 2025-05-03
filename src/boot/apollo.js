import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";

import { provideApolloClient } from "@vue/apollo-composable";

const httpLink = createHttpLink({
  uri: "https://conexao-literaria-back.onrender.com/graphql",
  credentials: "include",
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

export default async () => {
  provideApolloClient(apolloClient);
};
