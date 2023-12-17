'use client';
import { gql } from "@apollo/client";

const CHECKOUT = gql`
mutation Checkout(
    $itemId: ID!
    $quantity: Int!
    $price: String!
    $itemName: String!
    $restaurantId: ID!
) {
    checkout(
        createOrderInput: {
            orderItems: [
                {
                    itemId: $itemId
                    quantity: $quantity
                    price: $price
                    itemName: $itemName
                    restaurantId: $restaurantId
                }
            ]
        }
    ) {
        id
        url
    }
}
`;
export default CHECKOUT;