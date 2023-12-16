'use client';
import { gql, DocumentNode } from "@apollo/client";
const GET_RESTAURENTSBYLOCATION: DocumentNode = gql`
  query GetRestaurents($page: Int!, $location: String!) {
    getRestaurantByLocation(page: $page, location: $location) {
      id
    restaurant{
      id
      name
      banner
    }
    }
  }
`;
export default GET_RESTAURENTSBYLOCATION;