'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
const formSchema = z.object({
  fullName: z.string().min(3, {
    message: "Please enter a valid name.",
  }),
    email: z.string().email({
        message: "Please enter a valid email.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
});

import React, { useState } from 'react';
import { useMutation } from "@apollo/client";
import REGISTER_USER  from "@/graphql/actions/signup.action";
import useAuthModal from "@/hooks/useAuthModal";
import { EyeIcon, EyeOffIcon } from "lucide-react";


const Signupform = () => {
  const [registerUser, { loading }] = useMutation(REGISTER_USER);
   const [passwordType, setPasswordType] = useState<string>("password");
   const authModal = useAuthModal();
     const form = useForm<z.infer<typeof formSchema>>({
       resolver: zodResolver(formSchema),
       defaultValues: {
        fullName: "",
         email: "",
         password: "",
       },
     });
       function onSubmit(values: z.infer<typeof formSchema>) {
         try {
          registerUser({
            variables: {
              fullName: values.fullName,
              email: values.email,
              password: values.password,
            },
          }).then((res) => {
            clearForm();
            toast.success("Account created successfully 🎉 ");
          });
         
         } catch (error:any) {
          toast.error(error.message);

         }
       }
        const ShowPassword = () => {
          if (passwordType === "password") {
            setPasswordType("text");
          } else {
            setPasswordType("password");
          }
        };
        const clearForm = () => {
          form.reset();
        }
    
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex items-center justify-center">
            <div className="flex-col">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        {...field}
                        className="border-2 border-gray-300 focus:border-2 focus:border-[#39DB4A] w-[19rem] md:w-[30rem]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                        className="border-2 border-gray-300 focus:border-2 focus:border-[#39DB4A] w-[19rem] md:w-[30rem]"
                      />
                    </FormControl>
                    <FormDescription>
                      We will never share your email.
                    </FormDescription>
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
                className="mt-5 bg-[#39DB4A] hover:bg-[#39DB4A] text-[1rem] font-[500]"
                type="submit"
              >
                {loading ? "Loading..." : "Sign Up"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    );
}
export default Signupform;