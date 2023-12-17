import { gql } from "@apollo/client";

export const CHECKOUT_MUTATION = gql`
  mutation Checkout($createOrderInput: CreateOrderInput!) {
    checkout(createOrderInput: $createOrderInput) {
      id
      url
    }
  }
`;

