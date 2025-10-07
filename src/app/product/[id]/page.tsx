import ProductCard from "@/components/product/ProductCard";
import { PRODUCTS } from "@/lib/data";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const numericId = Number(id);
  const product = PRODUCTS.find((p) => p.id === numericId);

  if (!product) return notFound();

  return (
    <div className="w-9/10 h-8/10 mt-4 mx-auto">
      <ProductCard product={product} />
    </div>
  );
}
