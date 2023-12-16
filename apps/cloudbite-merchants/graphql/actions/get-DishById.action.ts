'use client'
import { gql, DocumentNode } from "@apollo/client";
const GET_DISHBYID: DocumentNode = gql`
  query GetDishById($id: ID!) {
    dish(id: $id) {
      id
      name
        price
        description
      thumbnails
      dish_type
    }
  }
`;
export default GET_DISHBYID;