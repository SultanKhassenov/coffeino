import React from "react";
import { Product } from "@/types/index";
type ProductDetails = {
  product: Product;
  className?: string;
};

export default function ProductCardDetails({
  product,
  className = "",
}: ProductDetails) {
  // Определяем — мобильная ли версия
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth < 768);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  // Если мобильная — показываем только первые 3
  const visibleDetails = isMobile ? product.details.slice(0, 5) : product.details;

  return (
    <div
      className={`${className} flex flex-row mt-6 space-x-[10%] text-xs max-md:text-[3.5vw] text-coffee/75`}
    >
      <div className="space-y-1">
        {visibleDetails.map((d) => (
          <div key={d.label}>
            <span>{d.label}:</span>
          </div>
        ))}
      </div>
      <div className="space-y-1">
        {visibleDetails.map((d) => (
          <div key={d.label} className="flex flex-row p-[0.8px]">
            {d.label === "Обжарка"
              ? [...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src="/assets/icons/coffee-bean.png"
                    alt="roast"
                    className={`w-2 h-2 max-md:w-[2vw] max-md:h-[2vw] max-md:my-[0.5vw] ${
                      i < Number(d.value) ? "opacity-100" : "opacity-25"
                    }`}
                  />
                ))
              : ( d.label === "Объём" 
                ? d.value + "g"
                : d.value
                )}
          </div>
        ))}
      </div>
    </div>
  );
}
