import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SigninForm from './signin-form';
import SignupForm from './signup-form';


const AuthForm:React.FC = () => {
    
    return (
      <div className="bg-white rounded-lg">
        <Tabs
          defaultValue="signin"
          className="md:w-[800px] mt-10 md:mt-0  p-5"
        >
          <TabsList className="md:flex md:items-center gap-5 ">
            <TabsTrigger className="text-[1.25rem] font-[600]" value="signin">
              Signin
            </TabsTrigger>
            <TabsTrigger className="text-[1.25rem] font-[600]" value="signup">
              Signup
            </TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <SigninForm />
          </TabsContent>
          <TabsContent value="signup">
            <SignupForm />
          </TabsContent>
        </Tabs>
      </div>
    );
}
export default AuthForm;