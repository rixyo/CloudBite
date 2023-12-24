'use client'
import { gql, DocumentNode } from '@apollo/client'
const USER_RESTAURANT: DocumentNode = gql`
  query UserRestaurant {
    userRestaurant {
    id
    name
    }
  }
`;
export default USER_RESTAURANT;