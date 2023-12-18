'use client'
import { gql, DocumentNode } from "@apollo/client";
const CURRENT_MONTH_REVENUE: DocumentNode = gql`
  query GetCurrentMonthRevenue($restaurentId: ID!) {
    currentMonthRevenue(restaurentId: $restaurentId) {
      total
    }
  }
`;
export default CURRENT_MONTH_REVENUE;