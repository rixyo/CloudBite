'use client'
import { gql, DocumentNode } from "@apollo/client";
const DELETE_ORDER: DocumentNode = gql`
  mutation DeleteOrder($id: ID!) {
    deleteOrder(id: $id) {
      id
    }
  }
`;
export default DELETE_ORDER;