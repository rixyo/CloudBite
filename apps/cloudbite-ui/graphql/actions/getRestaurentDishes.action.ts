'use client'
import { gql, DocumentNode } from "@apollo/client";
const RESTAURENT_DISHES: DocumentNode = gql`
  query GetRestaurentDishes($restaurantId: ID!, $page: Int!) {
    restaurantDishes(restaurantId: $restaurantId, page: $page) {
      id
      price
      name
      description
      dish_type
      thumbnails
      restaurant{
        id
      }
    }
  }
`;
export default RESTAURENT_DISHES;
