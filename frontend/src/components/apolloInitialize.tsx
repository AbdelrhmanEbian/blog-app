import { ApolloClient, InMemoryCache , HttpLink} from "@apollo/client";
export const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://blog-app-production-4691.up.railway.app/graphql',
    credentials: 'include', // Ensure credentials are included
  }),
  cache: new InMemoryCache(),
});