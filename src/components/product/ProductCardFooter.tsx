"use client";

import React from "react";
import { LucideShoppingCart, Plus } from "lucide-react";
import QtyControl from "@/components/shared/QtyControl";
import { Product } from "@/types/index";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { RootState } from "@/store/store";
import { useProductToast } from "@/hooks/useProductToast";

interface FooterProps {
    product: Product;
    isMobile: boolean;
}

export default function ProductCardFooter({ product, isMobile }: FooterProps) {
    const dispatch = useDispatch();
    const { showAddedToast, showOutOfStockToast } = useProductToast();

    // достаём текущую позицию из корзины
    const item = useSelector((state: RootState) =>
        state.cart.items.find((i) => i.id === product.id)
    );

    const handleAdd = () => {
        // если товара вообще нет на складе
        if (product.amount === 0) {
            showOutOfStockToast(product, 0);
            return;
        }

        // если пользователь уже добавил максимум
        if (item && item.quantity >= product.amount) {
            showOutOfStockToast(product, product.amount);
            return;
        }

        // иначе - всё ок
        dispatch(addToCart(product));
        showAddedToast(product);
    };

    return (
        <div className="flex justify-end max-sm:justify-between items-center mt-4 space-x-3">
            <div className="text-lg font-medium">{product.price}₸</div>

            {/* на десктопах квантити контрол */}
            {!isMobile ? (
                <div
                    className={`flex h-fit py-1 rounded-md items-center ${
                    product.amount === 0
                        // если товаров нет в наличии - серый фон
                        ? "bg-gray1 text-white px-4"
                        : "bg-[#f7f7f7] px-15"
                    }`}
                >
                    <QtyControl product={product} />
                </div>
            ) : product.amount === 0 ? (
                // тоже серый фон с текстом но
                <span className="bg-gray1 py-3 px-5 text-white rounded-lg">
                    Нет в наличии
                </span>
                ) : (
                    // кнопка "добавить в корзину" для мобилок
                    <button
                        className="bg-coffee flex items-center justify-center text-white py-3 px-[4vw] rounded-xl hover:bg-[#76533b] transition"
                        onClick={handleAdd}
                    >
                        <span className="relative w-fit h-fit mr-2">
                            <LucideShoppingCart />
                            <Plus className="absolute -top-[10%] right-[12%] bg-coffee rounded-full size-[15.4px]" />
                        </span>
                        Добавить в корзину
                    </button>
                )
            }
        </div>
    );
}
