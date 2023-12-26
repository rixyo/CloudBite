'use client';
import { useQuery } from '@apollo/client';
import React from 'react';
import { WithdrawApplicationColumn, columns } from './components/columns'
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';
import GET_WITHDRAWALAPPLICATIONS from '@/graphql/actions/withdrawalApplications.action';
import Loader from '@/components/ui/loader';

const Page:React.FC= () => {
    const {
      data: Applications,
      loading,
      error,
    } = useQuery(GET_WITHDRAWALAPPLICATIONS);
    console.log(Applications?.WithdrowalApplications);
    const data: WithdrawApplicationColumn[] = Applications?.WithdrowalApplications?.map(
      (item: any) => ({
        id: item.id,
        email: item.email,
        account_number: item.account_number,
        branch_name: item.branch_name,
        amount: item.amount,
        createdAt: item.created_at,
      })
    );
    if(loading){
      return(
        <Loader/>
      )
    }
    
    
    return (
      <div className="flex-col mt-16">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <>
            <Heading
              title={
                data === undefined
                  ? "Pending  Applications (0)"
                  : `Pending Applications (${data?.length})`
              }
              description="List of all pending withdrawal applications"
            />
          </>
          <Separator className="my-4" />
          <div className="border-2 border-gray-500 p-5 rounded-lg">
            {data && (
              <DataTable columns={columns} searchKey="email" data={data} />
            )}
          </div>
        </div>
      </div>
    );
}
export default Page;