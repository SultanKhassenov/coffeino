"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import SidebarCart from "@/components/layout/cart/CartSidebar";
import Footer from "@/components/layout/Footer";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Product } from "@/types";

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    async function loadProducts() {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    }
    loadProducts();
  }, []);

  return (
    <>
      <h2 className="text-lg max-md:text-2xl m-10 relative">Каталог товаров</h2>

      <div className="flex flex-row w-[95%] mx-auto">
        <div className="space-y-5 min-md:w-3/4">
          {products.map((p) => (
            <div key={p.id}>
              <ProductCard product={p} />
            </div>
          ))}
          <div className="h-[5vw] w-full" />
        </div>

        {!isMobile && <SidebarCart />}
      </div>

      <Footer />
    </>
  );
}
