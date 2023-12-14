'use client'
import { gql, DocumentNode } from "@apollo/client";
const GET_RESTAURANTDISHES: DocumentNode = gql`
  query GetRestaurantDishes($restaurantId: ID!, $page: Int!) {
    restaurantDishes(restaurantId: $restaurantId, page: $page) {
      id
      name
     price
     dish_type
     
    }
  }
`;
export default GET_RESTAURANTDISHES;
