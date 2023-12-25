'use client'
import { gql, DocumentNode } from "@apollo/client";
const GET_WITHDRAWAMOUNT: DocumentNode = gql`
  query GetWithdrawAmount($email: String!) {
    UserWithdrowalAmount(email: $email) {
      total
    }
  }
`;
export default GET_WITHDRAWAMOUNT;
