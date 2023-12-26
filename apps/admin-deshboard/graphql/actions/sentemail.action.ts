'use client';
import { gql, DocumentNode } from "@apollo/client";
const SENT_EMAIL: DocumentNode = gql`
  mutation SentEmail($email: String!, $message: String!) {
    sentEmail(email: $email, message: $message) {
      message
    }
  }
`;
export default SENT_EMAIL;