'use client';

import GET_SECRETKEY_APPLICATION from '@/graphql/actions/getSecretkeyApplication';
import { useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
import React from 'react';
import SecretkeyForm from './components/SecretkeyForm';


const Page:React.FC= () => {
    const params = useParams();
    const {data,loading,error} = useQuery(GET_SECRETKEY_APPLICATION,{
        variables:{
            id:params.secretkeyId,
        }
    })
    return (
      <div className="flex-col mt-16">
        <div className="flex-1 space-y-4 p-8 pt-6">
          {!loading && !error && (
            <SecretkeyForm
            data={data?.SecretkeyApplication}
            
             
            />
          )}
        </div>
      </div>
    );
}
export default Page;