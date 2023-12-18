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
  licence: z.string().min(7, {
    message: "Please enter Your Restaurent licence.",
  }),

  nid: z.string().min(8, {
    message: "Please enter a valid Natunal Id Card/Passport number.",
  }),
  mobileNumber: z.string().min(7, {
    message: "Please enter your mobile/phone number.",
  }),
  email: z.string().email({
    message: "Please enter a valid email for transaction receipt.",
  }),
});

import React from "react";
import { useMutation } from "@apollo/client";
import REGISTER_USER from "@/graphql/actions/signup.action";
import useAuthModal from "@/hooks/useAuthModal";

const Secretkeyform = () => {
  const authModal = useAuthModal();
  const [loading, setLoading] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      licence: "",
      nid: "",
      mobileNumber: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex items-center ml-20">
          <div className="flex-col">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your Email"
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
              name="licence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Restaurent Licence</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your Restaurent Licence"
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
              name="mobileNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile/Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your Mobile/Phone Number"
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
            >
              {loading ? "Loading..." : "Submit"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
export default Secretkeyform;
