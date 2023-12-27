'use client'
import { gql, DocumentNode } from "@apollo/client";
const USE_PENDING_ORDERS: DocumentNode = gql`
query UsePendingOrders {
   getUserOrders{
  id
  orderItem{
    id
    order_item_name
    order_item_price
  }
}
}
`;
export default USE_PENDING_ORDERS;