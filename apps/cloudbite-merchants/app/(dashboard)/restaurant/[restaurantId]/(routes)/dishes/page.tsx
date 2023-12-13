'use client';
import GET_RESTAURANTDISHES from '@/graphql/actions/get-restaurant.dishes.action';
import { useQuery } from '@apollo/client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { PlusIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Page:React.FC = () => {
    const { restaurantId } = useParams();
    const router = useRouter();
    const [page, setPage] = React.useState(1);
    const { data, loading, error } = useQuery(GET_RESTAURANTDISHES,{
        variables:{
            restaurantId:restaurantId,
            page:page
        }
    });
    return (
      <div className="flex-col mt-16">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex justify-between items-center">
            <Heading
              title={
                data === undefined
                  ? "Dishes(0)"
                  : `Dishes (${data?.restaurantDishes?.length})`
              }
              description="Manage your dishes  here"
            />
            <Button onClick={() => router.push(`/restaurant/${restaurantId}/dishes/new`)}>
              <PlusIcon className="mr-2 h-4 w-4" /> Add
            </Button>
          </div>
          <Separator className="my-4" />
          <div className="border-2 border-gray-500 p-5 rounded-lg">
            {data?.restaurantDishes.map((dish:any) => (
              <div key={dish.id}>
                {dish.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}
export default Page;