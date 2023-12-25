'use client';
import { gql, DocumentNode } from "@apollo/client";
const CURRENT_USER: DocumentNode = gql`
  query CurrentUser {
    user {
      id
      fullName
      email
      permissions
    }
  }
`;
export default CURRENT_USER;
