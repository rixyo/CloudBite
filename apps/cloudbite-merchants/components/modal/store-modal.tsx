"use client";
import React from "react";
import { useStoreModal } from "@/hooks/useStoreModal";
import * as z from "zod";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import Modal from "@/components/modal/modal-store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import ImageUpload from "../ui/image-upload";
import { useMutation } from "@apollo/client";
import CREATE_RESTAURANT from "@/graphql/actions/create-restaurant.action";

const formSchema = z.object({
  name: z.string().min(3, "Must be at least 3 characters"),
  images: z.object({ url: z.string() }).array(),
  street: z.string().min(3, "Must be at least 3 characters"),
  city: z.string().min(3, "Must be at least 3 characters"),
  state: z.string().min(3, "Must be at least 3 characters"),
  country: z.string().min(3, "Must be at least 3 characters"),
});

type Image = {
  url: string;
};

const StoreModal: React.FC = () => {
  const StoreModal = useStoreModal();
  const router = useRouter();
    const [createRestaurantMutation] = useMutation(CREATE_RESTAURANT);
    const {
      control,
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
    try {
      
      const { data } = await createRestaurantMutation({
        variables: {
          name: value.name,
          images: value.images.map((image: Image) => image.url),
          street: value.street,
          city: value.city,
          state: value.state,
          country: value.country,
        },
      });
      toast.success("Restaurant created successfully 🎉 ");
      StoreModal.onClose();
     // router.push(`/${data?.createRestaurant?.id}`);
    } catch (error:any) {
      toast.error('Invalid credentials');
      
    }
    
  };
  return (
    <Modal
      isOpen={StoreModal.isOpen}
      onClose={StoreModal.onClose}
      title="Create a Restaurant"
      description="Add your restaurant details to get started."
    >
      <div>
        <div className="space-y-4 py-2 pb-4 ">
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
            <div className="flex-col justify-center items-center">
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
              <Button variant="destructive" onClick={StoreModal.onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};
export default StoreModal;
