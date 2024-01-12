"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useMutation } from "@apollo/client";
import SECRETkey_APPLICATION from "@/graphql/actions/secretkey-application.action";
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
import useSecretKeyModal from "@/hooks/useSecretKeyModal";
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


const Secretkeyform = () => {
  const [secretkeyApplication] = useMutation(SECRETkey_APPLICATION);
  const secretkeyModal = useSecretKeyModal();
  const [loading, setLoading] = React.useState(false);
    const [muted, setMuted] = React.useState(false);
    React.useEffect(() => {
      setMuted(true);
    }, []);
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: "",
        licence: "",
        nid: "",
        mobileNumber: "",
      },
    });
    if (!muted) return null;
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    await secretkeyApplication({
      variables: {
        email: values.email,
        restaurant_license: values.licence,
        mobile_number: values.mobileNumber,
        passport_nid: values.nid,
      },
    })
      .then(() => {
        setLoading(false);
        toast.success("Application submitted successfully 🎉 ");
        secretkeyModal.onClose();
      })
      .catch(() => {
        setLoading(false);
        toast.error('Something went wrong');
      });

  }

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
                  <FormDescription>
                   Enter a valid email for  Secretkey Application receipt.
                  </FormDescription>
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
