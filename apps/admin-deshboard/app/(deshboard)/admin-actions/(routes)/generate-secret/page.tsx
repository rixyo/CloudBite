'use client';
import GenerateSecretkeyform from '@/components/forms/secretkey-form';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import React from 'react';

const page:React.FC = () => {
    
    return (
        <div className='flex items-center justify-center mt-16 p-5'>
            <div className='flex-col'>
            <Heading
                title='Generate Secret Key'
                description='You can generate secret key from here.'
                
             />
             <Separator />
             <div className='mt-5'>

             <GenerateSecretkeyform/>
             </div>

            </div>
             

        </div>
    )
}
export default page;