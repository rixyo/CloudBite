"use client";
import { gql, DocumentNode } from "@apollo/client";
const UPDATE_WITHDRAWAL_APPLICATION: DocumentNode = gql`
  mutation UpdateWithdrawlApplication($id: ID!, $status: String!) {
    updateWithdrowalApplication(id: $id, input: { status: $status }) {
      id
    }
  }
`;
export default UPDATE_WITHDRAWAL_APPLICATION;
