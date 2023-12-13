import { gql, DocumentNode } from "@apollo/client";

const CREATE_RESTAURANT = gql`
  mutation CreateRestaurant(
    $name: String!
    $banner: String!
    $street: String!
    $city: String!
    $state: String!
    $country: String!
  ) {
    createRestaurant(
      createRestaurantInput: {
        name: $name
        banner: $banner
        address: {
          street: $street
          city: $city
          state: $state
          country: $country
        }
      }
    ) {
      id
      name
    }
  }
`;

export default CREATE_RESTAURANT;
