"use client";
import { gql, DocumentNode } from "@apollo/client";
const GET_TODAYS_REVENUE: DocumentNode = gql`
  query GetTodaysRevenue($restaurantId: ID!) {
    todaysRevenue(restaurantId: $restaurantId) {
      total
    }
  }
`;
export default GET_TODAYS_REVENUE;
