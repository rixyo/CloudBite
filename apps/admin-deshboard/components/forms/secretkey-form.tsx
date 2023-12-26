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
import { ClipboardCheck} from 'lucide-react'

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email.",
  })
});

import React from "react";
import { useMutation } from "@apollo/client";


import { useRouter } from "next/navigation";
import GENERATE_KEY from "@/graphql/actions/generateKey.action";
import { Textarea } from "../ui/textarea";

const GenerateSecretkeyform: React.FC = () => {
  const [generateSceretKey, { loading, error }] = useMutation(GENERATE_KEY);
  const [copied,setIscopied] = React.useState(false);
  const [secretKey, setSecretKey] = React.useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await generateSceretKey({
      variables: {
        email: values.email,
      },
    })
      .then((res) => {
        setSecretKey(res?.data?.generateSceretKey?.message);
        toast.success("Secret key Generated🎉 ");
      })
      .catch(() => {
        toast.error("Invalid credentials");
      });
  }
   const onCopy = (value: string) => {
     navigator.clipboard.writeText(value);
     setIscopied(true);
       
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
            <div>
              {secretKey && (
                <div className="mt-5">
                  <div className="font-bold text-xl">Secret Key</div>
                <Textarea className="border-2 mt-4 border-gray-300  w-[19rem] md:w-[30rem] h-[10rem] p-2" value={secretKey} readOnly />
                </div>
              )}
            </div>

            {!secretKey && (<Button
              className="mt-5 bg-[#F14A16] hover:bg-[#F14A16] text-[1rem] font-[500]"
              type="submit"
            >
              {loading ? "Loading..." : "Generate"}
            </Button>
            )}
            {secretKey && (
              <Button
                className="mt-5 bg-[#F14A16] hover:bg-[#F14A16] text-[1rem] font-[500]"
                type="button"
                onClick={() => onCopy(secretKey)}
              >
                <div className="flex items-center justify-center">
                  <div className="mr-2">
                    {copied ? "Copied" : "Copy"}
                  </div>
                  <ClipboardCheck />
                </div>
              </Button>
            )}
            
          </div>
        </div>
      </form>
    </Form>
  );
};
export default GenerateSecretkeyform;
