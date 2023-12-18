'use client'
import { gql, DocumentNode } from "@apollo/client";
const GET_RESTAURANTORDERS: DocumentNode = gql`
  query GetRestaurantOrders($restaurantId: ID!) {
    getRestaurantOrders(restaurantId: $restaurantId) {
      id
      payment_status
      delivery_status
      orderItem{
        id
        quantity
        order_item_name
        order_item_price
      }
      phone
      address
    createdAt
    }
  }
`;
export default GET_RESTAURANTORDERS;