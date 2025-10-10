import ProductCard from "@/components/product/ProductCard";
import { notFound } from "next/navigation";
import { Product } from "@/types";

interface ProductPageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = params; // ✅ правильно

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const product = await res.json();

  return (
    <div className="w-9/10 h-8/10 mt-4 mx-auto">
      <ProductCard product={product} />
    </div>
  );
}

