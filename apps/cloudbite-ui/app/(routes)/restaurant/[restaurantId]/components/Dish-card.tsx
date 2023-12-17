"use client";
import { Restaurant } from "@/types/restaurant.type";
import React, { MouseEventHandler, Suspense } from "react";
import Image from "next/image";
import {  Expand } from "lucide-react";
import { Dish } from "@/types/Dish.type";
import Currency from "./currency";
import usePreviewModal from "@/hooks/usePreviewModal";
import IconButton from "@/components/ui/preview-icon-button";

type dishcardProps = {
    dish: Dish;
};

const DishCard: React.FC<dishcardProps> = ({ dish }) => {
      const previewModal = usePreviewModal();
      const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        previewModal.onOpen(dish);
      };
    return (
        <>
            <div className="bg-white group cursor-pointer rounded-xl border  p-3 space-y-4">
                <div className="aspect-square rounded-xl bg-gray-100 relative">
                    <Image
                        src={dish?.thumbnails[0]}
                        alt="E-commerce"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="aspect-square object-cover rounded-md"
                    />
                    <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
                        {/* preview button*/}
                        <div className="flex gap-x-6 justify-center">
                            <IconButton
                              onClick={onPreview} 
              icon={<Expand size={20} className="text-gray-600" />}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <p className="font-semibold text-lg">{dish.name}</p>
                        <p className="text-sm text-gray-500">{dish.dish_type}</p>
                    </div>
                    <div>
                        <Currency value={dish.price} /> {/* Updated line */}
                    </div>
                </div>
            </div>
        </>
    );
};
export default DishCard;
