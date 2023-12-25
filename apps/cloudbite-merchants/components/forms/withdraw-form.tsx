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
});

import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import CURRENT_USER from "@/graphql/actions/currentuser.action";
import GET_REVENUE from "@/graphql/actions/get-revenue.action";
import GET_WITHDRAWAMOUNT from "@/graphql/actions/get-withdrawAmount";
import USER_RESTAURANT from "@/graphql/actions/userRestaurant.action";
import Withdraw_APPLICATION from "@/graphql/actions/withdraw-application";
import useWalletModal from "@/hooks/useWalletModal";

const Withdrawform = () => {
  const [loading, setLoading] = React.useState(false);
  const witdrawModal = useWalletModal();
   const [withdrowApplication] = useMutation(Withdraw_APPLICATION);
    const { data} = useQuery(CURRENT_USER);
     const {
       data: restaurant,
     } = useQuery(USER_RESTAURANT);
    const { data: rev } = useQuery(GET_REVENUE, {
      variables: {
        restaurantId: restaurant?.userRestaurant?.id,
      },
    });
    const { data: totalwithdraw} = useQuery(GET_WITHDRAWAMOUNT, {
      variables: {
        email: data?.user?.email,
      },
    });
    const availableBlance =
      parseFloat(rev?.revenue?.total) -
      parseFloat(totalwithdraw?.UserWithdrowalAmount?.total);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountNumber: "",
      branchName: "",
      amount: "",
      nid: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    await withdrowApplication({
      variables: {
        email: data?.user?.email,
        account_number: values.accountNumber,
        branch_name: values.branchName,
        amount: values.amount,
        passport_nid: values.nid,
      },
    })
      .then(() => {
        setLoading(false);
        toast.success("Withdrawal request sent successfully");
        witdrawModal.onClose();
      })
      .catch(() => {
        setLoading(false);
        toast.error("Something went wrong");
      });
   
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
            <Button
              className="mt-5 bg-[#F14A16] hover:bg-[#F14A16] text-[1rem] font-[500]"
              type="submit"
              disabled={availableBlance < parseFloat(form.getValues("amount"))}
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
