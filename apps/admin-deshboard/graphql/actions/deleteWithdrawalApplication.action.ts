'use client'
import { gql, DocumentNode } from '@apollo/client';
const DELETE_WITHDRAWL_APPLICATION: DocumentNode = gql`
  mutation DeleteWithdrowalApplication($id: ID!) {
    deleteWithdrowalApplication(id: $id) {
      id
    }
  }
`;
export default DELETE_WITHDRAWL_APPLICATION;