// Note: This file is used for the billboard table columns

"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type ApplicationColumn = {
  id: string;
  email: string;
  passport_nid: string;
  restaurant_license: string;
  createdAt: string;
};

export const columns: ColumnDef<ApplicationColumn>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },

  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "passport_nid",
    header: "Passport/NID",
  },
  {
    accessorKey: "restaurant_license",
    header: "Restaurant License",
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
