"use client";
import { gql } from "@apollo/client";

const UPDATE_DISH = gql`
  mutation UpdateDish(
    $restaurantId: ID!
    $dishId: ID!
    $name: String!
    $description: String!
    $price: String!
    $thumbnails: [String!]!
    $dish_type: String!
  ) {
    updateDish(
      restaurantId: $restaurantId
      dishId: $dishId

      updateDishInput: {
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

export default UPDATE_DISH;
