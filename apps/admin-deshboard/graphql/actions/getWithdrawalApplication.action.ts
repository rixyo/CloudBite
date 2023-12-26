'use client'
import { gql, DocumentNode } from '@apollo/client';
const GET_WITHDRAWALAPPLICATION: DocumentNode = gql`
  query GetWithdrawalApplication($id: ID!) {
    WithdrowalApplication(id: $id) {
      id
      email
      amount
      branch_name
      passport_nid
      account_number
      status
    }
  }
`;
export default GET_WITHDRAWALAPPLICATION;