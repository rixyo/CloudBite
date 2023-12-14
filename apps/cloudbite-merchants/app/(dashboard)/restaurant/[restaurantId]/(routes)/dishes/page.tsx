'use client';
import GET_RESTAURANTDISHES from '@/graphql/actions/get-restaurant.dishes.action';
import { useQuery } from '@apollo/client';
import React from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { PlusIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ProductColumn, columns } from './components/columns';
import { formatter } from '@/lib/formatter';
import { DataTable } from '@/components/ui/data-table';

const Page:React.FC = () => {
    const { restaurantId } = useParams();
    const router = useRouter();
    const [page, setPage] = React.useState(1);
    const { data:Dishes, loading, error } = useQuery(GET_RESTAURANTDISHES,{
        variables:{
            restaurantId:restaurantId,
            page:page
        }
    });
        const data: ProductColumn[] | undefined = Dishes?.restaurantDishes?.map(
          (item: any) => ({
            id: item.id,
            name: item.name,
            price: formatter.format(item.price),
            category: item.dish_type,
            createdAt: item.createdAt,
          })
        );
        console.log(data);
    return (
      <div className="flex-col mt-16">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex justify-between items-center">
            <Heading
              title={
                data === undefined
                  ? "Dishes(0)"
                  : `Dishes (${Dishes?.restaurantDishes?.length})`
              }
              description="Manage your dishes  here"
            />
            <Button
              onClick={() =>
                router.push(`/restaurant/${restaurantId}/dishes/new`)
              }
            >
              <PlusIcon className="mr-2 h-4 w-4" /> Add
            </Button>
          </div>
          <Separator className="my-4" />
          <div className="border-2 border-gray-500 p-5 rounded-lg">
            {data && <DataTable columns={columns} searchKey="id" data={data} />}
          </div>
        </div>
      </div>
    );
}
export default Page;