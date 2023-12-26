'use client';
import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import UPDATE_SECRETKEY_APPLICATION from '@/graphql/actions/update-SecretkeyApplication';
import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash } from 'lucide-react';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { Heading } from '@/components/ui/heading';
import DELETE_SECRETKEY_APPLICATION from '@/graphql/actions/deleteSecretkeyApplication.action';
import UPDATE_WITHDRAWAL_APPLICATION from '@/graphql/actions/updateWithdrawalApplication.action';
import DELETE_WITHDRAWL_APPLICATION from '@/graphql/actions/deleteWithdrawalApplication.action';

interface DataType {
    id:string;
    email:string;
    status:string;
    passport_nid:string;
    branch_name:string;
    account_number:string;
    restaurant_license:string;
    amount:string;
}
type SecretkeyFormProps = {
    data:DataType;
};
const formSchema = z.object({
  email: z.string().email(),
    status: z.string(),
    passport_nid: z.string(),
    branch_name: z.string(),
    account_number: z.string(),
    amount: z.string(),

});

const WithdrawalForm:React.FC<SecretkeyFormProps> = ({data}) => {
    const [open, setOpen] = React.useState(false);
        const [loading, setLoading] = React.useState(false);
        const [updateApplication] = useMutation(UPDATE_WITHDRAWAL_APPLICATION);
        const [deleteSecretkeyApplication] = useMutation(
          DELETE_WITHDRAWL_APPLICATION
        );
        type ProductFormValues = z.infer<typeof formSchema>;
        const {
          control,
          register,
          handleSubmit,
          formState: { errors },
        } = useForm<ProductFormValues>({
          resolver: zodResolver(formSchema),
          defaultValues: {
            email: data.email,
            status: data.status,
            passport_nid: data.passport_nid,
            branch_name: data.branch_name,
            account_number: data.account_number,
            amount: data.amount,
          },
        });
        const statusSelect = [
            { label: "pending", value: "pending" },
            { label: "approved", value: "approved" },
        ];
        const onSubmit = (values: ProductFormValues) => {
            setLoading(true);
            updateApplication({
                variables: {
                id: data.id,
                status: values.status,
                },
            })
                .then(() => {
                setLoading(false);
                toast.success("Application Updated");
                })
                .catch((e) => {
                setLoading(false);
                toast.error('Something went wrong!')
                });
        };
        const onDelete = async() => {
            setLoading(true);
            deleteSecretkeyApplication({
                variables: {
                id: data.id,
                },
            })
                .then(() => {
                setLoading(false);
                toast.success("Application Deleted");
                })
                .catch((e) => {
                setLoading(false);
                toast.error('Something went wrong!')
                });

        };
    
    return (
      <>
        <Heading title="Update Application" description="Update Application" />
        <AlertModal
          isOpen={open}
          onClose={() => setOpen(false)}
          onConfirm={onDelete}
          loading={loading}
        />
        <div className="flex items-center justify-between">
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>

        <Separator />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="flex items-center justify-center border-2 border-red-500 p-5">
            <div className="flex-col">
              <div className="flex-col justify-center items-center  md:w-[40rem]">
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
                <Label>Email</Label>
                <Input
                  placeholder="name"
                  className="mt-2 border-2 border-gray-300 focus:border-2 focus:border-[#F14A16]"
                  {...register("email")}
                  readOnly
                  disabled={loading}
                />
              </div>
              <div className="flex-col justify-center items-center  md:w-[40rem]">
                {errors.passport_nid && (
                  <span className="text-red-500">
                    {errors.passport_nid.message}
                  </span>
                )}
                <Label>Passport/NID</Label>
                <Input
                  placeholder="name"
                  className="mt-2 border-2 border-gray-300 focus:border-2 focus:border-[#F14A16]"
                  {...register("passport_nid")}
                  readOnly
                  disabled={loading}
                />
              </div>
              <div className="flex-col justify-center items-center  md:w-[40rem]">
                {errors.account_number && (
                  <span className="text-red-500">
                    {errors.account_number.message}
                  </span>
                )}
                <Label>Account Number</Label>
                <Input
                  placeholder="name"
                  className="mt-2 border-2 border-gray-300 focus:border-2 focus:border-[#F14A16]"
                  {...register("account_number")}
                  readOnly
                  disabled={loading}
                />
              </div>
              <div className="flex-col justify-center items-center  md:w-[40rem]">
                {errors.branch_name && (
                  <span className="text-red-500">
                    {errors.branch_name.message}
                  </span>
                )}
                <Label>Branch Name</Label>
                <Input
                  placeholder="name"
                  className="mt-2 border-2 border-gray-300 focus:border-2 focus:border-[#F14A16]"
                  {...register("branch_name")}
                  readOnly
                  disabled={loading}
                />
              </div>
              <div className="flex-col justify-center items-center  md:w-[40rem]">
                {errors.amount&& (
                  <span className="text-red-500">
                    {errors.amount.message}
                  </span>
                )}
                <Label>Amount</Label>
                <Input
                  placeholder="name"
                  className="mt-2 border-2 border-gray-300 focus:border-2 focus:border-[#F14A16]"
                  {...register("amount")}
                  readOnly
                  disabled={loading}
                />
              </div>
              <Label>Status</Label>
              <Controller
                name="status"
                control={control}
                defaultValue={data.status}
                render={({ field }) => (
                  <Select>
                    <select
                      className="h-10 rounded   w-full border-2 border-gray-400 mt-2"
                      {...field}
                      placeholder="Select Category"
                    >
                      <option value={data.status} disabled>
                        {data.status ? data.status : "Select Category"}
                      </option>
                      {statusSelect.map((category) => (
                        <option key={category.label} value={category.value}>
                          {category.value}
                        </option>
                      ))}
                    </select>
                  </Select>
                )}
              />
              <Button
                className="ml-auto bg-[#F14A16] hover:bg-[#F14A16] mt-4"
                disabled={loading}
                type="submit"
              >
                Update
              </Button>
            </div>
          </div>
        </form>
      </>
    );
}
export default WithdrawalForm;