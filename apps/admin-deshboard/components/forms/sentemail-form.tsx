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

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  message: z.string().min(8, {
    message: "Email body must be at least 8 characters.",
  }),
});

import React from "react";
import { useMutation } from "@apollo/client";

import { Textarea } from "../ui/textarea";
import SENT_EMAIL from "@/graphql/actions/sentemail.action";

const SentEmailform: React.FC = () => {
  const [sentEmail, { loading, error }] = useMutation(SENT_EMAIL);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      message: "",
    },
  });
  const clearForm = () => {
    form.reset();
  };
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await sentEmail({
      variables: {
        email: values.email,
        message: values.message,
      },
    })
      .then(() => {
        toast.success("Email Sent🎉 ");
        clearForm();
      })
      .catch(() => {
        toast.error("Email not sent");
      });
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
                      className="border-2 border-gray-300 focus:border-2 focus:border-[#F14A16] w-[19rem] md:w-[30rem]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Secret Key</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter The Secret Key Here"
                      {...field}
                      className="border-2 border-gray-300  w-[19rem] md:w-[30rem]"
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
              {loading ? "Loading..." : "Send Email"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
export default SentEmailform;
