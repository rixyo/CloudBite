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

import React from 'react';
import { useMutation } from "@apollo/client";
import REGISTER_USER  from "@/graphql/actions/signup.action";
import useAuthModal from "@/hooks/useAuthModal";


const Signupform = () => {
  const [registerUser, { loading }] = useMutation(REGISTER_USER);
   const authModal = useAuthModal();
     const form = useForm<z.infer<typeof formSchema>>({
       resolver: zodResolver(formSchema),
       defaultValues: {
        fullName: "",
         email: "",
         password: "",
       },
     });
     async  function onSubmit(values: z.infer<typeof formSchema>) {
       
          await registerUser({
            variables: {
              fullName: values.fullName,
              email: values.email,
              password: values.password,
            },
          }).then(() => {
            authModal.onClose();
            toast.success("Account created successfully 🎉 ");
          }).catch((err) => {
            toast.error(err.message);
          });
         
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
                        className="border-2 border-gray-300 focus:border-2 focus:border-[#F14A16] w-[19rem] md:w-[30rem]"
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
                        className="border-2 border-gray-300 focus:border-2 focus:border-[#F14A16] w-[19rem] md:w-[30rem]"
                      />
                    </FormControl>
                    <FormDescription>
                      Use the email you provided to get your secret key.
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
                    <FormLabel>Secret Key</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="********"
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
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                        className="border-2 border-gray-300 focus:border-2 focus:border-[#F14A16] w-[19rem] md:w-[30rem]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="mt-5 bg-[#F14A16] hover:bg-[#F14A16] text-[1rem] font-[500]"
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