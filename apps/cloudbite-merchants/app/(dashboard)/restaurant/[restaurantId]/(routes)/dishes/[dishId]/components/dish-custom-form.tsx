'use client'
import React, { useState } from "react";
import { useForm,Controller } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ImageUpload from "@/components/ui/image-upload";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { AlertModal } from "@/components/modal/alert-modal";
import { Separator } from "@/components/ui/separator";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import CREATE_DISH  from "@/graphql/actions/create-dish.action"
import UPDATE_DISH from "@/graphql/actions/update-dish.action";
import DELETE_DISH from "@/graphql/actions/delete-dish.action";
type dishFormProps = {
  restaurantId: string;
  initialData:
    | {
        id: string;
        name: string;
        price: string;
        description: string;
        thumbnails:[string];
        dish_type: string;
      }
    | undefined;
};
const formSchema = z.object({
  name: z.string().min(3).max(50),
  price: z.string().min(1).max(10000),
  description: z.string().min(3).max(500),
  thumbnails: z.object({ url: z.string() }).array(),
    dish_type: z.string()
});
type img = {
  url: string;
};

const DishForm:React.FC<dishFormProps> = ({initialData, restaurantId}) => {
      const [loading, setLoading] = useState<boolean>(false);
       const [open, setOpen] = useState<boolean>(false);
       const router=useRouter()
       const title = initialData ? "Edit Dishes" : "Add Dishes";
       const description = initialData
         ? "Edit this Dishes in your restaurant"
         : "Add a new Dishes to your restaurant";
         const action = initialData ? "Save changes" : "Create";
    type ProductFormValues = z.infer<typeof formSchema>;
     const {
       control,
       register,
       handleSubmit,
       setValue,
       getValues,
       formState: { errors },
     } = useForm<ProductFormValues>({
       resolver: zodResolver(formSchema),
       defaultValues: {
         name: initialData?.name ?? "",
         price: initialData?.price ?? "",
         description: initialData?.description ?? "",
         thumbnails: initialData?.thumbnails
           ? [{ url: initialData?.thumbnails[0]}]
           : [],
         dish_type: initialData?.dish_type ?? "",
       },
     });
    const toastMessage = initialData ? "Dish updated." : "Dish created.";
    const categories = [
      {
        id: "1",
        name: "Burger",
      },
      {
        id: "2",
        name: "Pizza",
      },
      {
        id: "3",
        name: "Sandwiche",
      },
      {
        id: "4",
        name: "Momo",
      },
    ];
    const [createDish] = useMutation(CREATE_DISH);
    const [updateDish] = useMutation(UPDATE_DISH);
    const [deleteDish] = useMutation(DELETE_DISH)
    const clearForm = () => {
      setValue("name", "");
      setValue("price", "");
      setValue("description", "");
      setValue("thumbnails", []);
      setValue("dish_type", "");
    };
    //create dish
    const onSubmit =async(value:z.infer<typeof formSchema>) => {
        setLoading(true);
      
          if(initialData){
            await updateDish({
              variables: {
               dishId:initialData.id,
               restaurantId: restaurantId,
                name: value.name,
                description: value.description,
                price: value.price,
                thumbnails: value.thumbnails.map((image: img) => image.url),
                dish_type: value.dish_type,
              },
            }).then(()=>{
              setLoading(false);
              toast.success(toastMessage);
            }).catch(()=>{
              setLoading(false);
              toast.error('Something went wrong')
            })
          }
          else{
            await createDish({
                variables: {
                    restaurantId: restaurantId,
                    name: value.name,
                    description: value.description,
                    price: value.price,
                    thumbnails: value.thumbnails.map((image: img) => image.url),
                    dish_type: value.dish_type,
                },
            }).then(()=>{
              setLoading(false);
              toast.success(toastMessage);
              clearForm();
            }).catch(()=>{
              setLoading(false);
              toast.error('Something went wrong')
            })
       

          }
    };
    //delete dish
    const deleteAction=async()=>{
        setLoading(true);
        
          await deleteDish({
            variables:{
              id:initialData?.id,
              restaurantId:restaurantId
            }
          }).then(()=>{
            setLoading(false);
            toast.success(`Dish has been deleted successfully`);
            router.push(`/restaurant/${restaurantId}/dishes`)
          }).catch(()=>{
            setLoading(false);
            toast.error('Something went wrong')
          })
        
    }
    return (
      <>
        <AlertModal
          isOpen={open}
          onClose={() => setOpen(false)}
          onConfirm={deleteAction}
          loading={loading}
        />
        <div className="flex items-center justify-between">
          {initialData && (
            <Button
              disabled={loading}
              variant="destructive"
              size="sm"
              onClick={() => setOpen(true)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          )}
        </div>

        <Separator />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="flex items-center justify-center">
            <div className="flex-col">
              <Heading title={title} description={description} />
              <Separator />
          
                <div className="mx-20 md:mx-40">
                  <ImageUpload
                    value={getValues("thumbnails").map(
                      (image: img) => image.url
                    )}
                    onChange={(value) =>
                      setValue("thumbnails", [
                        ...getValues("thumbnails"),
                        { url: value },
                      ])
                    }
                    onRemove={(value) =>
                      setValue(
                        "thumbnails",
                        getValues("thumbnails").filter(
                          (image: img) => image.url !== value
                        )
                      )
                    }
                  />
                </div>
              

              <div className="flex-col justify-center items-center  md:w-[40rem]">
                {errors.name && (
                  <span className="text-red-500">{errors.name.message}</span>
                )}
                <Input
                  placeholder="name"
                  className="mt-2 border-2 border-gray-300 focus:border-2 focus:border-[#F14A16]"
                  {...register("name")}
                  disabled={loading}
                />
              </div>
              <div className="flex-col justify-center items-center md:w-[40rem]">
                {errors.description && (
                  <span className="text-red-500">
                    {errors.description.message}
                  </span>
                )}
                <Textarea
                  disabled={loading}
                  className="mt-2 border-2 border-gray-300 focus:border-2 focus:border-[#F14A16]"
                  placeholder="Description"
                  {...register("description")}
                />
              </div>
              <div className="flex-col justify-center items-center md:w-[40rem]">
                {errors.price && (
                  <span className="text-red-500">{errors.price.message}</span>
                )}
                <Input
                  disabled={loading}
                  className="mt-2 mb-2 border-2 border-gray-300 focus:border-2 focus:border-[#F14A16]"
                  placeholder="Price"
                  {...register("price")}
                />
              </div>
              <div className=" md:grid md:grid-cols-3 gap-8  content-center md:w-[60rem]">
                <div className="flex-col items-center justify-center">
                  {errors.dish_type && (
                    <span className="text-red-500">
                      {errors.dish_type.message}
                    </span>
                  )}
                  <Controller
                    name="dish_type"
                    control={control}
                    defaultValue={initialData?.dish_type || ""}
                    render={({ field }) => (
                      <Select>
                        <select
                          className="h-10 rounded   w-full border-2 border-gray-400 mt-2"
                          {...field}
                          placeholder="Select Category"
                        >
                          <option value={initialData?.dish_type || ""} disabled>
                            {initialData?.dish_type? initialData.dish_type : 'Select Category'}</option>
                          {categories.map((category) => (
                            <option key={category.id} value={category.name}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </Select>
                    )}
                  />
                </div>
              </div>
              <Button
                className="ml-auto bg-[#F14A16] hover:bg-[#F14A16] mt-4"
                disabled={loading}
                type="submit"
              >
                {action}
              </Button>
            </div>
          </div>
        </form>
      </>
    );
 };
    export default DishForm;