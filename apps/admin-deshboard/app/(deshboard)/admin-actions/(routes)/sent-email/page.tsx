import SentEmailform from '@/components/forms/sentemail-form';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import React from 'react';



const page:React.FC = () => {
    
    return (
      <div className="flex items-center justify-center mt-16 p-5">
        <div className="flex-col">
          <Heading
            title="Sent Email to User"
            description="You can sent email to user from here."
          />
          <Separator />
          <div className="mt-5">
            <SentEmailform/>
          </div>
        </div>
      </div>
    );
}
export default page;