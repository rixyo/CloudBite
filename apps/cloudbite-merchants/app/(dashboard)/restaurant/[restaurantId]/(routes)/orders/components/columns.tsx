"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type OrderColumn = {
  id: string;
  address: string;
  phone: string;
  deliveryStatus: string;
  totalPrice: string;
  paymentStatus:string;
  orderItems: string;
  orderItemsQuantity: string;
  createdAt: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
  },
  {
    accessorKey: "orderItems",
    header: "Items",
  },
  {
    accessorKey: "orderItemsQuantity",
    header: "Quantity",
  },

  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "deliveryStatus",
    header: "Delivered",
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
