'use client';
import { format } from "date-fns";
import GET_RESTAURANTORDERS from '@/graphql/actions/getRestaurantOrders.action';
import { useQuery } from '@apollo/client';
import React from 'react';
import { OrderColumn, columns } from './components/columns';
import { Order } from '@/types/Order.type';
import { formatter } from "@/lib/formatter";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";


type pageProps = {
    params:{
        restaurantId:string
    
    }
};

const Page:React.FC<pageProps> = ({params}) => {
    const{ data:Orders, loading, error } = useQuery(GET_RESTAURANTORDERS,{
        variables:{
            restaurantId:params.restaurantId
        }
    })
    console.log(Orders);
    const data: OrderColumn[] | undefined = Orders?.getRestaurantOrders?.map(
      (item: Order) => ({
        id: item.id,
        address: item.address,
        phone: item.phone,
        deliveryStatus: item.delivery_status,
        totalPrice: formatter.format(
          item.orderItem.reduce((total, item) => {
            return total + Number(item.order_item_price);
          }, 0)
        ),
        paymentStatus: item.payment_status,
        orderItems: item.orderItem
          .map((item) => item.order_item_name)
          .join(", "),
        orderItemsQuantity: item.orderItem
          .map((item) => item.quantity)
          .join(", "),
        createdAt: format(new Date(item.createdAt), "MMMM do, yyyy").toString(),
      })
    );
    
    return (
      <div className="flex-col mt-16">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <>
            <Heading
              title={
                data === undefined ? "Orders (0)" : `Orders (${data?.length})`
              }
              description="List of all orders"
            />
          </>
          <Separator className="my-4" />
          <div className="border-2 border-gray-500 p-5 rounded-lg">
            {data && <DataTable columns={columns} searchKey="id" data={data} />}
          </div>
        </div>
      </div>
    );
}
export default Page;