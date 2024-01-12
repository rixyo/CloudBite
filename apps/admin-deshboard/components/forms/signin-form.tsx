"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import LocalStorageManager from "@/lib/localstorage";

const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
});

import React, { useState } from 'react';
import { useMutation } from "@apollo/client";
import SIGNIN_USER from "@/graphql/actions/signin.action";

import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon } from "lucide-react";


const Signinform:React.FC = () => {
  const [signinUser, { loading, error }] = useMutation(SIGNIN_USER);
  const [passwordType, setPasswordType] = useState<string>("password");
  const router =useRouter();
  
     const form = useForm<z.infer<typeof formSchema>>({
       resolver: zodResolver(formSchema),
       defaultValues: {
         email: "",
         password: "",
       },
     });
       async function onSubmit(values: z.infer<typeof formSchema>) {
       
         await signinUser({
            variables: {
              email: values.email,
              password: values.password,
            }
          }).then((res) => {
            LocalStorageManager.setItemWithExpiration('token',res.data.login.token,60);
            if (
              res?.data?.login?.user?.permissions.includes("admin")
            ){
              router.push(`/admin-actions`);
            }else{
              router.push(`/`);
            }
            toast.success("Logged in successfully 🎉 ");
          }).catch(() => {

            toast.error('Invalid credentials');
          });
       }

         const ShowPassword = () => {
           if (passwordType === "password") {
             setPasswordType("text");
           } else {
             setPasswordType("password");
           }
         };
    
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex items-center justify-center">
            <div className="flex-col">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example@email.com"
                        {...field}
                        className="border-2 border-gray-300 focus:border-2 focus:border-[#F14A16] w-[19rem] md:w-[30rem]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={passwordType}
                          placeholder="********"
                          {...field}
                          className="border-2 border-gray-300 focus:border-2 focus:border-[#F14A16] w-[19rem] md:w-[30rem]"
                        />
                        {passwordType === "password" && (
                          <EyeIcon
                            className="absolute top-1/2 right-1 -translate-y-1/2  cursor-pointer text-gray-400"
                            onClick={ShowPassword}
                            size={20}
                          />
                        )}
                        {passwordType === "text" && (
                          <EyeOffIcon
                            className="absolute top-1/2 right-1 -translate-y-1/2  cursor-pointer text-gray-400"
                            onClick={ShowPassword}
                            size={20}
                          />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="mt-5 bg-[#F14A16] hover:bg-[#F14A16] text-[1rem] font-[500]"
                type="submit"
              >
                {loading ? "Loading..." : "Sign in"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    );
}
export default Signinform;