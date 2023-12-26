'use client'
import { gql, DocumentNode } from '@apollo/client';
const GET_SECRETKEY_APPLICATION: DocumentNode = gql`
  query getSecretkeyApplication($id: ID!) {
    SecretkeyApplication(id: $id) {
      id
      id
      email
      status
      passport_nid
      restaurant_license
    }
  }
`;
export default GET_SECRETKEY_APPLICATION;