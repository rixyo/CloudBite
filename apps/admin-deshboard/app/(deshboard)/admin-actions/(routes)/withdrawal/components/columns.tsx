// Note: This file is used for the billboard table columns

"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type WithdrawApplicationColumn = {
  id: string;
  email: string;
  account_number: string;
  branch_name: string;
  amount: string;
  createdAt: string;
};

export const columns: ColumnDef<WithdrawApplicationColumn>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },

  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "account_number",
    header: "Bank Account Number",
  },
  {
    accessorKey: "branch_name",
    header: "Branch Name",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
