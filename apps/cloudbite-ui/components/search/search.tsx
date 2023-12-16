'use client';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';


const Search:React.FC = () => {
   const [search, setSearch] = useState<string>("");
   const router = useRouter();
     const onSearch = useCallback(
       (event: React.FormEvent) => {
         event.preventDefault();
         const encodedSearch = encodeURI(search);
         if(!search) return;
         router.push(`/restaurants?new=${encodedSearch}`);
       },
       [search, router]
     );
    
    return (
      <div className="flex items-center justify-center">
        <>
          <div className="flex items-center gap-5">
            <div className="flex-col mt-5">
              <h1 className="font-[700] text-[3rem] text-[#333333] md:max-w-[95%] lg:max-w-[80%] leading-[5rem] tracking-[0.15rem]">
                It&apos;s the food and groceries you love, delivered.
              </h1>
              <div className="flex items-center gap-5 mt-5 ">
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="border-2 border-gray-300 h-12 "
                  placeholder="Your Street and Street Number"
                />
                <Button
                  className="bg-[#39DB4A] text-lg hover:bg-[#39DB4A] transition delay-150 duration-300 ease-in-out"
                  onClick={onSearch}
                >
                  Find Food
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <Image
              src={"/img/vegetables.png"}
              width={500}
              height={700}
              alt="food"
            />
          </div>
        </>
      </div>
    );
}
export default Search;