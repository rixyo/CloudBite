"use client";
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

const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
});

import React from 'react';


const Signinform:React.FC = () => {
     const form = useForm<z.infer<typeof formSchema>>({
       resolver: zodResolver(formSchema),
       defaultValues: {
         email: "",
         password: "",
       },
     });
       function onSubmit(values: z.infer<typeof formSchema>) {
         console.log(values);
       }
    
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
                      <Input
                        placeholder="********"
                        {...field}
                        className="border-2 border-gray-300 focus:border-2 focus:border-[#39DB4A] w-[19rem] md:w-[30rem]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="mt-5 bg-[#39DB4A] hover:bg-[#39DB4A] text-[1rem] font-[500]"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </Form>
    );
}
export default Signinform;