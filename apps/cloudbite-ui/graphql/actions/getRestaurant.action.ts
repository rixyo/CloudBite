'use client'
import { gql, DocumentNode } from "@apollo/client";
const GET_RESTAURENT: DocumentNode = gql`
  query GetRestaurents($id:ID!) {
    restaurant(id:$id) {
      id
      name
      banner
    }
  }
`;
export default GET_RESTAURENT;