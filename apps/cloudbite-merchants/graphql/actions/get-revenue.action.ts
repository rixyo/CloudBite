'use client'
import { gql, DocumentNode } from "@apollo/client";
const GET_REVENUE: DocumentNode = gql`
  query GetRevenue($restaurantId: ID!) {
    revenue(restaurantId: $restaurantId) {
     total
    }
  }
`;
export default GET_REVENUE;