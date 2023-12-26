"use client";

import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import React from "react";
import WithdrawalForm from "./components/WithdrawalForm";
import GET_WITHDRAWALAPPLICATION from "@/graphql/actions/getWithdrawalApplication.action";

const Page: React.FC = () => {
  const params = useParams();
  const { data, loading, error } = useQuery(GET_WITHDRAWALAPPLICATION, {
    variables: {
      id: params.withdrawalId,
    },
  });
  return (
    <div className="flex-col mt-16">
      <div className="flex-1 space-y-4 p-8 pt-6">
        {!loading && !error && (
          <WithdrawalForm data={data?.WithdrowalApplication} />
        )}
      </div>
    </div>
  );
};
export default Page;
