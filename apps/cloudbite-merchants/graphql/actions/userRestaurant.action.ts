'use client'
import { gql, DocumentNode } from '@apollo/client'
const USER_RESTAURANTS: DocumentNode = gql`
  query UserRestaurants {
    userRestaurants {
    id
    name
    }
  }
`;
export default USER_RESTAURANTS;