"use client";
import SidebarCart from '@/components/layout/cart/CartSidebar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import { useIsMobile } from '@/hooks/useIsMobile';
import { PRODUCTS } from '@/lib/data';


export default function CatalogPage() {
    const isMobile = useIsMobile();

    return (
        <>
            {/* Заголовок */}
            <h2 className="text-lg max-md:text-2xl m-10 relative">
                Каталог товаров
            </h2>

            <div className="flex flex-row w-[95%] mx-auto">
                {/* Продукты */}
                <div className="space-y-5 min-md:w-3/4">
                    {PRODUCTS.map(p => (
                        <div key={p.id}>
                            <ProductCard product={p}/>
                        </div>
                    ))}
                <div className="h-[5vw] w-full"/>
                    
                </div>

                {/* Корзина */}
                {!isMobile && <SidebarCart />}
            </div>

            <Footer />
        </>
    )
}