import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import LocalStorageManager from "@/lib/localstorage";
const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
});
const authLink = new ApolloLink((operation, forward) => {
  // Get the token from wherever you store it (e.g., localStorage, cookies, etc.)
  const token = LocalStorageManager.getItemWithExpiration("token");
  // Set the Authorization header
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }));

  return forward(operation);
});
export const graphqlClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});