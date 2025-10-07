"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Trash2 } from "lucide-react";
import { Product } from "@/types/index";
import { addToCart, removeFromCart, increaseQuantity, decreaseQuantity} from "@/store/cartSlice";

type QtyControlProps = {
    product: Product;
    className?: string;
};

export default function QtyControl({ product, className = "" }: QtyControlProps) {
    const dispatch = useDispatch();
    const item = useSelector((state: RootState) =>
        state.cart.items.find((i) => i.id === product.id)
    );

    const quantity = item?.quantity || 0;
    const stock = product.amount;

    const handleIncrease = () => {
        if (quantity === 0) {
            // первый раз? => добавляем в корзину
        dispatch(addToCart(product));
        } else if (quantity < stock) {
            // уже есть? => увеличиваем
            dispatch(increaseQuantity(product.id));
        }
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            dispatch(decreaseQuantity(product.id));
        } else if (quantity === 1) {
            // 1 кол? => удалить из корзины
            dispatch(removeFromCart(product.id));
        }
    };

    // если товара нет
    if (stock === 0) {
        return (
            <div className="text--white text-sm select-none">
                Нет в наличии
            </div>
        );
    }

    return (
        <div className="flex items-center space-x-3 text-black">
            <button
                onClick={handleDecrease}
                disabled={quantity === 0}
                className={`bg-white group btn rounded-[10px] qty-btn ${
                    quantity === 0 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray1"
                }`}
            >
                {quantity > 0 
                ? (quantity === 1 
                    ? <Trash2 
                        size={16} 
                        className="text-red1 group-hover:text-black transition-all duration-200"/> 
                    : "-") 
                : "-"}
            </button>
            
            <span className={`text-lg qty-btn text-center select-none ${className}`}>
                {quantity}
            </span>
            
            <button
                onClick={handleIncrease}
                disabled={quantity >= stock}
                className={`bg-white btn rounded-[10px] qty-btn ${
                    quantity >= stock 
                        ? "opacity-30 cursor-not-allowed" 
                        : "hover:bg-gray1"
                    }`
                }
            >
                +
            </button>
            
            {quantity >= stock && (
                <span className="text-[10px] text-[#cc5d5d] ml-1 select-none">
                    осталось {stock} шт на складе
                </span>
            )}
        </div>
    );
}
