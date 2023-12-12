'use client'
import { gql, DocumentNode } from "@apollo/client";
 const REGISTER_USER: DocumentNode = gql `
    mutation RegisterUser($fullName: String!, $email: String!, $password: String!) {
        createUser(createUserInput: { fullName: $fullName, email: $email, password: $password }) {
            id
        }
    }
`
export default REGISTER_USER