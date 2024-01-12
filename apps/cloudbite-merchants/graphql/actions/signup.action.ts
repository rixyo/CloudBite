'use client'
import { gql, DocumentNode } from "@apollo/client";
 const REGISTER_USER: DocumentNode = gql`
   mutation RegisterUser(
     $fullName: String!
     $email: String!
     $password: String!
     $secretKey: String!
   ) {
     createRestaurantOwner(
       createRestaurantOwnerInput: {
         fullName: $fullName
         email: $email
         password: $password
         secretKey: $secretKey
       }
     ) {
       id
     }
   }
 `;
export default REGISTER_USER