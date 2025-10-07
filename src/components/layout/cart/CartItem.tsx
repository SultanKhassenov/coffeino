"use client";

import { CartItem as CartItemType } from "@/store/cartSlice";
import QtyControl from "@/components/shared/QtyControl";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  return (
    <div className="flex items-start border-b py-4">
      <img
        src={item.image}
        alt={item.title}
        className="w-14 h-14 object-contain"
      />
      <div className="flex flex-col ml-2 text-sm text-[#777] flex-1">
        <p className="text-black">{item.title}</p>
        <p>{item.details.find((d) => d.label === "Объём")?.value}g</p>

        <div className="flex flex-row my-2 space-x-1">
          <p className="text-black">{item.price}₸</p>
          <p className="font-light">/шт</p>
        </div>

        <QtyControl
          product={item}
          className="bg-gray1 text-white w-8 h-8 rounded-[10px] flex justify-center items-center"
        />
      </div>
    </div>
  );
}
