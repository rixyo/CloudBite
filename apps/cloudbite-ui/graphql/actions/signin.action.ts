"use client";
import { gql, DocumentNode } from "@apollo/client";
const SIGNIN_USER: DocumentNode = gql`
  mutation SigninUser($email: String!, $password: String!) {
    login(loginUserInput: { email: $email, password: $password }) {
      token
      user{
        id
      }
    }
  }
`;
export default SIGNIN_USER;
