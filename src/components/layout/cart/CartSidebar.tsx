"use client";

import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "@/store/cartSlice";
import { RootState } from "@/store/store";
import { ShoppingBasketIcon, X } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";
import CartItem from "./CartItem";

interface CartProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export default function SidebarCart({ isOpen, onClose }: CartProps) {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const isMobile = useIsMobile()

    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity, 0
    );


    const handleClear = () => {
      dispatch(clearCart());
    };

    return (
        <div className={`relatie h-fit bg-white z-50 flex flex-col transition-transform duration-300 ${
            !isMobile 
                ? "translate-x-0 sticky top-20 w-1/4" 
                : `fixed top-18 right-2 w-3/5 max-w-75 shadow-xl rounded-t-2xl ${isOpen 
                    ? "translate-x-0" 
                    : "translate-x-11/10"
                }`
            } ${cartItems.length === 0 && "max-md:rounded-2xl"}`}
        >
            {/* Верхняя панель */}
            <div className="flex items-center justify-between p-4 xl:text-[1vw] lg:text-[1.2vw] md:text-[1.4vw] max-sm:text-[4vw] max-md:rounded-t-2xl">
                <h4 className="font-medium">Корзина</h4>
                {isMobile ?
                    <button onClick={onClose}>
                        <X className="w-8 h-8 text-black/70" />
                    </button>
                    :
                    <button
                        onClick={handleClear}
                        className="py-2 p-4 rounded-lg bg-[#fff5f5] text-[#cc5d5d] hover:bg-[#ffeaea] transition"
                    >
                        Очистить
                    </button>
                }
            </div>                
            {/* Контент */}
            <div className="px-3 py-4 max-h-[50vh] overflow-y-auto max-md:shadow-md">
                {cartItems.length === 0 
                ? (
                    <div className="w-1/1 h-fit max-md:p-4 mx-auto flex flex-col items-center text-[#bbb] font-medium md:text-sm">
                        <ShoppingBasketIcon className="w-1/3 h-1/3" />
                        <div className="empty-cart w-1/2 h-6 mb-2"/>
                        <p>Здесь пока пусто...</p>
                    </div>
                ) : (
                    <>
                        {/* Продукты в корзине */}
                        {cartItems.map((item) => (
                            <CartItem key={item.id} item={item} />
                        ))}
                        {/* Нижняя часть корзины */}
                        <div className="absolute top-[99%] left-0 px-4 pb-5 w-full bg-white max-md:rounded-b-2xl max-md:shadow-md">
                            <div className="mt-3 flex items-center justify-between">
                                <p>Итого к оплате</p>
                                <div className="text-xl">{total.toLocaleString()}₸</div>
                            </div>
                            <button className="flex justify-center mt-6 w-full py-2 group rounded-lg button-shimmer bg-coffee text-white">
                                <p className="group-hover:text-coffee group-hover:font-semibold transition-all duration-300 w-fit">
                                    Оформить заказ
                                </p>
                            </button>
                            {isMobile! && <button
                                onClick={handleClear}
                                className="mt-3 w-full py-2 rounded-lg bg-[#fff5f5] text-[#cc5d5d] hover:bg-[#ffeaea] transition"
                            >
                                Очистить корзину
                            </button>}
                        </div>
                    </>
                )}
            </div>
        </div>        
    );
}
