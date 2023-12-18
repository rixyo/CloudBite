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
import toast from "react-hot-toast";
const formSchema = z.object({
  accountNumber: z.string().min(7, {
    message: "Please enter a valid account number.",
  }),
  branchName: z.string().min(3,{
    message: "Please enter a valid branch name.",
  }),
  nid: z.string().min(8, {
    message: "Please enter a valid Natunal Id Card/Passport number.",
  }),
    amount: z.string().min(1, {
        message: "Please enter a valid amount.",
    }),
    email: z.string().email({
        message: "Please enter a valid email for transaction receipt.",
    }),


});

import React from "react";
import { useMutation } from "@apollo/client";
import REGISTER_USER from "@/graphql/actions/signup.action";
import useAuthModal from "@/hooks/useAuthModal";

const Withdrawform = () => {
  const authModal = useAuthModal();
  const [loading, setLoading] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountNumber: "",
      branchName: "",
      nid: "",
      amount: "",
        email: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
   
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex items-center ml-20">
          <div className="flex-col">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your amount"
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
              name="accountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your bank account number"
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
              name="branchName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Branch Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter bank account branch name"
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
              name="nid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NID/Passport Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your NID/Passport number"
                      {...field}
                      className="border-2 border-gray-300 focus:border-2 focus:border-[#F14A16] w-[19rem] md:w-[30rem]"
                    />
                  </FormControl>
                  <FormDescription>
                    We will never share nid/passport infomation.
                  </FormDescription>
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
                      placeholder="Enter your email for transaction receipt"
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
              {loading ? "Loading..." : "Withdraw"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
export default Withdrawform;
