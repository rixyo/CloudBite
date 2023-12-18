'use client'
import { gql, DocumentNode } from "@apollo/client";
const GET_RESTAURENT: DocumentNode = gql`
  query GetRestaurent($id: ID!) {
    restaurant(id: $id) {
      id
      name
      banner
      created_at
      address {
        street
        city
        state
      }
    }
  }
`;
export default GET_RESTAURENT;