'use client'
import { gql, DocumentNode } from "@apollo/client";
const GET_SECRETKEYAPPLICATIONS: DocumentNode = gql`
  query GetSecretkeyApplication {
    SecretkeyApplications {
      id
      email
      restaurant_license
      passport_nid
      created_at
    }
  }
`;
export default GET_SECRETKEYAPPLICATIONS;