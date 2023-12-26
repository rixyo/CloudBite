'use client'
import { gql, DocumentNode } from '@apollo/client';
const DELETE_SECRETKEY_APPLICATION: DocumentNode = gql`
  mutation DeleteSecretkeyApplication($id: ID!) {
    deleteSecretkeyApplication(id: $id) {
      id
    }
  }
`;
export default DELETE_SECRETKEY_APPLICATION;