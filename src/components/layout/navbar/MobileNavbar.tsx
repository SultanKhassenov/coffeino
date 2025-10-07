"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingCart, ChevronDown } from "lucide-react";
import SlidebarMenu from "../SlidebarMenu";
import Logo from "../../ui/Logo";
import SidebarCart from "../cart/CartSidebar";

export default function MobileNavbar() {
  const [isSlidebarOpen, setSlidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex flex-row space-x-3">
          {/* Бургер */}
          <button onClick={() => setSlidebarOpen(!isSlidebarOpen)} className="p-2 btn rounded-sm">
            <Menu />
          </button>

          {/* Переключатель языка */}
          <button className="btn rounded-sm p-2 flex items-center space-x-1 text-sm">
            <p>ENG</p>
            <ChevronDown className="w-3" />
          </button>
        </div>

        {/* Лого */}
        <Logo />

        <div className="flex flex-row space-x-3">
        {/* Каталог */}
          <Link
            href="/catalog"
            className="font-medium text-coffee p-2 text-[15px] px-2 btn rounded-sm"
          >
            Каталог
          </Link>

          {/* Корзина */}
          <button 
              className="p-2 btn rounded-sm"
              onClick={() => {setIsCartOpen(true)}}
          >
              <ShoppingCart />
          </button>
        </div>
      </div>

        <SidebarCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Сайдбар */}
      <SlidebarMenu isOpen={isSlidebarOpen} onClose={() => setSlidebarOpen(false)} />
    </>
  );
}
