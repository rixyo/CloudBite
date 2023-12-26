'use client';
import { gql, DocumentNode } from "@apollo/client";
const GENERATE_KEY: DocumentNode = gql`
  mutation GenerateKey($email: String!) {
    generateSceretKey(email: $email) {
      message
    }
  }
`;
export default GENERATE_KEY;