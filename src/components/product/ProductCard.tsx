"use client";

import React from "react";
import Link from "next/link";
import { useIsMobile } from "@/hooks/useIsMobile";
import ProductCardDescription from "./ProductCardDescription";
import ProductCardDetails from "./ProductCardDetails";
import ProductCardImage from "./ProductCardImage";
import ProductCardFooter from "./ProductCardFooter";
import { Product } from "@/types/index";

export default function ProductCard({ product }: { product: Product }) {
    const isMobile = useIsMobile();

    return (
        <div
            className={`grid relative h-full p-4 bg-white ${!isMobile
                ? "grid-cols-[35%_65%] grid-rows-[auto_auto] gap-6 w-fit mr-3 pr-15"
                : "w-full gap-3 grid-cols-[auto_auto] grid-rows-[auto_auto_auto]"
            }`}
        >
            {/* 1 грид */}
            <ProductCardImage product={product} />

            {/* 2 грид */}
            <div className="flex flex-col md:col-start-2 md:row-start-1 col-start-2 row-start-1
    ">
                <p className="text-sm text-coffee/75">
                    Артикул: {product.article}
                </p>
                
                <Link href={`/product/${product.id}`} className="text-2xl font-medium my-3 text-coffee">
                    {product.title}
                </Link>


                {!isMobile
                    // показываем описание во 2 гриде на десктопах, а детали в 3
                    ? <ProductCardDescription text={product.description} />
                    : <ProductCardDetails product={product} />
                }
            </div>
            

            {/* 3 грид */}
            <div className="md:col-start-2 md:row-start-2 col-span-2 row-start-3 flex flex-col justify-between relative">

                <div className="flex items-center gap-4">
                    <div className="px-3.5 py-2 mb-4 rounded text-white bg-coffee text-sm max-md:text-lg">
                        {product.details.find((d) => d.label === 'Объём')?.value + 'g'}
                    </div>
                </div>

                {!isMobile 
                    // показываем описание в 3 гриде на мобилках, а детали во 2
                    ? <ProductCardDetails product={product} />
                    : <ProductCardDescription text={product.description} />
                }
                
                <ProductCardFooter product={product} isMobile={isMobile} />
            </div>
        </div>
    );
}
