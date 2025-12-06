import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Replace with your WordPress GraphQL endpoint
const WORDPRESS_GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT ||
  'https://your-wordpress-site.com/graphql';

// HTTP connection to the API
const httpLink = createHttpLink({
  uri: WORDPRESS_GRAPHQL_ENDPOINT,
  fetchOptions: {
    method: 'POST',
    next: { revalidate: 0 }, // Equivalent to cache: 'no-store'
  },
});

// Add authentication if needed
const authLink = setContext((_, { headers }) => {
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      // Add any required headers here (e.g., for WPGraphQL JWT Authentication)
      // authorization: `Bearer ${process.env.WORDPRESS_AUTH_TOKEN}`,
    },
  };
});

// Create the Apollo Client
export const getClient = () => {
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
      typePolicies: {
        RootQuery: {
          queryType: true,
        },
        RootMutation: {
          mutationType: true, // Corrected typo from mutateType
        },
      },
    }),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-first',
        errorPolicy: 'all',
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    },
  });
};
