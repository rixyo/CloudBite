'use client'
import { gql } from "@apollo/client";

const CREATE_DISH = gql`
  mutation CreateDish(
    $restaurantId: ID!
    $name: String!
    $description: String!
    $price: String!
    $thumbnails: [String!]!
    $dish_type: String!
  ) {
    createDish(
      restaurantId: $restaurantId
      createDishInput: {
        name: $name
        thumbnails: $thumbnails
        description: $description
        price: $price
        dish_type: $dish_type
      }
    ) {
      id
    }
  }
`;

export default CREATE_DISH;