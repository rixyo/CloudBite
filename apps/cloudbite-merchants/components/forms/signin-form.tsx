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
import LocalStorageManager from "@/lib/localstorage";

const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
});

import React from 'react';
import { useMutation } from "@apollo/client";
import SIGNIN_USER from "@/graphql/actions/signin.action";
import useAuthModal from "@/hooks/useAuthModal";
import { useRouter } from "next/navigation";


const Signinform:React.FC = () => {
  const [signinUser, { loading, error }] = useMutation(SIGNIN_USER);
  const router =useRouter();
  const authModal = useAuthModal();
     const form = useForm<z.infer<typeof formSchema>>({
       resolver: zodResolver(formSchema),
       defaultValues: {
         email: "",
         password: "",
       },
     });
       function onSubmit(values: z.infer<typeof formSchema>) {
         try {
          signinUser({
            variables: {
              email: values.email,
              password: values.password,
            },
          }).then((res) => {
            toast.success("Logged in successfully 🎉 ");
            LocalStorageManager.setItemWithExpiration('token',res.data.login.token,60);
            authModal.onClose();
            console.log(res?.data?.login?.user?.id)
            router.push(`/${res?.data?.login?.user?.id}/dashboard`)
          });
          
         } catch (error:any) {
          toast.error('Invalid credentials');
          
         }
       }
    
       if(error){
          toast.error(error.message);
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
                {loading ? "Loading..." : "Sign in"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    );
}
export default Signinform;