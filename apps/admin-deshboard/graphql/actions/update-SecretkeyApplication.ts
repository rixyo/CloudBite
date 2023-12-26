'use client'
import { gql, DocumentNode } from '@apollo/client';
const UPDATE_SECRETKEY_APPLICATION: DocumentNode = gql`
  mutation UpdateSecretkeyApplication($id: ID!, $status: String!) {
    updateSecretkeyApplication(
    id: $id
    input: { status: $status }
    ) {
      id
    }
  }
`;
export default UPDATE_SECRETKEY_APPLICATION;