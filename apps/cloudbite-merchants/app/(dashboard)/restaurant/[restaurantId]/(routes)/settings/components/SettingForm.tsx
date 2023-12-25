"use client";
import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import ImageUpload from "@/components/ui/image-upload";
import { useMutation } from "@apollo/client";
import CREATE_RESTAURANT from "@/graphql/actions/create-restaurant.action";
import { useParams } from "next/navigation";
const formSchema = z.object({
  name: z.string().min(3, "Must be at least 3 characters"),
  images: z.object({ url: z.string() }).array(),
  street: z.string().min(3, "Must be at least 3 characters"),
  city: z.string().min(3, "Must be at least 3 characters"),
  state: z.string().min(3, "Must be at least 3 characters"),
  country: z.string().min(3, "Must be at least 3 characters"),
});

type Restaurant = {
  banner: string;
  delivery_options: string;
  pickup_options: string;
};
type Image = {
  url: string;
};
type pageProps = {
    restaurant:Restaurant
};

const SettingForm: React.FC = () => {
  const params = useParams();
  const userId = params.userId;
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      images: [],
      street: "",
      city: "",
      state: "",
      country: "",
    },
  });
  const onSubmit = async (value: z.infer<typeof formSchema>) => {
  
  };
  return (
    <>
      <div className="flex justify-center">
        <div className="space-y-4 py-2 pb-4 ml-20">
          <form onSubmit={handleSubmit(onSubmit)}>
            <ImageUpload
              value={getValues("images").map((image: Image) => image.url)}
              onChange={(value) =>
                setValue("images", [...getValues("images"), { url: value }])
              }
              onRemove={(value) =>
                setValue(
                  "images",
                  getValues("images").filter(
                    (image: Image) => image.url !== value
                  )
                )
              }
            />
            <div className="flex-col justify-center items-center w-[50rem]">
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}
              <Input
                placeholder="restaurant-name"
                className="mt-2 border-2 border-gray-300 focus:border-2 focus:border-[#F14A16] "
                {...register("name")}
              />
            </div>
            <h1 className="text-lg font-semibold mt-2 mb-3">Address</h1>
            <div className="flex-col justify-center items-center">
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}
              <Input
                placeholder="street"
                className="mt-2 border-2 border-gray-300 focus:border-2 focus:border-[#F14A16] "
                {...register("street")}
              />
            </div>
            <div className="flex-col justify-center items-center">
              {errors.street && (
                <span className="text-red-500">{errors.street.message}</span>
              )}
              <Input
                placeholder="city"
                className="mt-2 border-2 border-gray-300 focus:border-2 focus:border-[#F14A16] "
                {...register("city")}
              />
            </div>
            <div className="flex-col justify-center items-center">
              {errors.city && (
                <span className="text-red-500">{errors.city.message}</span>
              )}
              <Input
                placeholder="state"
                className="mt-2 border-2 border-gray-300 focus:border-2 focus:border-[#F14A16] "
                {...register("state")}
              />
            </div>
            <div className="flex-col justify-center items-center">
              {errors.state && (
                <span className="text-red-500">{errors.state.message}</span>
              )}
              <Input
                placeholder="country"
                className="mt-2 border-2 border-gray-300 focus:border-2 focus:border-[#F14A16] "
                {...register("country")}
              />
            </div>
            <div className="flex items-center justify-end pt-6 space-x-2">
              <Button type="submit">Continue</Button>
              <Button
                variant="destructive"
                onClick={() => router.push(`/${userId}`)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default SettingForm;
