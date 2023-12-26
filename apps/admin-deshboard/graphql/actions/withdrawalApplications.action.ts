'use client';
import { gql, DocumentNode } from '@apollo/client';
const GET_WITHDRAWALAPPLICATIONS: DocumentNode = gql`
  query GetWithdrawalApplications {
    WithdrowalApplications {
      id
      email
      amount
      branch_name
      created_at
      account_number
    }
  }
`;
export default GET_WITHDRAWALAPPLICATIONS;