"use client"
import { graphqlClient } from "@/graphql/graphql.setup";
import { ApolloProvider } from "@apollo/client";


export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={graphqlClient}>
            {children}
    </ApolloProvider>
  );
}
