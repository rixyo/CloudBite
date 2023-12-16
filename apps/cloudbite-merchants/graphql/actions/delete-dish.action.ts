'use client'
import { gql, DocumentNode } from "@apollo/client";
const DELETE_DISH: DocumentNode = gql`
  mutation DeleteDish($id: ID!, $restaurantId: ID!) {
    deleteDish(restaurantId:$restaurantId, id: $id) {
      message
    }
  }
`;
export default DELETE_DISH;