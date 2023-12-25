'use client'
import { gql, DocumentNode } from "@apollo/client";
const Withdraw_APPLICATION: DocumentNode = gql`
  mutation WithdrawApplication(
    $email: String!
    $amount: String!
    $branch_name: String!
    $account_number: String!
    $passport_nid: String!
  ) {
    withdrowApplication(
      input: {
        email: $email
        amount: $amount
        branch_name: $branch_name
        account_number: $account_number
        passport_nid: $passport_nid
      }
    ) {
      id
    }
  }
`;
export default Withdraw_APPLICATION;